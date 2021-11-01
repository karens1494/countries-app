import {
  unstable_createMuiStrictModeTheme as createTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailsCountry from "./pages/DetailsCountry";
import NotFound404 from "./components/NotFound404";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: 0,
    minHeight: "80vh",
  },
}));

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  let palletType = darkState ? "dark" : "light";
  let mainPrimaryColor = darkState ? "rgba(32,45,54,255)" : "rgba(250,250,250,255)";
  let mainSecondaryColor = darkState ? "rgba(43,55,67,255)" : "rgba(255,255,255,255)";

  useEffect(() => {
    if (localStorage) {
      const dark = localStorage.getItem("darkTheme");
      setDarkState(dark);
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      type: palletType,
      background: {
        default: mainPrimaryColor,
        paper: mainSecondaryColor,
      },
      primary: {
        main: mainSecondaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem("darkTheme", !darkState);
  };

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header darkState={darkState} handleThemeChange={handleThemeChange} />
        <div className={classes.root}>
          <Switch>
            <Route exact path="/details/:idCountry">
              <DetailsCountry />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route component={NotFound404} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
