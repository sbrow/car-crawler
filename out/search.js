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
exports.__esModule = true;
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
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var ky = keys_1[_i];
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
        var n, results, url, tab, e_1, tmpResults, i, e_2, e_3, e_4, print, _i, results_1, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
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
                    tab = _a.sent();
                    if (typeof opts.entry === "string") {
                        url = opts.entry;
                    }
                    else {
                        url = opts.entry.href;
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, tab.open(url)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    funcs_1.HandleError(e_1);
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
                    _a.label = 6;
                case 6:
                    if (!(i < n)) return [3 /*break*/, 19];
                    if (!(i > 0)) return [3 /*break*/, 11];
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 10, , 11]);
                    funcs_1.console.debug("Wait for 'Next Page' button to be visible...");
                    // "Next Page" Button/link.
                    return [4 /*yield*/, tab.untilVisible(opts.next)];
                case 8:
                    // "Next Page" Button/link.
                    _a.sent();
                    funcs_1.console.debug("'Next Page' button found!");
                    return [4 /*yield*/, tab.click(opts.next)];
                case 9:
                    _a.sent();
                    funcs_1.console.debug("button clicked!");
                    return [3 /*break*/, 11];
                case 10:
                    e_2 = _a.sent();
                    funcs_1.HandleError(e_2);
                    return [3 /*break*/, 11];
                case 11:
                    _a.trys.push([11, 14, , 15]);
                    return [4 /*yield*/, tab.untilVisible(opts.result)];
                case 12:
                    _a.sent();
                    funcs_1.console.debug("Injecting JQuery...");
                    return [4 /*yield*/, tab.inject("./node_modules/jquery/dist/jquery.min.js")];
                case 13:
                    _a.sent(); // We're going to use jQuery to scrape
                    funcs_1.console.debug("JQuery injected!");
                    return [3 /*break*/, 15];
                case 14:
                    e_3 = _a.sent();
                    funcs_1.HandleError(e_3);
                    return [3 /*break*/, 15];
                case 15:
                    _a.trys.push([15, 17, , 18]);
                    funcs_1.console.debug("Evaluating page...");
                    return [4 /*yield*/, tab.evaluate(opts, scrapeResult)];
                case 16:
                    tmpResults = _a.sent();
                    funcs_1.console.debug(tmpResults.length + " results.");
                    tmpResults.forEach(function (result) {
                        results.push(new URL(result));
                    });
                    funcs_1.console.debug("page evaluated!");
                    return [3 /*break*/, 18];
                case 17:
                    e_4 = _a.sent();
                    funcs_1.HandleError(e_4);
                    return [3 /*break*/, 18];
                case 18:
                    i++;
                    return [3 /*break*/, 6];
                case 19:
                    print = [];
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        link = results_1[_i];
                        print.push(link.href);
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
        var ret, results, result, urls, _i, urls_1, url, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    results = new Array();
                    result = void 0;
                    return [4 /*yield*/, Search(opts.search)];
                case 1:
                    urls = _a.sent();
                    _i = 0, urls_1 = urls;
                    _a.label = 2;
                case 2:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 5];
                    url = urls_1[_i];
                    return [4 /*yield*/, funcs_1.visit(url, scrapePage, opts.result)];
                case 3:
                    result = _a.sent();
                    results.push(result);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    ret = results;
                    return [3 /*break*/, 7];
                case 6:
                    e_5 = _a.sent();
                    funcs_1.HandleError(e_5);
                    ret = e_5;
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, ret];
            }
        });
    });
}
exports.SearchResults = SearchResults;
//# sourceMappingURL=search.js.map