import {getRandomInteger} from "../utils.js";

const generateOptions = (type) => {
  const OPTION_MOCKS = new Map([
    [`Add luggage`, 30],
    [`Switch to comfort class`, 100],
    [`Add meal`, 15],
    [`Choose seats`, 5],
    [`Travel by train`, 40]
  ]);

  const optionsList = [];
  for (let [key, value] of OPTION_MOCKS) {
    if (getRandomInteger(0, 1) === 0) {
      optionsList.push(new Map([[type, new Map([[key, value]])]]));
    }
  }

  return optionsList;
};

const generateDestinationInfoText = () => {
  const DESTINATION_INFO_TEXT_MOCKS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

  let destinationInfoText = ``;
  for (const element of DESTINATION_INFO_TEXT_MOCKS) {
    destinationInfoText += (getRandomInteger(0, 1) === 0) ? element + ` ` : ``;
  }

  return destinationInfoText;
};

const generateDestinationInfoImages = () => {
  const IMAGES_AMOUNT = 5;

  const destinationInfoImages = new Set();
  for (let i = 1; i <= IMAGES_AMOUNT; i++) {
    if (getRandomInteger(0, 1) === 0) {
      destinationInfoImages.add(`img/photos/${i}.jpg`);
    }
  }

  return destinationInfoImages;
};

const generateDateTime = () => {
  const DATETIME_NOW = Date.now();
  const DATETIME_MAX_OFFSET = 604800000;
  const DATETIME_MIN_STEP = 60000;

  const start = new Date(DATETIME_NOW + getRandomInteger(-DATETIME_MAX_OFFSET, DATETIME_MAX_OFFSET));
  const stop = new Date(start.getTime() + getRandomInteger(DATETIME_MIN_STEP, DATETIME_MAX_OFFSET));
  const duration = Math.abs(stop - start);

  return {start, stop, duration};
};

const generatePoint = () => {
  const MAX_COST = 5000;
  const TYPE_MOCKS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];
  const DESTINATION_MOCKS = [`Qohcester`, `Freford`, `Yhuacrora`, `Driham`, `Trolbus`, `Trinas`, `Daka`, `Iblam`, `Onaset`, `Encebury`];

  const type = TYPE_MOCKS[getRandomInteger(0, TYPE_MOCKS.length - 1)];

  return {
    type,
    price: getRandomInteger(0, MAX_COST),
    isFavorite: getRandomInteger(0, 1) === 0 ? true : false,
    options: generateOptions(type),
    dateTime: generateDateTime(),
    destination: DESTINATION_MOCKS[getRandomInteger(0, DESTINATION_MOCKS.length - 1)],
    destinationInfo: {
      text: generateDestinationInfoText(),
      images: generateDestinationInfoImages()
    }
  };
};

export {generatePoint};

