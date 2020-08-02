import {render} from "./view/utils.js";
import {createTripInfoTemplate, createTripInfoMainTemplate, createTripInfoCostTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/trip-tabs.js";
import {createFiltresTemplate} from "./view/trip-filters.js";
import {createSortTemplate} from "./view/trip-sort";
import {createEventTemplate, createEventDetailsTemplate, createEventOffersTemplate, createEventDestinationTemplate} from "./view/trip-event.js";
import {createTripDaysTemplate, createDayTemplate} from "./view/trip-days.js";
import {createTripEventItemTemplate, createTripEventEditItemTemplate} from "./view/trip-event-item.js";

const AMOUNT_OF_DAYS = 1;
const AMOUNT_OF_POINTS = 3;

const pageHeader = document.querySelector(`.page-header`);
const tripMain = pageHeader.querySelector(`.trip-main`);

render(tripMain, createTripInfoTemplate(), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, createTripInfoMainTemplate(), `afterbegin`);
render(tripInfo, createTripInfoCostTemplate(), `beforeend`);

const tripControls = pageHeader.querySelector(`.trip-controls`);
const menuHeader = tripControls.querySelector(`h2:last-child`);

render(menuHeader, createMenuTemplate(), `beforebegin`);
render(menuHeader, createFiltresTemplate(), `afterend`);

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);
const tripEventsHeader = tripEvents.querySelector(`h2`);

render(tripEventsHeader, createSortTemplate(), `afterend`);

const tripSort = tripEvents.querySelector(`.trip-sort`);
render(tripSort, createEventTemplate(), `afterend`);

const eventEdit = tripEvents.querySelector(`.event--edit`);
render(eventEdit, createEventDetailsTemplate(), `beforeend`);

const eventDetails = eventEdit.querySelector(`.event__details`);
render(eventDetails, createEventOffersTemplate(), `afterbegin`);
render(eventDetails, createEventDestinationTemplate(), `beforeend`);

render(tripEvents, createTripDaysTemplate(), `beforeend`);
const tripDays = tripEvents.querySelector(`.trip-days`);
for (let i = 0; i < AMOUNT_OF_DAYS; i++) {
  render(tripDays, createDayTemplate(), `beforeend`);
}

const tripDaysItems = tripDays.querySelectorAll(`.trip-events__list`);
for (let i = 0; i < tripDaysItems.length; i++) {
  for (let j = 0; j < AMOUNT_OF_POINTS; j++) {
    render(tripDaysItems[i], createTripEventItemTemplate(), `beforeend`);
  }
}

const firstTripEventsItem = tripDaysItems[0].querySelector(`.trip-events__item:first-child`);
render(firstTripEventsItem, createTripEventEditItemTemplate(), `afterend`);

const tripEventEditItem = tripDaysItems[0].querySelector(`.event--edit`);
render(tripEventEditItem, createEventOffersTemplate(), `beforeend`);
