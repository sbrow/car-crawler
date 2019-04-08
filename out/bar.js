"use strict";
exports.__esModule = true;
var ProgressBar = require("progress");
var bar = new ProgressBar("Scraping results from \"" + "Bar" + "\" :current/:total [:bar] (:percent)", { total: 10 });
bar.tick();
// let timer = setInterval(function() {
//     bar.tick();
//     if (bar.complete) {
//         console.log("\ncomplete\n");
//         clearInterval(timer);
//     }
// }, 100);
//# sourceMappingURL=bar.js.map