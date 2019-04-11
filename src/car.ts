export class Car {
    public make: string;
    public model: string;
    public mileage: string;
    public date: Date;
    // public date: string;
    public exterior: string;
    public interior: string;
    public vin: string;
    public seller: string;
    public price: string;
    public link: string;

    constructor(data: { [name: string]: any }) {
        console.debug(JSON.stringify(data));
        this.make = data.make;
        if ("date" in data) {
            const tempDate: string = data.date.substring(0, 10);
            if (tempDate.match(/days/)) {
                const days = Number(tempDate.split(" ")[0]);
                this.date = new Date();
                this.date.setDate(this.date.getDate() - days);
            } else {
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
}
