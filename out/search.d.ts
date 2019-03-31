/**
 * Scrapes a "Search Results" page.
 *
 * @export
 * @class Search
 */
export declare function Search(opts: SearchOptions): Promise<URL[] | null>;
export declare function SearchResults(opts: SearchResultOptions): Promise<object[] | Error>;
