import * as ProgressBar from "progress";

import { Car } from "./car";
import { console, HandleError, nick } from "./funcs";
import { SearchResults } from "./search";
import { sites } from "./sites";

export async function main(): Promise<Car[] | Error> {
    let exitCode: number = 0;
    try {
        const cars: Car[] = new Array<Car>();
        const bar = new ProgressBar(`Finding cars from ":site" :current/:total [:bar] (:percent)\r\n`, {
            head: "+",
            total: sites.length,
        });
        bar.render({ site: sites[0].search.entry });
        for (const [i, site] of sites.entries()) {
            const results = await SearchResults(site);
            if (!(results instanceof Error)) {
                const car = new Car(results);
                cars.push(car);
            }
            bar.tick({ site: sites[i + 1].search.entry });
        }
        // const path = "./cars.json";
        // await fs.writeFile(path, JSON.stringify({ aaData: cars }, null, 2));
        // console.info(`Results saved to ${path}`);
        return cars;
    } catch (e) {
        HandleError(e);
        exitCode = 1;
        return e;
    }
}
// main();
