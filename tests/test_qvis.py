# Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
# http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
# <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
# option. This file may not be copied, modified, or distributed
# except according to those terms.
from qvis.cli import _EPS, _Seq, extract, generate_html


def test_seq_disambiguates_repeated_timestamps():
    seq = _Seq()
    assert seq(1.0) == 1.0
    assert seq(1.0) == 1.0 + _EPS
    assert seq(1.0) == 1.0 + 2 * _EPS
    assert seq(2.0) == 2.0


def test_extract_collects_metrics_in_time_order():
    events = [
        {
            "time": 10.0,
            "name": "recovery:metrics_updated",
            "data": {"smoothed_rtt": 22.0, "congestion_window": 14000},
        },
        {
            "time": 0.0,
            "name": "recovery:metrics_updated",
            "data": {"smoothed_rtt": 20.0, "congestion_window": 12000},
        },
    ]
    data = extract(events, filename="test.sqlog")
    assert data.title == "test.sqlog"
    assert data.max_t == 10.0
    assert data.metrics_t == [0.0, 10.0]
    assert data.metrics["smoothed_rtt"] == [20.0, 22.0]
    assert data.metrics["congestion_window"] == [12000, 14000]


def test_generate_html_substitutes_placeholders():
    data = extract(
        [{"time": 0.0, "name": "recovery:metrics_updated", "data": {}}],
        filename="my-trace.sqlog",
    )
    html_out = generate_html(data)
    assert "my-trace.sqlog" in html_out
    assert "__TITLE__" not in html_out
    assert "__UPLOT_CSS__" not in html_out
    assert "__UPLOT_JS__" not in html_out
    assert "__DATA_B64GZ__" not in html_out
