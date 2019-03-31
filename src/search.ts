import { promises as fs } from "fs";

import { console, HandleError, nick, visit } from "./funcs";

/**
 * @returns the results from a "Search Results" style page.
 */
const scrapeResult: Scraper = (selectors: ResultsPage, callback: Callback): any => {
    let err: null | string = null;
    const newListings: string[] = [];

    try {
        $(selectors.result).each(function () {
            const reg = /(\$\()(.*)(\))/;
            let attr: string = selectors.resultURL.match(reg)[2];
            attr = $(this).attr(attr);
            attr = attr.replace(/listing|featured/g, "").replace(/[-_]+/g, "");
            let link: URL;
            try {
                link = new URL(selectors.resultURL.replace(reg, attr));
                newListings.push(link.href);
            } catch (e) {
                HandleError(e);
            }
        });
    } catch (e) {
        err = e;
    }
    callback(err, newListings);
};

/**
 * Scrapes information for a specific car.
 * @export
 * @param {JQuery.PlainObject} arg
 * @param {(err: string, res: any) => any} callback
 * @returns {*}
 */
const scrapePage: Scraper = (m: Page, callback: Callback): any => {
    let err: null | string = null;
    const title = document.title.replace(/^([\A-Z\d]* \|)|(Used)/, "").split(" ");
    const data = {
        make: title[1],
        model: `${title[2]} ${title[0]}`,
        mileage: "",
        price: "",
        exterior: "",
        interior: "",
        link: `<a href="${$(location).attr("href")}">${document.location.host}</a>`,
        seller: "",
    };
    for (const key in m) {
        if (m.hasOwnProperty(key)) {
            try {
                let keys = m[key];
                if (typeof keys === "string") {
                    keys = [keys];
                }
                for (const ky of keys) {
                    const value = (k, Default) => {
                        switch (k) {
                            default:
                                if ($(m[k]).text() !== "") {
                                    return $(m[k]).text().trim().replace("Not provided", "");
                                }
                        }
                        return Default;
                    };
                    data[key] = value(ky, data[key]);
                    if (data[key] !== undefined && data[key] !== null && data[key] != "") {
                        break;
                    }
                }
            } catch (e) {
                HandleError(e);
                err = String(e);
            }
        }
    }
    callback(err, data);
};

/**
 * Scrapes a "Search Results" page.
 *
 * @export
 * @class Search
 */
export async function Search(opts: SearchOptions): Promise<URL[] | null> {
    if (opts.entry === null) {
        return null;
    }

    let n = 1;
    if ("numPages" in opts && opts.numPages > 0) {
        n = opts.numPages;
    }

    const results: URL[] = new Array<URL>();
    let url: string;

    const tab = await nick.newTab();

    if (typeof opts.entry === "string") {
        url = opts.entry;
    } else {
        url = opts.entry.href;
    }
    try {
        await tab.open(url);
    } catch (e) {
        HandleError(e);
    }

    if (opts.next === undefined && n > 1) {
        try {
            throw Error("Can't search more than one page, selector 'next' was not provided.");
        } catch (e) {
            HandleError(e);
        }
        n = 1;
    }

    let tmpResults: string[];
    for (let i = 0; i < n; i++) {
        if (i > 0) {
            try {
                console.debug("Wait for 'Next Page' button to be visible...");
                // "Next Page" Button/link.
                await tab.untilVisible(opts.next);
                console.debug("'Next Page' button found!");
                await tab.click(opts.next);
                console.debug("button clicked!");
            } catch (e) {
                HandleError(e);
            }
        }
        try {
            await tab.untilVisible(opts.result);
            console.debug("Injecting JQuery...");
            await tab.inject("./node_modules/jquery/dist/jquery.min.js"); // We're going to use jQuery to scrape
            console.debug("JQuery injected!");
        } catch (e) {
            HandleError(e);
        }
        try {
            console.debug("Evaluating page...");
            tmpResults = await tab.evaluate(opts, scrapeResult);
            console.debug(`${tmpResults.length} results.`);
            tmpResults.forEach((result) => {
                results.push(new URL(result));
            });
            console.debug("page evaluated!");
        } catch (e) {
            HandleError(e);
        }
    }
    const print = [];
    for (const link of results) {
        print.push(link.href);
    }
    // const path = "./links.json";
    // await fs.writeFile(path, JSON.stringify(print, null, 2));
    // console.info(`Results saved to ${path}`);
    return results;
}

export async function SearchResults(opts: SearchResultOptions): Promise<object[] | Error> {
    let ret: any[] | Error;
    try {
        const results: object[] = new Array<object>();
        let result: object;
        const urls = await Search(opts.search);
        for (const url of urls) {
            result = await visit(url, scrapePage, opts.result);
            results.push(result);
        }
        ret = results;
    } catch (e) {
        HandleError(e);
        ret = e;
    }
    return ret;
}
