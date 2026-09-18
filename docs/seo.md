# Search indexing and launch

MOO Academy's canonical production origin is **https://moo.mudverse.com**.
The workspace stays at `/`; the other public URLs are `/introduction.html`,
`/about.html`, `/resources.html`, `/field-notes.html`, and `/contact.html`.
There are no separately indexed lesson URLs. Runtime files and saved-world data
are not sitemap entries.

## What is maintained in the repository

Each public HTML page contains its title, description, canonical URL, Open Graph
and Twitter sharing metadata. These are present before JavaScript executes.
Introduction explains learning MOO programming and choosing LambdaMOO or ToastStunt;
Resources links to relevant manuals and communities. The workspace's lesson
heading can change without changing the page's search identity.

`dist/robots.txt` allows crawling, including assets needed to render the workspace,
and advertises `https://moo.mudverse.com/sitemap.xml`. The sitemap lists the six
canonical pages and deliberately omits unverified modification dates. Homepage
`WebSite` JSON-LD identifies MOO Academy; it makes no course-rating or certification
claims. The sharing image is `dist/social/overview.png`, copied from the reviewed
README screenshot. If replacing it, update its dimensions and descriptive alt
text in the six pages and the SEO checks.

Run `npm run test:seo` after changing page metadata or public URLs. It is also part
of `npm test` and `npm run test:check`. Browser checks verify initial HTML without
JavaScript at desktop/mobile widths and stable canonicals during workspace use.
Keep the sitemap, navigation, metadata, and checks consistent when adding pages.

## Production host requirements

Follow [Hosting](hosting.md) for complete static deployment and cache behavior.
At the public host:

- Serve HTTPS and permanently redirect HTTP to the equivalent HTTPS URL.
- Permanently redirect `/index.html` to `/`, preserving any query string. The
  checked-in index HTML also canonicalizes both addresses to `/`. These redirects
  belong in the production host configuration; the local server serves both.
- Serve actual missing URLs as 404, not an application-shell fallback with 200.
- Serve all six public pages, the sitemap, robots file, and sharing image without
  authentication. Use an XML content type for the sitemap and `text/plain` for
  robots. Do not attach `noindex` or `nofollow` headers to public pages.
- Preserve access to JavaScript, CSS, WASM, and other rendering dependencies;
  do not block runtime directories with robots rules.

Canonical tags are not access controls for previews. Protect staging sites with
host-level authentication, or configure `X-Robots-Tag: noindex` on staging only.
Do not put staging exclusions into production HTML. Check the headers again when
promoting a deployment.

## Search Console launch checklist

These are manual tasks after the site is publicly hosted; repository checks do
not create a Search Console property or submit URLs.

1. In Google Search Console, use a verified `mudverse.com` Domain property if you
   already have access, or verify a URL-prefix property for
   `https://moo.mudverse.com/`. Follow Google's verification instructions; no
   verification token or account credentials are stored in this repository.
2. Submit `https://moo.mudverse.com/sitemap.xml` in the Sitemaps report and check
   for processing errors.
3. Inspect the homepage and Introduction with URL Inspection. Run the live test,
   confirm indexing is allowed and rendered content is present, and request
   indexing after the final public deployment. Inspect the other pages if errors
   appear or they remain undiscovered.
4. Check the six pages' canonical URLs, HTTP status, and response headers. Check
   `/index.html?source=launch` redirects to `/?source=launch`, and an unknown page
   returns 404. Test the social image directly.
5. Add a normal HTML link from a relevant MUDVerse page, such as its MOO resources
   guide: **Learn MOO programming with MOO Academy**, linking to
   `https://moo.mudverse.com/`. This repository does not modify MUDVerse.

## Measuring results

Record the launch date. Check indexing and sitemap reports after launch, then
review Search Console performance after several weeks of data. Filter by the
`moo.mudverse.com` URLs when using a parent-domain property. Track impressions,
clicks, click-through rate, and average position for searches such as:

- Learn MOO / learn MOO coding / MOO programming
- Learn LambdaMOO / LambdaMOO tutorial
- Learn ToastStunt / ToastStunt programming

Use the actual queries and landing pages to guide later copy changes. Low search
volume may mean little data at first. A sitemap and valid metadata improve
technical discoverability; they do not guarantee indexing, rankings, or a date
when results will appear. No visitor analytics scripts or CI/CD are added.

References: [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[site names](https://developers.google.com/search/docs/appearance/site-names), and
[Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start).
