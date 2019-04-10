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
/* tslint:disable only-arrow-functions */
var assert = require("assert");
var mongodb = require("mongodb");
var funcs_1 = require("./funcs");
var main_1 = require("./main");
var search_1 = require("./search");
var sites_1 = require("./sites");
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var dbName, dbRoute, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dbName = "heroku_dn9q80h5";
                    dbRoute = "mongodb://heroku_dn9q80h5:bqeqsamrl6mpv1um6mmbjj4u7u@ds149404.mlab.com:49404/" + dbName;
                    return [4 /*yield*/, mongodb.connect(dbRoute, { useNewUrlParser: true })];
                case 1:
                    client = _a.sent();
                    return [2 /*return*/, client.db(dbName)];
            }
        });
    });
}
after(function () {
    new Promise(function (resolve) { return setTimeout(resolve, 5000); })
        .then(function (res) {
        funcs_1.nick.exit(0);
    });
});
describe("sites", function () {
    describe("#Search", function () {
        var totalPages = function (perPage) { return perPage * sites_1.pages; };
        var tests = [
            { site: "carfax", want: totalPages(25) },
            { site: "cargurus", want: totalPages(19) },
            { site: "cars", want: totalPages(100) },
        ];
        var _loop_1 = function (test_1) {
            it("\"" + test_1.site + "\" should return " + test_1.want + " ", function () {
                return __awaiter(this, void 0, void 0, function () {
                    var got;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.timeout(15000);
                                return [4 /*yield*/, search_1.Search(main_1.sites[test_1.site].search)];
                            case 1:
                                got = _a.sent();
                                assert.strictEqual(test_1.want, got.length);
                                return [2 /*return*/, got];
                        }
                    });
                });
            });
        };
        for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
            var test_1 = tests_1[_i];
            _loop_1(test_1);
        }
    });
    describe("#visit", function () {
        it("should ...", function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(20000);
                            return [4 /*yield*/, funcs_1.visit("https://www.cars.com/vehicledetail/detail/764313498/overview/", search_1.scrapePage, main_1.sites.cars.result)];
                        case 1:
                            data = _a.sent();
                            console.log(data);
                            return [2 /*return*/, data];
                    }
                });
            });
        });
    });
});
// describe("main", async function () {
//     const db = await connect();
//     for (const site of sites) {
//         main(db, "cars", site)
//             .then((res) => console.log(res));
//     }
//     nick.exit();
// });;
//# sourceMappingURL=test.spec.js.map