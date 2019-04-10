import * as ProgressBar from "progress";

import { Db } from "mongodb";
import { SearchResultOptions } from ".";
import { Car } from "./car";
import { HandleError, nick } from "./funcs";
import { SearchResults } from "./search";
import { sites as websites } from "./sites";

export async function main(db: Db, collection: string, site: SearchResultOptions): Promise<Car[] | Error> {
    let exitCode: number = 0;
    try {
        /* const bar = new ProgressBar(`Finding cars from ":site" :current/:total [:bar] (:percent)\r\n`, {
            head: "+",
            total: sites.length,
        });
        bar.render({ site: sites[0].search.entry }); */

        // for (let i = 0; i < sites.length; i++) {
        // const site = sites[i];

        const results = await SearchResults(site);
        if (!(results instanceof Error)) {
            for (const result of results) {
                const car = new Car(result);
                // console.info(`Pushing ${JSON.stringify(car)}`);
                db.collection(collection).updateOne(car, { $set: { ...car } }, { upsert: true });
            }
        }
        // bar.tick({ site: sites[i + 1].search.entry });
        // }

        // const path = "./cars.json";
        // await fs.writeFile(path, JSON.stringify({ aaData: cars }, null, 2));
        // console.info(`Results saved to ${path}`);
    } catch (e) {
        HandleError(e);
        exitCode = 1;
        return e;
    } finally {
        await nick.deleteAllCookies();
    }
}
// main();

export const sites = websites;
