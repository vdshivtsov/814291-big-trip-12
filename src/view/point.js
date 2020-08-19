const mapFromTypeToProposal = new Map([
  [`Taxi`, `to`],
  [`Bus`, `to`],
  [`Train`, `to`],
  [`Ship`, `to`],
  [`Transport`, `to`],
  [`Drive`, `to`],
  [`Flight`, `to`],
  [`Check-in`, `in`],
  [`Sightseeng`, `in`],
  [`Restaurant`, `in`],
]);

const getDatetimeFromDate = (date) => {
  return date.toISOString().replace(/:\d\d.\d\d\dZ/, ``);
};

const getTimeFromDate = (date) => {
  return date.toISOString().replace(/:\d\d.\d\d\dZ/, ``).replace(/\d\d\d\d-\d\d-\d\dT/, ``);
};

const getDurationString = (duration) => {
  const MILLISECONDS_IN_MINUTE = 60000;
  const MILLISECONDS_IN_HOUR = 3600000;
  const MILLISECONDS_IN_DAY = 86400000;

  let minutes = 0;
  let hours = 0;
  let days = 0;
  let result;
  if (duration < MILLISECONDS_IN_HOUR) {
    minutes = Math.floor(duration / MILLISECONDS_IN_MINUTE);
    result = `${minutes < 10 ? `0${minutes}` : minutes}M`;
  } else if (duration >= MILLISECONDS_IN_DAY) {
    days = Math.floor(duration / MILLISECONDS_IN_DAY);
    hours = Math.floor((duration - days * MILLISECONDS_IN_DAY) / MILLISECONDS_IN_HOUR);
    minutes = Math.floor((duration - days * MILLISECONDS_IN_DAY - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
    result = `${days < 10 ? `0${days}` : days}D ${hours < 10 ? `0${hours}` : hours}H ${minutes < 10 ? `0${minutes}` : minutes}M`;
  } else {
    hours = Math.floor(duration / MILLISECONDS_IN_HOUR);
    minutes = Math.floor((duration - hours * MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE);
    result = `${hours < 10 ? `0${hours}` : hours}H ${minutes < 10 ? `0${minutes}` : minutes}M`;
  }

  return result;
};

const createPointOffersTemplate = (point) => {
  if (typeof point.options === `undefined` || point.options.length === 0) {
    return ``;
  } else {
    let result = `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">`;
    for (let i = 0; i < point.options.length && i < 3; i++) {
      const [title, price] = point.options[i].values().next().value.entries().next().value;
      result += `
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>
          + €&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`;
    }
    result += `</ul>`;

    return result;
  }
};

const createPointTemplate = (point) => {
  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point.type.toLowerCase()} ${mapFromTypeToProposal.get(point.type)} ${point.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDatetimeFromDate(point.dateTime.start)}">${getTimeFromDate(point.dateTime.start)}</time>
            —
            <time class="event__end-time" datetime="${getDatetimeFromDate(point.dateTime.stop)}">${getTimeFromDate(point.dateTime.stop)}</time>
          </p>
          <p class="event__duration">${getDurationString(point.dateTime.duration)}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${point.price}</span>
        </p>

        ${createPointOffersTemplate(point)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export {createPointTemplate};
