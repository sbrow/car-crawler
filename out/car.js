"use strict";
exports.__esModule = true;
var funcs_1 = require("./funcs");
var Car = /** @class */ (function () {
    function Car(data) {
        funcs_1.console.debug("Car input: " + JSON.stringify(data));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                switch (key) {
                    case "date":
                        var tempDate = data[key].substring(0, 10);
                        if (tempDate.match(/days/)) {
                            var days = Number(tempDate.split(" ")[0]);
                            this.date = new Date();
                            this.date.setDate(this.date.getDate() - days);
                        }
                        else {
                            try {
                                this.date = new Date(tempDate);
                            }
                            catch (error) {
                                funcs_1.console.warn(error);
                            }
                        }
                        break;
                    default:
                        this[key] = data[key];
                }
            }
        }
        funcs_1.console.debug(this);
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map