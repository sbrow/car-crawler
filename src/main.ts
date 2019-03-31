import { promises as fs } from "fs";
import { console, HandleError, nick } from "./funcs";
import { SearchResults } from "./search";
import { sites } from "./sites";

export async function main(): Promise<Car[] | Error> {
    let exitCode: number = 0;
    try {
        const cars: Car[] = new Array<Car>();
        for (const site of sites) {
            console.info(`Searching ${site.search.entry}...`);
            const results = await SearchResults(site);
            if (!(results instanceof Error)) {
                const car = new Car(results);
                cars.push(car);
            }
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
