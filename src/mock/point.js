import {getRandomInteger} from "../utils.js";

//Генерируем точку маршрута
const generatePoint = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];
  const destinations = [`Qohcester`, `Freford`, `Yhuacrora`, `Driham`, `Trolbus`, `Trinas`, `Daka`, `Iblam`, `Onaset`, `Encebury`];
  //Каждому типу сопоставляется свой набор опций (пока наборы одинаковые для простоты реализации)
  const optionsList = new Map();
  for (let typeItem of types) {
    optionsList.set(typeItem, new Map([[`Add luggage`, 30], [`Switch to comfort class`, 100], [`Add meal`, 15], [`Choose seats`, 5], [`Travel by train`, 40]]));
  }

  //берем рандомный тип
  const type = types[getRandomInteger(0, types.length - 1)];

  return {
    type,
    destinations: destinations[getRandomInteger(0, types.length - 1)],
    options: optionsList.get(type)
  };
};

export {generatePoint};

