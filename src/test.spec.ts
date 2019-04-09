/* tslint:disable only-arrow-functions */
import * as assert from "assert";
import * as mocha from "mocha";
import * as mongodb from "mongodb";

import { nick } from "./funcs";
import { main } from "./main";
import { sites } from "./sites";
/*
describe("listings", function() {
    describe("#Scrape", function() {
        it("should contain: \"http\"", function() {
            visit("https://www.carfax.com/vehicle/WDDSJ4EB1HN424394", scrapePage, sites[1].result)
                .then((res) => console.log(JSON.stringify(res)));
        });
    });
});
*/

(async () => {
    const dbName = `heroku_dn9q80h5`;
    const dbRoute = `mongodb://heroku_dn9q80h5:bqeqsamrl6mpv1um6mmbjj4u7u@ds149404.mlab.com:49404/${dbName}`;
    const client = await mongodb.connect(dbRoute, { useNewUrlParser: true });
    const db = await client.db(dbName);
    await main(db, "cars", sites[1]);
    nick.exit();
})();
