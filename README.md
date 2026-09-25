# qvis

Interactive HTML visualizer for [neqo](https://github.com/mozilla/neqo)/QUIC
`.sqlog` (qlog) files.

`qvis.py` renders one or more `.sqlog` files into a self-contained HTML file
with interactive plots (RTT, congestion window, bytes in flight, ssthresh,
pacing rate, and more), using `qvis.js`/`qvis.html` as templates and
[uPlot](https://github.com/leeoniya/uPlot) for rendering.

## Usage

```shell
uv run qvis.py <file.sqlog> [...]
uv run qvis.py --output-dir /tmp /path/to/*.sqlog
```

Requires network access on first run to fetch uPlot from a CDN (cached
thereafter).

## License

Licensed under the Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE)
or <http://www.apache.org/licenses/LICENSE-2.0>) or the MIT license
([LICENSE-MIT](LICENSE-MIT) or <http://opensource.org/licenses/MIT>), at your
option.
