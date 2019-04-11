/* tslint:disable only-arrow-functions */
import * as assert from "assert";
import * as mocha from "mocha";
import * as mongodb from "mongodb";

import { Car } from "./car";
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
    describe.skip("#Search", function () {
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
        const tests = {
            cargurus: [
                // "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=14850#listing=229809122_isFeatured",
                "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=14850#listing=230155922_isFeatured",
            ],
            // cars: ["https://www.cars.com/vehicledetail/detail/764313498/overview/"],
            // carfax: ["https://www.carfax.com/vehicle/1FDRF3HT0CEB32118"],
        };
        for (const site in tests) {
            for (const listing of tests[site]) {
                it("should ...", async function () {
                    this.timeout(20000);
                    const data = await visit(listing, scrapePage, sites[site].result);
                    console.log(data);
                    console.log(new Car(data));
                    return data;
                });
            }
        }
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
