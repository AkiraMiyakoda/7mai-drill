// Copyright © 2026 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import crypto from "crypto";
import fs from "fs";

// サービスワーカーにキャッシュバージョンとファイル名を書き込む
const CACHE_FILES = ["/"].concat(
    fs
        .globSync("dist/**/*")
        .filter((f) => f !== "dist/sw.js" && fs.lstatSync(f).isFile())
        .map((f) => f.replace(/^dist\//, "/")),
);
const CACHE_NAME = crypto.createHash("md5").update(Buffer.from(CACHE_FILES)).digest("base64url");

console.log(`Modifying sw.js...`);
console.log(`CACHE_NAME = "${CACHE_NAME}"`);
console.log(`CACHE_FILES = ${JSON.stringify(CACHE_FILES)}`);

let sw = fs.readFileSync("dist/sw.js", "utf-8");
sw = sw.replace(`const CACHE_NAME = "";`, `const CACHE_NAME = "${CACHE_NAME}";`);
sw = sw.replace(`const CACHE_FILES = [];`, `const CACHE_FILES = ${JSON.stringify(CACHE_FILES)};`);
fs.writeFileSync("dist/sw.js", sw, "utf-8");
