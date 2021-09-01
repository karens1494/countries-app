import axios from "axios";

const cliente = axios.create({
  baseURL: "https://restcountries.eu/rest/v2",
});

/**
 * Función que obtiene un arreglo con la información de los países del mundo
 * @returns
 */
const getAllCountries = async () => {
  let dataCountries = [];

  try {
    const response = await cliente.get("/all?fields=name;capital;region;population;flag;alpha3Code");
    dataCountries = response.data.map((country) => ({
      code: country.alpha3Code,
      ...country,
    }));
  } catch (error) {
    console.log(error.message);
    dataCountries = [];
  }

  return dataCountries;
};

/**
 * Función que obtiene la información de un país específico
 * @param {String} code
 * @returns
 */
const getDataCountry = async (code) => {
  let dataCountry = {};
  try {
    const response = await cliente.get(`/alpha/${code}`);
    dataCountry = response.data;
    let borders = [];
    const currencies = response.data.currencies.map((currency) => currency.name);
    const languages = response.data.languages.map((language) => language.name);
    if (dataCountry.borders.length > 0) {
      const dataBorders = dataCountry.borders.join(";");
      borders = await getDataCountries(dataBorders);
    }
    dataCountry.currencies = currencies.toString();
    dataCountry.languages = languages.toString();
    dataCountry.borders = borders;
  } catch (error) {
    console.log(error.message);
    dataCountry = {};
  }

  return dataCountry;
};

/**
 * Función que obtiene la información básica de una lista de países
 * @param {String} codes
 * @returns
 */
const getDataCountries = async (codes) => {
  let dataCountries = [];
  try {
    const response = await cliente.get(`/alpha?codes=${codes}`);
    dataCountries = response.data.map((country) => ({ name: country.name, code: country.alpha3Code }));
  } catch (error) {
    console.log(error.message);
    dataCountries = [];
  }

  return dataCountries;
};

/**
 * Función que obtiene la información de los países según una región específica
 * @param {String} region
 * @returns
 */
const getCountriesByRegion = async (region) => {
  let dataCountries = [];
  try {
    const response = await cliente.get(`/region/${region}`);
    dataCountries = response.data.map((country) => ({
      name: country.name,
      code: country.alpha3Code,
      population: country.population,
      region: country.region,
      capital: country.region,
      flag: country.flag,
    }));
  } catch (error) {
    console.log(error.message);
    dataCountries = [];
  }

  return dataCountries;
};

export { getAllCountries, getDataCountry, getDataCountries, getCountriesByRegion };
