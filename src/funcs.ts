import { promises as fs } from "fs";
import { format } from "logform";
import * as Nick from "nickjs";
import Tab from "nickjs";
import { createLogger, transports } from "winston";

import { Callback, Page, Scraper, Selectors } from "./index";

let level = "info";
if ("DEBUG" in process.env && process.env.DEBUG.match(/true|1/)) {
    level = "debug";
}
export const console = createLogger({
    format: format.cli(),
    level,
    transports: [new transports.Console()],
});

export const nick = new Nick({
    loadImages: false,
    printPageErrors: false,
    // headless: false,
    userAgent: "Mozilla/5.0",
});

export let tab: null | Tab;

export function HandleError(e: Error) {
    console.warn(`${e}`);
}

/**
 * Scrapes information for a specific car.
 * @export
 * @param {JQuery.PlainObject} arg
 * @param {(err: string, res: any) => any} callback
 * @returns {*}
 */
export const scrape: Scraper = (m: Page, callback: Callback): any => {
    let err: null | string = null;
    const title = document.title.replace(/^.*\| /, "").split(" ");
    const data = {
        interior: "Other",
        link: document.location.href,
        make: title[1],
        model: `${title[2]} ${title[0]}`,
        seller: document.location.hostname,
    };
    for (const key in m) {
        if (m.hasOwnProperty(key)) {
            try {
                const value = (k, Default) => {
                    switch (k) {
                        case "seller":
                            return $(location).attr("origin");
                        case "link":
                            return $(location).attr("href");
                        /*                         case "mileage":
                                                    if ($(m[k]).text() !== "") {
                                                        const miles = $(m[key]).text();
                                                        return Number(miles);
                                                    } */
                        case "url":
                            break;
                        default:
                            if ($(m[k]).text() !== "") {
                                return $(m[k]).text().trim();
                            }
                    }
                    return Default;
                };
                data[key] = value(key, data[key]);
            } catch (e) {
                console.log(e);
                err = String(e);
            }
        }
    }
    callback(err, data);
};

/**
 * Opens `url` in a new tab and scrapes it by calling `tab.evaluate(scraper(selectors));`.
 * If `untilVisible` is supplied, visit will wait for the specified selector to load before scraping.
 *
 * @see Nick.Tab.evaluate
 */
export function visit(url: URL | string, scraper: Scraper, selectors: Selectors, untilVisible?: JQuery.Selector | JQuery.Selector[], wait?: number): Promise<any>;
export function visit(url: URL | string, scraper: Scraper, opts: Page): Promise<any>;
export async function visit(url: URL | string, scraper: Scraper, ...opts: any): Promise<any> {
    try {
        try {
            if (typeof url === "string") {
                url = new URL(url);
            }
        } catch (e) {
            HandleError(e);
            return e;
        }
        let selectors: Selectors = [];
        let untilVisible: JQuery.Selector | JQuery.Selector[] = [];
        let wait: number = 0;

        if (instanceofPage(opts[0])) {
            selectors = opts[0].elements;
            untilVisible = opts[0].waitFor;
            wait = opts[0].wait;
        } else {
            selectors = opts[0];
            untilVisible = opts[1];
            wait = opts[2];
        }
        try {
            if (tab === null || tab === undefined) {
                tab = await nick.newTab();
            }
            if (wait > 0) {
                await tab.wait(wait);
            }
            await tab.open(url.href);
            let ret;
            if (untilVisible !== undefined) {
                if (typeof untilVisible === "string") {
                    untilVisible = [untilVisible];
                }
                for (const elem of untilVisible) {
                    try {
                        await tab.untilVisible(elem); // Make sure we have loaded the page.
                    } catch (e) {
                        console.error(e);
                        await tab.open(url.href);
                        await fs.writeFile("./page.html", await tab.getContent());
                    }
                }
                try {
                    await tab.inject("http://code.jquery.com/jquery-3.2.1.min.js"); // We're going to use jQuery to scrape
                    const data = await tab.evaluate(scraper, selectors);
                    console.debug(`data: ${data}`);
                    ret = data;
                } catch (e) {
                    console.error(e);
                    ret = e;
                }
            }
            return ret;
        } catch (e) {
            console.error(e);
        }
    } catch (e) {
        console.error(e.stack);
        throw new Error(e);
    }
}

/** @returns {boolean} whether `o` implements the `Page` interface. */
function instanceofPage(o: any): boolean {
    if (typeof o !== "object") {
        console.debug(`${o} ! instanceof Page: typeof o is not "object"`);
        return false;
    }
    if ("waitFor" in o && typeof o.waitFor !== "string") {
        if (!(o.waitFor instanceof Array)) {
            console.debug(`${o} ! instanceof Page: typeof o.waitFor is not "string" or "string[]"`);
            return false;
        }
        for (const elem of o.waitFor) {
            if (typeof elem !== "string") {
                console.debug(`${o} ! instanceof Page: typeof o.waitFor is not "string" or "string[]"`);
                return false;
            }
        }
    }
    if ("wait" in o && typeof o.wait !== "number") {
        console.debug(`"${JSON.stringify(o)}" ! instanceof Page: o.wait is not a number.`);
        return false;
    }
    if ("elements" in o) {
        if (typeof o.elements !== "object") {
            console.debug(`"${JSON.stringify(o)}" ! instanceof Page: o.elements is not an object`);
            return false;
        }
        for (const key in o.elements) {
            if (typeof key !== "string" || (typeof o.elements[key] !== "string" && !(o.elements[key] instanceof Array))) {
                // console.debug(`"${JSON.stringify(o)}" ! instanceof Page: o.elements is not "{[name: string]: string}"`);
                // return false;
            }
        }
    }
    return true;
}
