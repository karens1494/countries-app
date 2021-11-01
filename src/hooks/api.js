import axios from "axios";

const cliente = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

/**
 * Función que obtiene un arreglo con la información de los países del mundo
 * @returns
 */
const getAllCountries = async () => {
  let dataCountries = { data: [], success: false };

  try {
    const response = await cliente.get("/all");
    dataCountries.data = response.data.map((country) => ({
      name: country.name.official,
      code: country.cca3,
      capital: country.capital,
      region: country.region,
      population: country.population,
      flag: country.flags.svg,
    }));
    dataCountries.success = true;
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
  let dataCountry = { data: {}, success: true };
  try {
    const response = await cliente.get(`/alpha/${code}`);
    dataCountry.data = response.data[0];
    let borders = [];
    const currencies = Object.values(response.data[0].currencies).map((currency) => currency.name);
    const languages = Object.values(response.data[0].languages);
    if (dataCountry.data.borders.length > 0) {
      const dataBorders = dataCountry.data.borders.join(",");
      borders = await getDataCountries(dataBorders);
    }
    dataCountry.data.currencies = currencies.toString();
    dataCountry.data.languages = languages.toString();
    dataCountry.data.borders = borders;
  } catch (error) {
    console.log(error.message);
    dataCountry = { data: {}, success: false };
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
    dataCountries = response.data.map((country) => ({ name: country.name.official, code: country.cca3 }));
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
  let dataCountries = { data: [], success: false };
  try {
    const response = await cliente.get(`/region/${region}`);
    dataCountries.data = response.data.map((country) => ({
      name: country.name.official,
      code: country.cca3,
      population: country.population,
      region: country.region,
      capital: country.region,
      flag: country.flags.svg,
    }));
    dataCountries.success = true;
  } catch (error) {
    console.log(error.message);
    dataCountries = [];
  }

  return dataCountries;
};

export { getAllCountries, getDataCountry, getDataCountries, getCountriesByRegion };
