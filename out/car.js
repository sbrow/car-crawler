"use strict";
exports.__esModule = true;
var Car = /** @class */ (function () {
    function Car(data) {
        console.debug(JSON.stringify(data));
        this.make = data.make;
        if ("date" in data) {
            var tempDate = data.date.substring(0, 10);
            if (tempDate.match(/days/)) {
                var days = Number(tempDate.split(" ")[0]);
                this.date = new Date();
                this.date.setDate(this.date.getDate() - days);
            }
            else {
                this.date = new Date(tempDate);
            }
        }
        this.mileage = data.mileage;
        this.model = data.model;
        this.exterior = data.exterior;
        this.interior = data.interior;
        this.vin = data.vin;
        this.price = data.price;
        this.link = data.link;
        console.debug(this);
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map