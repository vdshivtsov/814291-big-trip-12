import {render} from "./view/utils.js";
import {createInfoWithCostTemplate} from "./view/info-with-cost.js";
import {createInfoMainTemplate} from "./view/info-main.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltresTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort";
import {createEventWithDestinationTemplate} from "./view/event-with-destination.js";
import {createDayTemplate} from "./view/day.js";
import {createEventItemTemplate} from "./view/event-item.js";
import {createEventEditItemTemplate} from "./view/event-edit-item.js";

const AMOUNT_OF_DAYS = 1;
const AMOUNT_OF_POINTS = 3;

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);

render(tripMain, createInfoWithCostTemplate(), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, createInfoMainTemplate(), `afterbegin`);

const menuHeader = pageHeader.querySelector(`.trip-controls`).querySelector(`h2:last-child`);

render(menuHeader, createMenuTemplate(), `beforebegin`);
render(menuHeader, createFiltresTemplate(), `afterend`);

const tripEvents = document.querySelector(`.page-main`).querySelector(`.trip-events`);
const tripEventsHeader = tripEvents.querySelector(`h2`);

render(tripEventsHeader, createSortTemplate(), `afterend`);

const tripSort = tripEvents.querySelector(`.trip-sort`);
render(tripSort, createEventWithDestinationTemplate(), `afterend`);

const tripDays = tripEvents.querySelector(`.trip-days`);
for (let i = 0; i < AMOUNT_OF_DAYS; i++) {
  render(tripDays, createDayTemplate(), `beforeend`);
}

const tripDaysItems = tripDays.querySelectorAll(`.trip-events__list`);
for (let i = 0; i < tripDaysItems.length; i++) {
  for (let j = 0; j < AMOUNT_OF_POINTS; j++) {
    render(tripDaysItems[i], createEventItemTemplate(), `beforeend`);
  }
}

const firstTripEventsItem = tripDaysItems[0].querySelector(`.trip-events__item:first-child`);
render(firstTripEventsItem, createEventEditItemTemplate(), `afterend`);
