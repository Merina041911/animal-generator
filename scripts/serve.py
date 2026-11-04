"""Serve the static site locally with the same extensionless routes as Vercel."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

SITE = Path(__file__).resolve().parent.parent / "animal-generator"

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE), **kwargs)

    def translate_path(self, path):
        resolved = super().translate_path(path)
        if not Path(resolved).exists() and Path(resolved + ".html").is_file():
            return resolved + ".html"
        return resolved

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Animal Generator: http://127.0.0.1:{args.port}/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
