"""Serve MOO Academy without retaining stale application assets."""
import argparse
import posixpath
import re
from urllib.parse import unquote, urlsplit
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        path = posixpath.normpath(unquote(urlsplit(self.path).path))
        immutable = re.match(r"^/runtime/releases/[0-9a-f]{64}/(?:dist|assets|docs)/", path)
        self.send_header("Cache-Control", "public, max-age=31536000, immutable" if immutable else "no-store")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--bind", default="127.0.0.1")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent / "dist"
    with ThreadingHTTPServer((args.bind, args.port), partial(Handler, directory=str(root))) as server:
        server.serve_forever()
