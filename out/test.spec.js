"use strict";
exports.__esModule = true;
var funcs_1 = require("./funcs");
var search_1 = require("./search");
var sites_1 = require("./sites");
describe("listings", function () {
    describe("#Scrape", function () {
        it("should contain: \"http\"", function () {
            funcs_1.visit("https://www.carfax.com/vehicle/WDDSJ4EB1HN424394", search_1.scrapePage, sites_1.sites[1].result)
                .then(function (res) { return console.log(JSON.stringify(res)); });
        });
    });
});
// main();
//# sourceMappingURL=test.spec.js.map