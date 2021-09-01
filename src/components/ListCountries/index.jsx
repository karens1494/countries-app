import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import CardCountry from "../CardCountry";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  empty: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    textAlign: "center",
    width: "100%",
  },
}));

const ListCountries = ({ countries }) => {
  const classes = useStyles();

  return (
    <Container style={{ marginTop: 20 }}>
      <Grid container className={classes.root} spacing={3}>
        {countries.length > 0 ? (
          countries.map((country) => (
            <Grid key={country.code} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CardCountry dataCountry={country} />
            </Grid>
          ))
        ) : (
          <div className={classes.empty}>
            <Typography variant="h4">No hay Elementos</Typography>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default ListCountries;
