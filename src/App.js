import {
  unstable_createMuiStrictModeTheme as createTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailsCountry from "./pages/DetailsCountry";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: 0,
    minHeight: "80vh",
  },
}));

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? "rgba(32,45,54,255)" : "rgba(250,250,250,255)";
  const mainSecondaryColor = darkState ? "rgba(43,55,67,255)" : "rgba(255,255,255,255)";

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

  const classes = useStyles();

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <div>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header darkState={darkState} handleThemeChange={handleThemeChange} />
          <div className={classes.root}>
            <Switch>
              <Route exact path="/:idCountry">
                <DetailsCountry />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
