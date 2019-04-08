"use strict";
exports.__esModule = true;
var Car = /** @class */ (function () {
    function Car(data) {
        console.debug(JSON.stringify(data));
        this.make = data.make;
        this.model = data.model;
        this.exterior = data.exterior;
        this.interior = data.interior;
        this.vin = data.vin;
        this.seller = data.seller_name + "\n" + data.seller_location + "\n" + data.seller_phone;
        this.price = data.price;
        this.link = data.link;
        console.debug(this);
    }
    return Car;
}());
exports.Car = Car;
//# sourceMappingURL=car.js.map