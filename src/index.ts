/**
 * Car represents a dealer listing for a vehicle.
 *
 * @interface Car
 */
// interface Car {
//     exterior?: JQuery.Selector;
//     interior?: JQuery.Selector;
//     make?: JQuery.Selector;
//     mileage?: JQuery.Selector;
//     model?: JQuery.Selector;
//     price?: JQuery.Selector;
//     url?: URL;
//     vin?: JQuery.Selector;
// }

export type Selectors = { [name: string]: JQuery.Selector | JQuery.Selector[] } | JQuery.Selector[];
/**
 * Pairs a JQuery Selector and a template url,
 * to be combined into full url to be further scraped.
 *
 * @interface ResultsPage
 */
export interface ResultsPage {
    /** Matches search results */
    result: JQuery.Selector;
    /** A template string  */
    resultURL: string;
}

/**
 * A webpage to be scraped.
 *
 * @interface Page
 */
export interface Page {
    /**
     * A map of strings to HTML elements.
     * Provides a template for the objects
     * returned from scraping.
     * */
    elements: { [name: string]: JQuery.Selector | JQuery.Selector[]; };
    /** Elements to waitUntilVisible before scraping.*/
    waitFor?: JQuery.Selector | JQuery.Selector[];
    /** Time to wait before scraping. */
    wait?: number;
}

/**
 * Parameters for the Search function.
 * @see Search
 * @interface SearchOptions
 * @extends {ResultsPage}
 */
export interface SearchOptions extends ResultsPage {
    /** Where to begin the search. */
    entry: URL | string;
    /** The next page button/link. */
    next?: JQuery.Selector;
    /** The number of pages to search */
    numPages?: number;
}

/**
 * Parameters accepted by the SearchResults function
 *
 * @see SearchResults
 */
export interface SearchResultOptions {
    search: SearchOptions;
    result: Page;
}
export declare type Callback = (err: string, res: any) => any;
export declare type Scraper = (arg: JQuery.PlainObject, callback: Callback) => any;
