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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var ProgressBar = require("progress");
var car_1 = require("./car");
var funcs_1 = require("./funcs");
var search_1 = require("./search");
var sites_1 = require("./sites");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, exitCode, cars, bar, _b, _c, _d, i, site, results, car, e_1_1, e_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    exitCode = 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 10, , 11]);
                    cars = new Array();
                    bar = new ProgressBar("Finding cars from \":site\" :current/:total [:bar] (:percent)\r\n", {
                        head: "+",
                        total: sites_1.sites.length
                    });
                    bar.render({ site: sites_1.sites[0].search.entry });
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _b = __values(sites_1.sites.entries()), _c = _b.next();
                    _e.label = 3;
                case 3:
                    if (!!_c.done) return [3 /*break*/, 6];
                    _d = __read(_c.value, 2), i = _d[0], site = _d[1];
                    return [4 /*yield*/, search_1.SearchResults(site)];
                case 4:
                    results = _e.sent();
                    if (!(results instanceof Error)) {
                        car = new car_1.Car(results);
                        cars.push(car);
                    }
                    bar.tick({ site: sites_1.sites[i + 1].search.entry });
                    _e.label = 5;
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: 
                // const path = "./cars.json";
                // await fs.writeFile(path, JSON.stringify({ aaData: cars }, null, 2));
                // console.info(`Results saved to ${path}`);
                return [2 /*return*/, cars];
                case 10:
                    e_2 = _e.sent();
                    funcs_1.HandleError(e_2);
                    exitCode = 1;
                    return [2 /*return*/, e_2];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
// main();
//# sourceMappingURL=main.js.map