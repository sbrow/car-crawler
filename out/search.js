"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
exports.__esModule = true;
var ProgressBar = require("progress");
var funcs_1 = require("./funcs");
/**
 * @returns the results from a "Search Results" style page.
 */
var scrapeResult = function (selectors, callback) {
    var err = null;
    var newListings = [];
    try {
        $(selectors.result).each(function () {
            var reg = /(\$\()(.*)(\))/;
            var attr = selectors.resultURL.match(reg)[2];
            attr = $(this).attr(attr);
            attr = attr.replace(/listing|featured/g, "").replace(/[-_]+/g, "");
            var link;
            try {
                link = new URL(selectors.resultURL.replace(reg, attr));
                newListings.push(link.href);
            }
            catch (e) {
                funcs_1.HandleError(e);
            }
        });
    }
    catch (e) {
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
var scrapePage = function (m, callback) {
    var e_1, _a;
    var err = null;
    var title = document.title.replace(/^([\A-Z\d]* \|)|(Used)/, "").split(" ");
    var data = {
        make: title[1],
        model: title[2] + " " + title[0],
        mileage: "",
        price: "",
        exterior: "",
        interior: "",
        link: "<a href=\"" + $(location).attr("href") + "\">" + document.location.host + "</a>",
        seller: ""
    };
    for (var key in m) {
        if (m.hasOwnProperty(key)) {
            try {
                var keys = m[key];
                if (typeof keys === "string") {
                    keys = [keys];
                }
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var ky = keys_1_1.value;
                        var value = function (k, Default) {
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
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1["return"])) _a.call(keys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (e) {
                funcs_1.HandleError(e);
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
function Search(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2, _a, n, results, url, tab, e_3, tmpResults, i, e_4, e_5, e_6, print, results_1, results_1_1, link;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (opts.entry === null) {
                        return [2 /*return*/, null];
                    }
                    n = 1;
                    if ("numPages" in opts && opts.numPages > 0) {
                        n = opts.numPages;
                    }
                    results = new Array();
                    return [4 /*yield*/, funcs_1.nick.newTab()];
                case 1:
                    tab = _b.sent();
                    if (typeof opts.entry === "string") {
                        url = opts.entry;
                    }
                    else {
                        url = opts.entry.href;
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, tab.open(url)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _b.sent();
                    funcs_1.HandleError(e_3);
                    return [3 /*break*/, 5];
                case 5:
                    if (opts.next === undefined && n > 1) {
                        try {
                            throw Error("Can't search more than one page, selector 'next' was not provided.");
                        }
                        catch (e) {
                            funcs_1.HandleError(e);
                        }
                        n = 1;
                    }
                    i = 0;
                    _b.label = 6;
                case 6:
                    if (!(i < n)) return [3 /*break*/, 19];
                    if (!(i > 0)) return [3 /*break*/, 11];
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 10, , 11]);
                    funcs_1.console.debug("Wait for 'Next Page' button to be visible...");
                    // "Next Page" Button/link.
                    return [4 /*yield*/, tab.untilVisible(opts.next)];
                case 8:
                    // "Next Page" Button/link.
                    _b.sent();
                    funcs_1.console.debug("'Next Page' button found!");
                    return [4 /*yield*/, tab.click(opts.next)];
                case 9:
                    _b.sent();
                    funcs_1.console.debug("button clicked!");
                    return [3 /*break*/, 11];
                case 10:
                    e_4 = _b.sent();
                    funcs_1.HandleError(e_4);
                    return [3 /*break*/, 11];
                case 11:
                    _b.trys.push([11, 14, , 15]);
                    return [4 /*yield*/, tab.untilVisible(opts.result)];
                case 12:
                    _b.sent();
                    funcs_1.console.debug("Injecting JQuery...");
                    return [4 /*yield*/, tab.inject("./node_modules/jquery/dist/jquery.min.js")];
                case 13:
                    _b.sent(); // We're going to use jQuery to scrape
                    funcs_1.console.debug("JQuery injected!");
                    return [3 /*break*/, 15];
                case 14:
                    e_5 = _b.sent();
                    funcs_1.HandleError(e_5);
                    return [3 /*break*/, 15];
                case 15:
                    _b.trys.push([15, 17, , 18]);
                    funcs_1.console.debug("Evaluating page...");
                    return [4 /*yield*/, tab.evaluate(opts, scrapeResult)];
                case 16:
                    tmpResults = _b.sent();
                    funcs_1.console.debug(tmpResults.length + " results.");
                    tmpResults.forEach(function (result) {
                        results.push(new URL(result));
                    });
                    funcs_1.console.debug("page evaluated!");
                    return [3 /*break*/, 18];
                case 17:
                    e_6 = _b.sent();
                    funcs_1.HandleError(e_6);
                    return [3 /*break*/, 18];
                case 18:
                    i++;
                    return [3 /*break*/, 6];
                case 19:
                    print = [];
                    try {
                        for (results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                            link = results_1_1.value;
                            print.push(link.href);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (results_1_1 && !results_1_1.done && (_a = results_1["return"])) _a.call(results_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    // const path = "./links.json";
                    // await fs.writeFile(path, JSON.stringify(print, null, 2));
                    // console.info(`Results saved to ${path}`);
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.Search = Search;
function SearchResults(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var e_7, _a, ret, results, result, urls, bar, urls_1, urls_1_1, url, e_7_1, e_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    results = new Array();
                    result = void 0;
                    return [4 /*yield*/, Search(opts.search)];
                case 1:
                    urls = _b.sent();
                    if (typeof opts.search.entry === "string") {
                        opts.search.entry = new URL(opts.search.entry);
                    }
                    bar = new ProgressBar("Scraping results from \"" + opts.search.entry.hostname + "\" :current/:total [:bar] (:percent)\r\n", {
                        head: "+",
                        total: urls.length
                    });
                    bar.render();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    urls_1 = __values(urls), urls_1_1 = urls_1.next();
                    _b.label = 3;
                case 3:
                    if (!!urls_1_1.done) return [3 /*break*/, 6];
                    url = urls_1_1.value;
                    return [4 /*yield*/, funcs_1.visit(url, scrapePage, opts.result)];
                case 4:
                    result = _b.sent();
                    results.push(result);
                    bar.tick();
                    _b.label = 5;
                case 5:
                    urls_1_1 = urls_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_7_1 = _b.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (urls_1_1 && !urls_1_1.done && (_a = urls_1["return"])) _a.call(urls_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7 /*endfinally*/];
                case 9:
                    ret = results;
                    return [3 /*break*/, 11];
                case 10:
                    e_8 = _b.sent();
                    funcs_1.HandleError(e_8);
                    ret = e_8;
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/, ret];
            }
        });
    });
}
exports.SearchResults = SearchResults;
//# sourceMappingURL=search.js.map