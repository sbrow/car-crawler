/* tslint:disable only-arrow-functions */
import * as assert from "assert";
import * as mocha from "mocha";
import * as mongodb from "mongodb";

import { nick, visit } from "./funcs";
import { main, sites } from "./main";
import { scrapePage, Search } from "./search";
import { pages } from "./sites";

async function connect() {
    const dbName = `heroku_dn9q80h5`;
    const dbRoute = `mongodb://heroku_dn9q80h5:bqeqsamrl6mpv1um6mmbjj4u7u@ds149404.mlab.com:49404/${dbName}`;
    const client = await mongodb.connect(dbRoute, { useNewUrlParser: true });
    return client.db(dbName);
}

after(function () {
    new Promise((resolve) => setTimeout(resolve, 5000))
        .then((res) => {
            nick.exit(0);
        });
});

describe("sites", function () {
    describe("#Search", function () {
        const totalPages = (perPage: number) => perPage * pages;
        const tests = [
            { site: "carfax", want: totalPages(25) },
            { site: "cargurus", want: totalPages(19) },
            { site: "cars", want: totalPages(100) },
        ];

        for (const test of tests) {
            it(`"${test.site}" should return ${test.want} `, async function () {
                this.timeout(15000);

                const got = await Search(sites[test.site].search);
                assert.strictEqual(test.want, got.length);
                return got;
            });
        }
    });

    describe("#visit", function () {
        it("should ...", async function () {
            this.timeout(20000);
            // const data = await visit("https://www.carfax.com/vehicle/2GNFLGE56C6210250", scrapePage, sites.carfax.result);
            const data = await visit("https://www.cars.com/vehicledetail/detail/764313498/overview/", scrapePage, sites.cars.result);
            console.log(data);
            return data;
        });
    });
});

// describe("main", async function () {
//     const db = await connect();
//     for (const site of sites) {
//         main(db, "cars", site)
//             .then((res) => console.log(res));
//     }
//     nick.exit();
// });;
