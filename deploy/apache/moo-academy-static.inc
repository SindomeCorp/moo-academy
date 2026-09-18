# Include inside the MOO Academy content VirtualHost only.
DocumentRoot "${MOO_ACADEMY_ROOT}"
DirectoryIndex index.html

<Directory "${MOO_ACADEMY_ROOT}">
    Options -Indexes -MultiViews -Includes -ExecCGI +FollowSymLinks
    AllowOverride None
    Require all granted
    FallbackResource disabled
</Directory>

AddType text/javascript .js .mjs
AddType application/wasm .wasm
AddType application/json .json
AddType application/xml .xml
AddType text/plain .txt
ErrorDocument 404 default

# Clear either header table to avoid duplicate values or inherited staging flags.
Header onsuccess unset Cache-Control
Header always set Cache-Control "no-store"
Header always set Cache-Control "public, max-age=31536000, immutable" "expr=(%{REQUEST_STATUS} == 200 || %{REQUEST_STATUS} == 304) && %{REQUEST_URI} =~ m#^/runtime/releases/[0-9a-f]{64}/(?:dist|assets|docs)/#"
Header onsuccess unset X-Robots-Tag
Header always unset X-Robots-Tag

AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml text/plain application/wasm
