import { SearchResultOptions } from "./index";

const zip = process.env.npm_package_config_zip || process.env.ZIP || "14850";
const radius = process.env.npm_package_config_radius || process.env.RADIUS || "20"; // miles
export const pages = Number(process.env.npm_package_config_pages || process.env.PAGES || "1");

/**
 * DOM Mappings for AutoTrader.com
 */
export const AutoTrader: SearchResultOptions = {
    search: {
        entry: new URL(`https://www.autotrader.com/cars-for-sale/searchresults.xhtml?zip=${zip}`),
        result: "div.inventory-listing",
        resultURL: "https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=$(id)",
        next: 'a[role="button" href="#"]',
        numPages: pages,
    },
    result: {
        elements: {
            mileage: `div.col-lg-4:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:contains("MILEAGE") +`,
            interior: `div.col-xs-6:nth-child(7) > div:nth-child(1) > div:nth-child(2) > div:contains("INTERIOR") +`,
            exterior: `div.col-xs-6:nth-child(8) > div:nth-child(1) > div:nth-child(2) > div:contains("EXTERIOR) +`,
            price: `div.text-size-600 > span.first-price`,
            vin: `div.col-lg-8:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > span:contains("VIN") +`,
        },
        waitFor: [`#mountNode`, `div.content-folding-item:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)`, `div.col-lg-4`, `div.col-lg-8:nth-child(1)`, `div.text-size-600 > span.first-price`],
        wait: 1500,
    },
};

/** DOM Mappings for Cars.com */
export let Cars: SearchResultOptions = {
    search: {
        entry: new URL(`https://www.cars.com/for-sale/searchresults.action/?perPage=100&page=1&rd=${radius}&searchSource=QUICK_FORM&zc=${zip}&sort=listed-newest`),
        result: 'a[id^="listing-"]',
        resultURL: "https://www.cars.com/vehicledetail/detail/$(id)/overview/",
        next: "a.button.next-page",
        numPages: pages,
    },
    result: {
        elements: {
            exterior: `.vdp-details-basics__list > li:contains(Exterior Color) > span`,
            interior: `.vdp-details-basics__list > li:contains(Interior Color) > span`,
            mileage: `.vdp-details-basics__list > li:contains(Mileage) > span`,
            vin: `.vdp-details-basics__list > li:contains(VIN) > span`,
            price: [`.vehicle-info__price-display--dealer`, `.vehicle-info__price-display`],
        },
        waitFor: [`div.vehicle-info__price`, `div.vdp-details-basics`],
    },
};

/**
 * DOM Mappings for CarFax.com
 */
export const CarFax: SearchResultOptions = {
    search: {
        entry: new URL(`https://www.carfax.com/Used-Sedans_bt7?zip=${zip}`),
        result: `article[id^="listing"]`,
        resultURL: "https://www.carfax.com/vehicle/$(data-vin)",
        next: `#react-app > div > div.spa-container > div > div > div > div.column.small-12.small-order-1.xxlarge-order-2 > div:nth-child(2) > div.column.small-12.medium-12.large-12.xxlarge-8.xxxlarge-9.results-col > div:nth-child(3) > div.column.no-padding-left > ul > li.next > a`,
        numPages: pages,
    },
    result: {
        elements: {
            exterior: `.infoTable-table > tbody > tr > th:contains(Exterior) +`,
            interior: `.infoTable-table > tbody > tr > th:contains(Interior) +`,
            mileage: `.infoTable-table > tbody > tr > th:contains(Mileage) +`,
            price: `.infoTable-table > tbody > tr > th:contains(Price) +`,
            // date: `table.price-history-table > tbody > tr:nth-child(2) > td.date`,
            vin: `.infoTable-table > tbody > tr > th:contains(VIN) +`,
            // .infoTable-table > tbody:nth-child(1) > tr:nth-child(12) > th:nth-child(1)
        },
        waitFor: `.infoTable-table`,
    },
};
/**
 * DOM Mappings for CarGuru.com
 */
export const CarGuru: SearchResultOptions = {
    search: {
        entry: new URL(`https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?sourceContext=carGurusHomePageModel&entitySelectingHelper.selectedEntity=&zip=${zip}#resultsPage=1`),
        result: 'div[id*="listing_"]',
        resultURL: "https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?#listing=$(id)",
        next: "div.cg-listingSearch-pagingPanel:nth-child(1) > a:nth-child(4)",
        numPages: pages,
    },
    result: {
        elements: {
            exterior: `.cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(2)`,
            interior: `.cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2)`,
            mileage: `.cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)`,
            price: `.cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)`,
            vin: `.cg-listingDetail-specsWrap > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(10) > td:nth-child(2)`,
        },
        waitFor: [`.cg-listingDetail-specsWrap`],
    },
};

export const sites = {
    autotrader: AutoTrader,
    carfax: CarFax,
    cargurus: CarGuru,
    cars: Cars,
};
// export const sites = [CarGuru];

// export const sites = [Cars];
