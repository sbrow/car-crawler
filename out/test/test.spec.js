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
var mongodb = require("mongodb");
var funcs_1 = require("../funcs");
var main_1 = require("../main");
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
    new Promise(function (resolve) { return setTimeout(resolve, 10000); })
        .then(function (res) {
        funcs_1.nick.exit(0);
    });
});
/* describe.skip("sites", function () {
    describe("#Search", function () {
        const totalPages = (perPage: number) => perPage * pages;
        const tests = [
            { site: "carfax", want: totalPages(25) },
            { site: "cargurus", want: totalPages(19) },
            { site: "cars", want: totalPages(100) },
        ];

        for (const test of tests) {
            it(`"${test.site}" should return ${test.want} `, async function () {
                this.timeout(15000);

                const got = await Search(sites[test.site].search);
                assert.strictEqual(test.want, got.length);
                return got;
            });
        }
    });

    describe("#visit", function () {
        const tests = {
            cargurus: [
                // "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=14850#listing=229809122_isFeatured",
                "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=14850#listing=234741649_isFeatured",
            ],
            // cars: ["https://www.cars.com/vehicledetail/detail/764313498/overview/"],
            // carfax: ["https://www.carfax.com/vehicle/1FDRF3HT0CEB32118"],
        };
        for (const site in tests) {
            for (const listing of tests[site]) {
                it("should ...", async function () {
                    this.timeout(20000);
                    const data = await visit(listing, scrapePage, sites[site].result);
                    console.log(data);
                    console.log(new Car(data));
                    return data;
                });
            }
        }
    });
}); */
describe("main", function () {
    return __awaiter(this, void 0, void 0, function () {
        var db, cars, _a, _b, _i, site, section, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, connect()];
                case 1:
                    db = _c.sent();
                    cars = [];
                    _a = [];
                    for (_b in main_1.sites)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    site = _a[_i];
                    if (!main_1.sites.hasOwnProperty(site)) return [3 /*break*/, 6];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, main_1.main(db, "cars", main_1.sites[site])];
                case 4:
                    section = _c.sent();
                    if (section instanceof Array) {
                        cars.push.apply(cars, section);
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _c.sent();
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, cars];
            }
        });
    });
});
//# sourceMappingURL=test.spec.js.map