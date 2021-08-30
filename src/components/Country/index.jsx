import { Container, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  point: {
    marginBottom: 5,
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
      height: 250,
    },
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
    history.push(`/${code}`);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Container>
            <img className={classes.img} alt="flag" src={country.flag} />
          </Container>
        </Grid>
        <Grid item xs={12} md={6} className={classes.info}>
          <Container>
            <Typography className={classes.title} variant="h3">
              {country.name}
            </Typography>

            <Grid container>
              <Grid item xs={12} sm={6} className={classes.item}>
                <Typography className={classes.point} variant="subtitle2">
                  {"Native Name: "}
                  <Typography variant="caption">{country.nativeName}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Population: "}
                  <Typography variant="caption">{country.population}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Region: "}
                  <Typography variant="caption">{country.region}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Sub Region: "}
                  <Typography variant="caption">{country.subregion}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Capital: "}
                  <Typography variant="caption">{country.capital}</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.item}>
                <Typography className={classes.point} variant="subtitle2">
                  {"Top Level Domain: "}
                  <Typography variant="caption">{country.topLevelDomain}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Currencies: "}
                  <Typography variant="caption">{country.currencies}</Typography>
                </Typography>

                <Typography className={classes.point} variant="subtitle2">
                  {"Languages: "}
                  <Typography variant="caption">{country.languages}</Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Typography variant="subtitle2" className={classes.titleBorders}>
                  {"Border Countries: "}
                </Typography>
              </Grid>
              <Grid container spacing={1} item xs={12} sm={9} md={9} lg={9}>
                {country.borders.length > 1
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
                  : null}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Country;
