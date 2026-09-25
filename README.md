# qvis

Interactive HTML visualizer for [neqo](https://github.com/mozilla/neqo)/QUIC
`.sqlog` (qlog) files.

`qvis` renders one or more `.sqlog` files into a self-contained HTML file
with interactive plots (RTT, congestion window, bytes in flight, ssthresh,
pacing rate, and more), using bundled JS/HTML templates and
[uPlot](https://github.com/leeoniya/uPlot) for rendering. No network access
is required — uPlot is vendored into the package.

## Usage

```shell
uv run qvis <file.sqlog> [...]
uv run qvis --output-dir /tmp /path/to/*.sqlog
```

Or install it with `pip install .` / `pipx install .` for a standalone
`qvis` command.

## Development

```shell
uv sync --group dev   # Python: ruff, ty, pytest
npm install           # JS: biome (also vendors uPlot into src/qvis)

uv run ruff check .
uv run ruff format --check .
uv run ty check
uv run pytest

npx biome ci .
```

## License

Licensed under the Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE)
or <http://www.apache.org/licenses/LICENSE-2.0>) or the MIT license
([LICENSE-MIT](LICENSE-MIT) or <http://opensource.org/licenses/MIT>), at your
option.
