export class Car {
    public make: string;
    public model: string;
    public exterior: string;
    public interior: string;
    public vin: string;
    public seller: string;
    public price: string;
    public link: string;

    constructor(data: { [name: string]: any }) {
        this.make = data.make;
        this.model = data.model;
        this.exterior = data.exterior;
        this.interior = data.interior;
        this.vin = data.vin;
        this.seller = `${data.seller.name}\n${data.seller.address}\n${data.seller.phone}`;
        this.price = data.price;
        this.link = data.url;
    }
}
