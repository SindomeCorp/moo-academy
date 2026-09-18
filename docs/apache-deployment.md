# Apache deployment: moo.mudverse.com

This runbook is for a Debian/Ubuntu production host already running Apache 2.4.
The app is static: serve the checkout's **`dist/`** directory. No Node service,
reverse proxy, production `npm install`, or application database is needed.

The supplied configurations default to `/home/ubuntu/moo-academy/dist`. Change
`MOO_ACADEMY_ROOT` in both site files if the production checkout is elsewhere.
They add a separate named virtual host and do not replace the MUDVerse site.

## 1. Check the production host and DNS

Run on the production server, from the cloned repository:

```sh
pwd
git rev-parse --short HEAD
test -f dist/index.html && test -f dist/robots.txt && test -f dist/sitemap.xml
sudo apache2ctl -S
command -v certbot
```

In Route 53, open the existing **public hosted zone for `mudverse.com`**. Create
one record if it does not already exist:

| Setting | Value |
| --- | --- |
| Record name | `moo` (full name `moo.mudverse.com`) |
| Record type | `A` |
| Alias | Off for a direct Apache/EC2 IPv4 address |
| Value | The production Apache server's public IPv4, preferably its Elastic IP |
| TTL | `300` |
| Routing | Simple |

When preparing this runbook, `mudverse.com` and `www.mudverse.com` resolved to
`3.235.133.189`. If that is the server
where this checkout lives, use `3.235.133.189`. Confirm the address in EC2 before
creating the record. If traffic actually terminates at a load balancer or CDN,
configure that front end and its DNS target instead of assuming a direct EC2 IP.

Do not create another hosted zone or change the domain's nameservers. Do not add
an AAAA record unless IPv6 reaches this Apache host correctly. Verify inbound
TCP 80 and 443 in the EC2 security group and host firewall; HTTP remains needed
for automatic certificate renewal.

```sh
dig +short moo.mudverse.com A
dig +short moo.mudverse.com AAAA
```

DNS caches may retain the previous missing-record answer for a while. Continue
local Apache setup while waiting, but issue the certificate only after public
DNS and HTTP reach the intended server.

## 2. Install the HTTP bootstrap site

First take a configuration backup and enable the modules used by this site:

```sh
sudo cp -a /etc/apache2 "/etc/apache2.before-moo-$(date +%Y%m%d-%H%M%S)"
sudo a2enmod headers rewrite ssl mime dir alias filter deflate
sudo install -m 0644 deploy/apache/moo-academy-static.inc /etc/apache2/conf-available/moo-academy-static.inc
sudo install -m 0644 deploy/apache/moo-academy-http.conf /etc/apache2/sites-available/moo-academy-http.conf
sudo install -m 0644 deploy/apache/moo-academy.conf /etc/apache2/sites-available/moo-academy.conf
```

Set the actual absolute `dist/` path in **both** copied site configurations:

```sh
sudoedit /etc/apache2/sites-available/moo-academy-http.conf /etc/apache2/sites-available/moo-academy.conf
```

The shared `.inc` file belongs inside this site's virtual host. Do not enable it
as a global Apache configuration. The final HTTPS site cannot be enabled until
its certificate files exist.

Apache's worker user (normally `www-data` on Ubuntu) needs directory traversal
and read access to the static files, but no write access to the checkout:

```sh
namei -l /home/ubuntu/moo-academy/dist/index.html
sudo -u www-data test -r /home/ubuntu/moo-academy/dist/index.html
```

If the clone is under a private home directory, grant narrowly scoped ACL access,
or deploy the static files under a readable web directory. For the default path,
these commands grant traversal to the two private ancestors and read access only
to `dist/` (install the `acl` package if `setfacl` is unavailable):

```sh
sudo setfacl -m u:www-data:--x /home/ubuntu /home/ubuntu/moo-academy
sudo setfacl -R -m u:www-data:rX /home/ubuntu/moo-academy/dist
```

Use the real paths if different, and recheck access after updates. Do not make the
checkout world-writable or change ownership of the whole repository to Apache.

Create a separate persistent ACME webroot and enable only the bootstrap site:

```sh
sudo install -d -m 0755 /var/lib/letsencrypt/.well-known/acme-challenge
sudo a2ensite moo-academy-http.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
curl -I --resolve moo.mudverse.com:80:127.0.0.1 http://moo.mudverse.com/
```

Expect HTTP 200. Confirm `sudo apache2ctl -S` maps `moo.mudverse.com` to this
configuration and that the existing MUDVerse site still works. If configtest
fails, correct the error before reloading; never disable other virtual hosts.

## 3. Obtain the Let's Encrypt certificate

