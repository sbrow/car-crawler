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
if (process.env.CHROME_PATH === undefined) {
    process.env.CHROME_PATH = process.env.npm_package_config_chrome_path;
}
var logform_1 = require("logform");
var Nick = require("nickjs");
var winston_1 = require("winston");
var level = "info";
if ("DEBUG" in process.env && process.env.DEBUG.match(/true|1/)) {
    level = "debug";
}
exports.console = winston_1.createLogger({
    format: logform_1.format.cli(),
    level: level,
    transports: [new winston_1.transports.Console()]
});
var quiet = Boolean(process.env.npm_package_config_nickjs_quiet);
exports.nick = new Nick({
    headless: true,
    loadImages: false,
    printNavigation: quiet,
    printPageErrors: quiet,
    printAborts: quiet,
    userAgent: "Mozilla/5.0",
    // whitelist: ["www.cars.com", "www.carfax.com", "www.cargurus.com"],
    blacklist: ["www.facebook.com"]
});
var tab;
function HandleError(e) {
    exports.console.warn("" + e);
}
exports.HandleError = HandleError;
/**
 * Scrapes information for a specific car.
 * @export
 * @param {JQuery.PlainObject} arg
 * @param {(err: string, res: any) => any} callback
 * @returns {*}
 */
exports.scrape = function (m, callback) {
    var err = null;
    var title = document.title.replace(/^.*\| /, "").split(" ");
    var data = {
        interior: "Other",
        link: document.location.href,
        make: title[1],
        model: title[2] + " " + title[0],
        seller: document.location.hostname
    };
    for (var key in m) {
        if (m.hasOwnProperty(key)) {
            try {
                var value = function (k, Default) {
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
            }
            catch (e) {
                exports.console.log(e);
                err = String(e);
            }
        }
    }
    callback(err, data);
};
function visit(url, scraper) {
    var opts = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        opts[_i - 2] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var selectors, untilVisible, wait, ret, _a, untilVisible_1, elem, e_1, data, e_2, e_3, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 19, , 20]);
                    try {
                        if (typeof url === "string") {
                            url = new URL(url);
                        }
                    }
                    catch (e) {
                        HandleError(e);
                        return [2 /*return*/, e];
                    }
                    selectors = [];
                    untilVisible = [];
                    wait = 0;
                    if (instanceofPage(opts[0])) {
                        selectors = opts[0].elements;
                        untilVisible = opts[0].waitFor;
                        wait = opts[0].wait;
                    }
                    else {
                        selectors = opts[0];
                        untilVisible = opts[1];
                        wait = opts[2];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 17, , 18]);
                    if (!(tab === null || tab === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, exports.nick.newTab()];
                case 2:
                    // console.debug(`nick/tab: ${JSON.stringify({ nick, tab })}`);
                    tab = _b.sent();
                    _b.label = 3;
                case 3:
                    if (!(wait > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, tab.wait(wait)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [4 /*yield*/, tab.open(url.href)];
                case 6:
                    _b.sent();
                    ret = void 0;
                    if (!(untilVisible !== undefined)) return [3 /*break*/, 16];
                    if (typeof untilVisible === "string") {
                        untilVisible = [untilVisible];
                    }
                    _a = 0, untilVisible_1 = untilVisible;
                    _b.label = 7;
                case 7:
                    if (!(_a < untilVisible_1.length)) return [3 /*break*/, 12];
                    elem = untilVisible_1[_a];
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, tab.untilVisible(elem)];
                case 9:
                    _b.sent(); // Make sure we have loaded the page.
                    exports.console.debug("Found!");
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _b.sent();
                    exports.console.error("; @visit\" " + e_1);
                    return [3 /*break*/, 11];
                case 11:
                    _a++;
                    return [3 /*break*/, 7];
                case 12:
                    _b.trys.push([12, 15, , 16]);
                    return [4 /*yield*/, tab.inject("./node_modules/jquery/dist/jquery.js")];
                case 13:
                    _b.sent(); // We're going to use jQuery to scrape
                    return [4 /*yield*/, tab.evaluate(scraper, selectors)];
                case 14:
                    data = _b.sent();
                    exports.console.debug("data: " + JSON.stringify(data));
                    ret = data;
                    return [3 /*break*/, 16];
                case 15:
                    e_2 = _b.sent();
                    exports.console.error("@inject " + e_2);
                    ret = e_2;
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/, ret];
                case 17:
                    e_3 = _b.sent();
                    exports.console.error("@3 " + e_3);
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 20];
                case 19:
                    e_4 = _b.sent();
                    exports.console.error(e_4.stack);
                    throw new Error(e_4);
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.visit = visit;
/** @returns {boolean} whether `o` implements the `Page` interface. */
function instanceofPage(o) {
    if (typeof o !== "object") {
        exports.console.debug(o + " ! instanceof Page: typeof o is not \"object\"");
        return false;
    }
    if ("waitFor" in o && typeof o.waitFor !== "string") {
        if (!(o.waitFor instanceof Array)) {
            exports.console.debug(o + " ! instanceof Page: typeof o.waitFor is not \"string\" or \"string[]\"");
            return false;
        }
        for (var _i = 0, _a = o.waitFor; _i < _a.length; _i++) {
            var elem = _a[_i];
            if (typeof elem !== "string") {
                exports.console.debug(o + " ! instanceof Page: typeof o.waitFor is not \"string\" or \"string[]\"");
                return false;
            }
        }
    }
    if ("wait" in o && typeof o.wait !== "number") {
        exports.console.debug("\"" + JSON.stringify(o) + "\" ! instanceof Page: o.wait is not a number.");
        return false;
    }
    if ("elements" in o) {
        if (typeof o.elements !== "object") {
            exports.console.debug("\"" + JSON.stringify(o) + "\" ! instanceof Page: o.elements is not an object");
            return false;
        }
        for (var key in o.elements) {
            if (typeof key !== "string" || (typeof o.elements[key] !== "string" && !(o.elements[key] instanceof Array))) {
                // console.debug(`"${JSON.stringify(o)}" ! instanceof Page: o.elements is not "{[name: string]: string}"`);
                // return false;
            }
        }
    }
    return true;
}
//# sourceMappingURL=funcs.js.map