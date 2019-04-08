/* tslint:disable only-arrow-functions */
import * as assert from "assert";
import * as mocha from "mocha";

import { visit } from "./funcs";
import { scrapePage } from "./search";
import { sites } from "./sites";
describe("listings", function() {
    describe("#Scrape", function() {
        it("should contain: \"http\"", function() {
            visit("https://www.carfax.com/vehicle/WDDSJ4EB1HN424394", scrapePage, sites[1].result)
                .then((res) => console.log(JSON.stringify(res)));
        });
    });
});

// main();
