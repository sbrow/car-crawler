"use strict";
exports.__esModule = true;
var Car = /** @class */ (function () {
    function Car(data) {
        console.debug("Car input: " + JSON.stringify(data));
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
                                console.warn(error);
                            }
                        }
                        break;
                    default:
                        this[key] = data[key];
                }
            }
        }
        console.debug(this);
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map