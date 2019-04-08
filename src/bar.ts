import * as  ProgressBar from "progress";

const bar = new ProgressBar(`Scraping results from "${"Bar"}" :current/:total [:bar] (:percent)`, { total: 10 });
bar.tick();
// let timer = setInterval(function() {
//     bar.tick();
//     if (bar.complete) {
//         console.log("\ncomplete\n");
//         clearInterval(timer);
//     }
// }, 100);
