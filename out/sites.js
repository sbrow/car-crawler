"use strict";
exports.__esModule = true;
var zip = "14850";
var radius = "20"; // miles
/**
 * DOM Mappings for AutoTrader.com
 */
exports.AutoTrader = {
    search: {
        // entry: new URL("https://www.autotrader.com/cars-for-sale/searchresults.xhtml?zip=14850"),
        entry: new URL("https://www.autotrader.com/cars-for-sale/searchresults.xhtml?zip=14850"),
        result: "div.inventory-listing",
        resultURL: "https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=$(id)",
        next: 'a[role="button" href="#"]',
        numPages: 1
    },
    result: {
        elements: {
            mileage: "div.col-lg-4:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:contains(\"MILEAGE\") +",
            interior: "div.col-xs-6:nth-child(7) > div:nth-child(1) > div:nth-child(2) > div:contains(\"INTERIOR\") +",
            exterior: "div.col-xs-6:nth-child(8) > div:nth-child(1) > div:nth-child(2) > div:contains(\"EXTERIOR) +",
            price: "div.text-size-600 > span.first-price",
            vin: "div.col-lg-8:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > span:contains(\"VIN\") +"
        },
        waitFor: ["#mountNode", "div.content-folding-item:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)", "div.col-lg-4", "div.col-lg-8:nth-child(1)", "div.text-size-600 > span.first-price"],
        wait: 1500
    }
};
/** DOM Mappings for Cars.com */
exports.Cars = {
    search: {
        entry: new URL("https://www.cars.com/for-sale/searchresults.action/?page=1&rd=75&searchSource=QUICK_FORM&zc=14850"),
        result: 'a[id^="listing-"]',
        resultURL: "https://www.cars.com/vehicledetail/detail/$(id)/overview/",
        next: "a.button.next-page",
        numPages: 2
    },
    result: {
        elements: {
            exterior: ".infoTable-table > tbody > tr > th:contains(\"Exterior Color\") +",
            interior: "li.vdp-details-basics__item:contains(Interior Color) > span",
            mileage: "li.vdp-details-basics__item:contains(Mileage) > span",
            price: [".vehicle-info__price-display--dealer", ".vehicle-info__price-display"],
            seller_name: ".vdp-dealer-location > .vdp-dealer-info__title",
            seller_location: ".vdp-dealer-location > .vdp-dealer-info__address",
            seller_phone: ".vdp-dealer-contact__phoneStatic",
            vin: "li.vdp-details-basics__item:contains(\"VIN\") > span"
        },
        waitFor: ["div.vehicle-info__price", "div.vdp-details-basics"]
    }
};
/**
 * DOM Mappings for CarFax.com
 */
exports.CarFax = {
    search: {
        entry: new URL("https://www.carfax.com/Used-Sedans_bt7?zip=14850"),
        result: "article[id^=\"listing\"]",
        resultURL: "https://www.carfax.com/vehicle/$(data-vin)",
        next: "#react-app > div > div.spa-container > div > div > div > div.column.small-12.small-order-1.xxlarge-order-2 > div:nth-child(2) > div.column.small-12.medium-12.large-12.xxlarge-8.xxxlarge-9.results-col > div:nth-child(3) > div.column.no-padding-left > ul > li.next > a"
    },
    result: {
        elements: {
            exterior: ".infoTable-table > tbody > tr > th:contains(Exterior) +",
            interior: ".infoTable-table > tbody > tr > th:contains(Interior) +",
            mileage: ".infoTable-table > tbody > tr > th:contains(Mileage) +",
            price: ".infoTable-table > tbody > tr > th:contains(Price) +",
            vin: ".infoTable-table > tbody > tr > th:contains(VIN) +"
        },
        waitFor: ".infoTable-table"
    }
};
/**
 * DOM Mappings for CarGuru.com
 */
exports.CarGuru = {
    search: {
        entry: new URL("https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=14850#resultsPage=1"),
        result: 'div[id*="listing_"]',
        resultURL: "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?#listing=$(id)",
        next: "div.cg-listingSearch-pagingPanel:nth-child(1) > a:nth-child(4)",
        numPages: 1
    },
    result: {
        elements: {
            exterior: ".cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2)",
            interior: ".cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2)",
            mileage: ".cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)",
            price: ".cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)",
            vin: ".cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(10) > td:nth-child(2)"
        },
        waitFor: [".cg-listingDetail-specsWrap"]
    }
};
exports.sites = [exports.Cars, exports.CarFax, exports.CarGuru, exports.AutoTrader];
// export const sites = [Cars, CarFax, CarGuru];
// export const sites = [Cars];
//# sourceMappingURL=sites.js.map