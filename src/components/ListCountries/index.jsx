import { Container, Grid, makeStyles } from "@material-ui/core";
import CardCountry from "../CardCountry";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ListCountries = ({ countries }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.root} spacing={3}>
        {countries.map((country) => (
          <Grid key={country.code} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CardCountry dataCountry={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListCountries;
