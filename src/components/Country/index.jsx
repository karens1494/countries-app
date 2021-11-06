import { Container, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InfoData from "../InfoData";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      alignItems: "center",
    },
  },
  root: {
    flexGrow: 1,
    paddingTop: 25,
  },
  title: {
    marginTop: 0,
    marginBottom: 30,
  },
  item: {
    marginBottom: 30,
  },
  img: {
    margin: 0,
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      height: 400,
    },
    [theme.breakpoints.down("xs")]: {
      height: 200,
    },
    objectFit: "cover",
  },
  titleBorders: {
    marginBottom: 10,
  },
  borderButton: {
    textTransform: "none",
    fontSize: 11,
    minWidth: 80,
  },
}));

const Country = ({ country }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClickBorder = (code) => {
    history.push(`/details/${code}`);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Container>
            <img className={classes.img} alt="flag" src={country.flags.svg} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6} className={classes.info}>
          <Container>
            <Typography className={classes.title} variant="h3">
              {country.name.official}
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.item}>
                <InfoData label="Common Name" value={country.name.common} />
                <InfoData label="Population" value={country.population} />
                <InfoData label="Region" value={country.region} />
                <InfoData label="Sub Region" value={country.subregion} />
                <InfoData label="Capital" value={country.capital} />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.item}>
                <InfoData label="Top Level Domain" value={country.tld[0]} />
                <InfoData label="Currencies" value={country.currencies} />
                <InfoData label="Languages" value={country.languages} />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Typography variant="subtitle2" className={classes.titleBorders}>
                  {"Border Countries: "}
                </Typography>
              </Grid>
              <Grid container spacing={1} item xs={12} sm={9} md={9} lg={9}>
                {country?.borders?.length > 0
                  ? country.borders.map((border) => (
                      <Grid item key={border.code}>
                        <Button
                          color="secondary"
                          size="small"
                          variant="contained"
                          className={classes.borderButton}
                          onClick={() => handleClickBorder(border.code)}
                        >
                          {border.name}
                        </Button>
                      </Grid>
                    ))
                  : <Typography variant="caption" className={classes.titleBorders}>None</Typography>}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Country;
