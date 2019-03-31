/// <reference types="jquery" />
import Tab from "nickjs";
export declare const console: import("winston").Logger;
export declare const nick: any;
export declare let tab: null | Tab;
export declare function HandleError(e: Error): void;
/**
 * Scrapes information for a specific car.
 * @export
 * @param {JQuery.PlainObject} arg
 * @param {(err: string, res: any) => any} callback
 * @returns {*}
 */
export declare const scrape: Scraper;
/**
 * Opens `url` in a new tab and scrapes it by calling `tab.evaluate(scraper(selectors));`.
 * If `untilVisible` is supplied, visit will wait for the specified selector to load before scraping.
 *
 * @see Nick.Tab.evaluate
 */
export declare function visit(url: URL | string, scraper: Scraper, selectors: Selectors, untilVisible?: JQuery.Selector | JQuery.Selector[], wait?: number): Promise<any>;
export declare function visit(url: URL | string, scraper: Scraper, opts: Page): Promise<any>;
