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
const uplot = `${root}node_modules/uplot`;
const dest = `${root}src/qvis`;

for (const name of [
  "dist/uPlot.iife.min.js",
  "dist/uPlot.min.css",
  "LICENSE",
]) {
  const destName = name.startsWith("dist/")
    ? name.slice("dist/".length)
    : `uPlot-${name}`;
  copyFileSync(`${uplot}/${name}`, `${dest}/${destName}`);
  console.log(`vendored ${destName}`);
}
