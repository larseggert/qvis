#!/usr/bin/env node
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.
//
// Copies the pinned uPlot build from node_modules into src/qvis, so
// generate_html() can embed it without any network access. Run this after
// bumping the "uplot" version in package.json (e.g. via a Dependabot PR).
import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const src = `${root}node_modules/uplot/dist`;
const dest = `${root}src/qvis`;

for (const name of ["uPlot.iife.min.js", "uPlot.min.css"]) {
  copyFileSync(`${src}/${name}`, `${dest}/${name}`);
  console.log(`vendored ${name}`);
}
