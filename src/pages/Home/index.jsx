import { CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import ListCountries from "../../components/ListCountries";
import NavSearch from "../../components/NavSearch";
import { getAllCountries } from "../../hooks/api";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
  },
  root: {
    marginTop: 50,
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

  useEffect(() => {
    const getDataCountries = async () => {
      setLoading(true);
      try {
        const response = await getAllCountries();
        setCountries(response);
        setFiltercountries(response);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getDataCountries();
  }, []);

  const handleChange = (e) => {
    let filters = [];
    const { value } = e.target;
    setSearch(value);
    if (value === "") {
      filters = countries;
    } else {
      if (region === "none") {
        filters = countries.filter((country) => country.name.toLowerCase().includes(value.toLowerCase()));
      } else {
        filters = countries.filter(
          (country) => country.name.toLowerCase().includes(value.toLowerCase()) && country.region === region
        );
      }
    }
    setFiltercountries(filters);
  };

  const handleChangeRegion = (e) => {
    let filters = [];
    const { value } = e.target;
    setRegion(value);
    if (value === "none") {
      filters = countries;
    } else {
      filters = countries.filter((country) => country.region.includes(value));
    }
    setFiltercountries(filters);
  };

  return (
    <div className={classes.container}>
      <NavSearch handleChange={handleChange} search={search} region={region} handleChangeRegion={handleChangeRegion} />

      {loading ? (
        <div className={classes.root}>
          <CircularProgress size={100} color="inherit" />
        </div>
      ) : (
        <div className={classes.root}>
          <ListCountries countries={filtercountries} />
        </div>
      )}
    </div>
  );
};

export default Home;
