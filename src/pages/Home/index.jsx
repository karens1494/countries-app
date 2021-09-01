import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DataLoading from "../../components/DataLoading";
import ListCountries from "../../components/ListCountries";
import NavSearch from "../../components/NavSearch";
import { getAllCountries, getCountriesByRegion } from "../../hooks/api";


const Home = () => {
  const perPage = 8;
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("none");
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [loadedCountries, setLoadedCountries] = useState([]);
  const [lastObjectPosition, setLastObjectPosition] = useState(12);

  useEffect(() => {
    const getDataCountries = async () => {
      setLoading(true);
      try {
        const response = await getAllCountries();
        setCountries(response);
        setFiltercountries(response);
        setLoadedCountries(response.slice(0, perPage));
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getDataCountries();
  }, []);

  useEffect(() => {
    const checkingSearch = async () => {
      let data = [];
      if (region !== "none" && region !== "all") {
        data = await getCountriesByRegion(region);
      } else {
        data = countries;
      }
      if (search !== "") {
        data = data.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()));
      }
      setLastObjectPosition(12);
      setFiltercountries(data);
      setLoadedCountries(data.slice(0, perPage));
    };
    checkingSearch();
  }, [search, region, countries]);

  const loadCountries = () => {
    setTimeout(() => {
      const load = filtercountries.slice(lastObjectPosition, lastObjectPosition + perPage);
      setLoadedCountries((currentCountries) => {
        return [...currentCountries, ...load];
      });
      setLastObjectPosition((currentValue) => currentValue + perPage);
    }, 1500);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleChangeRegion = (e) => {
    const { value } = e.target;
    setRegion(value);
  };

  return (
    <div style={{ width: "100%" }}>
      <NavSearch handleChange={handleChange} search={search} region={region} handleChangeRegion={handleChangeRegion} />
      <InfiniteScroll
        dataLength={loadedCountries.length}
        next={() => loadCountries()}
        pageStart={0}
        hasMore={lastObjectPosition < filtercountries.length}
        endMessage={""}
        loader={<DataLoading />}
        style={{ overflowY: "hidden" }}
      >
        {loading ? <DataLoading /> : <ListCountries key={Math.random() * 1000} countries={loadedCountries} />}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
