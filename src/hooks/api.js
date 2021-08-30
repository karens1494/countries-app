import axios from "axios";

const cliente = axios.create({
  baseURL: "https://restcountries.eu/rest/v2",
});

const getAllCountries = async () => {
  let dataCountries = [];

  try {
    const response = await cliente.get("/all");
    dataCountries = response.data.map((country) => ({
      name: country.name,
      code: country.alpha3Code,
      capital: country.capital,
      region: country.region,
      population: country.population,
      flag: country.flag,
    }));
  } catch (error) {
    console.log(error.message);
    dataCountries = [];
  }

  return dataCountries;
};

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
  }

  return dataCountry;
};

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

export { getAllCountries, getDataCountry, getDataCountries };