Reuse the host's existing Certbot installation and account. If Certbot is absent
on this Debian/Ubuntu host, install it with `sudo apt-get update` followed by
`sudo apt-get install certbot`. Do not install a second packaging method over an
existing Certbot installation.

Test the challenge path publicly before issuance:

```sh
printf 'moo-academy-acme-check\n' | sudo tee /var/lib/letsencrypt/.well-known/acme-challenge/moo-academy-probe >/dev/null
curl --fail http://moo.mudverse.com/.well-known/acme-challenge/moo-academy-probe
sudo rm /var/lib/letsencrypt/.well-known/acme-challenge/moo-academy-probe
```

Expect the exact probe text. Then request a separate certificate for this hostname:

```sh
sudo certbot certonly --webroot \
  --webroot-path /var/lib/letsencrypt \
  --cert-name moo.mudverse.com \
  -d moo.mudverse.com \
  --deploy-hook 'apache2ctl configtest && systemctl reload apache2'
```

If creating a new ACME account, follow Certbot's contact and agreement prompts.
The webroot method does not stop Apache or automatically rewrite other sites.
The deploy hook is retained for successful renewals. Confirm the certificate
paths with `sudo certbot certificates`; the final configuration expects:

- `/etc/letsencrypt/live/moo.mudverse.com/fullchain.pem`
- `/etc/letsencrypt/live/moo.mudverse.com/privkey.pem`

If Certbot reports a different certificate name, update the two configured paths
before enabling HTTPS. Never copy private-key contents into the repository.

## 4. Switch to HTTPS and verify renewal

```sh
sudo a2dissite moo-academy-http.conf
sudo a2ensite moo-academy.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
sudo certbot renew --cert-name moo.mudverse.com --dry-run --run-deploy-hooks
systemctl list-timers --all '*certbot*'
```

On an apt-based installation with `certbot.timer`, enable it if needed:
`sudo systemctl enable --now certbot.timer`. Snap installations use their own
renewal timer; retain the one appropriate to the existing installation.

The final HTTP virtual host preserves the ACME challenge path and redirects
other requests to HTTPS. `/index.html` redirects to `/` without losing query
parameters, including on HTTP. The explicit-request condition avoids redirect
loops when Apache internally resolves `/` to `index.html`.

If the final configuration fails its syntax check, return to the bootstrap
configuration before retrying. The existing Apache process continues with its
last loaded configuration until a successful reload:

```sh
sudo a2dissite moo-academy.conf
sudo a2ensite moo-academy-http.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
```

## 5. Check SEO and the running application

```sh
curl -I http://moo.mudverse.com/
curl -I 'https://moo.mudverse.com/index.html?source=launch'
curl -I https://moo.mudverse.com/
curl --fail https://moo.mudverse.com/robots.txt
curl --fail https://moo.mudverse.com/sitemap.xml
curl -I https://moo.mudverse.com/vendor/tree-sitter-moo.wasm
curl -I https://moo.mudverse.com/missing-page.html
curl -I https://www.mudverse.com/
```

Expect HTTP → HTTPS 301, `/index.html?source=launch` → `/?source=launch` 301,
HTTPS homepage 200, accessible robots/sitemap, `application/wasm` for WASM, and
404 for the missing page. The existing MUDVerse site should retain its behavior.
Test the six public pages and social image in a browser, run code in both runtime
profiles, refresh a saved draft, and open the Common Packages sandbox.

Check `Cache-Control: no-store` on HTML, app scripts, and data. Only successful
responses from content-addressed runtime release paths receive a year of immutable
caching. Missing assets remain uncached 404 responses. The site configuration
removes inherited `X-Robots-Tag` exclusions within this content virtual host;
check any upstream proxy/CDN for additional headers too.

Finally follow [SEO launch](seo.md):

1. Use an existing verified **Domain property** for `mudverse.com` in Search
   Console, or verify the URL-prefix property `https://moo.mudverse.com/`. A
   URL-prefix property for `https://www.mudverse.com/` does not cover this subdomain.
2. Submit `https://moo.mudverse.com/sitemap.xml`.
3. Inspect the homepage and Introduction, run the live test, and request indexing.
4. Add the agreed MUDVerse link to `https://moo.mudverse.com/`.

No extra Google verification DNS record is needed if an accessible verified
Domain property already covers it. Otherwise use the exact verification token
Google supplies; it cannot be fabricated from the domain name.

For later updates, follow the complete-release deployment procedure in
[Hosting](hosting.md); do not delete older runtime release directories needed by
open tabs. These templates do not add CI/CD or deploy the site automatically.

References: [Apache response headers](https://httpd.apache.org/docs/2.4/mod/mod_headers.html),
[Certbot webroot and renewal](https://eff-certbot.readthedocs.io/en/stable/using.html),
and [Route 53 records for EC2](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html).
