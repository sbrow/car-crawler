import { console } from "./funcs";

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
        console.debug(`Car input: ${JSON.stringify(data)}`);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                switch (key) {
                    case "date":
                        const tempDate: string = data[key].substring(0, 10);
                        if (tempDate.match(/days/)) {
                            const days = Number(tempDate.split(" ")[0]);
                            this.date = new Date();
                            this.date.setDate(this.date.getDate() - days);
                        } else {
                            try {
                                this.date = new Date(tempDate);
                            } catch (error) {
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
}
