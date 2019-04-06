"use strict";
exports.__esModule = true;
var Car = /** @class */ (function () {
    function Car(data) {
        this.make = data.make;
        this.model = data.model;
        this.exterior = data.exterior;
        this.interior = data.interior;
        this.vin = data.vin;
        this.seller = data.seller.name + "\n" + data.seller.address + "\n" + data.seller.phone;
        this.price = data.price;
        this.link = data.url;
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map