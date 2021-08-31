import { CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListCountries from "../../components/ListCountries";
import NavSearch from "../../components/NavSearch";
import { getAllCountries, getCountriesByRegion } from "../../hooks/api";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
  },
  root: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("none");
  const [filtercountries, setFiltercountries] = useState([]);
  const classes = useStyles();
  const [loadedCountries, setLoadedCountries] = useState([]);
  const [lastObjectPosition, setLastObjectPosition] = useState(12);
  const perPage = 8;

  const loadCountries = () => {
    setTimeout(() => {
      const load = filtercountries.slice(lastObjectPosition, lastObjectPosition + perPage);
      setLoadedCountries((currentCountries) => {
        return [...currentCountries, ...load];
      });
      setLastObjectPosition((currentValue) => currentValue + perPage);
    }, 1500);
  };

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

  const handleChange = async (e) => {
    const { value } = e.target;
    await setSearch(value);
  };

  useEffect(() => {
    const checkingSearch = async () => {
      let data = [];
      if (region !== "none") {
        if (region === "All") {
          data = countries;
        } else {
          data = await getCountriesByRegion(region);
        }
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

  const handleChangeRegion = async (e) => {
    const { value } = e.target;
    await setRegion(value);
  };

  return (
    <div className={classes.container} id="container">
      <NavSearch handleChange={handleChange} search={search} region={region} handleChangeRegion={handleChangeRegion} />
      <InfiniteScroll
        dataLength={loadedCountries.length}
        next={() => loadCountries()}
        pageStart={0}
        hasMore={lastObjectPosition < filtercountries.length}
        endMessage={""}
        loader={
          <div className={classes.root}>
            <CircularProgress key={Math.random() * 1000} size={100} color="inherit" />
          </div>
        }
        style={{ overflowY: "hidden" }}
      >
        {loading ? (
          <div className={classes.root}>
            <CircularProgress key={Math.random() * 1000} size={100} color="inherit" />
          </div>
        ) : (
          <div className={classes.root}>
            <ListCountries key={Math.random() * 1000} countries={loadedCountries} />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
