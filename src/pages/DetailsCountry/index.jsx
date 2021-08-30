import { Button, CircularProgress, Container, makeStyles, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Country from "../../components/Country";
import { getDataCountry } from "../../hooks/api";

const useStyles = makeStyles(() => ({
  backButton: {
    width: 150,
    marginTop: 5,
    padding: '6px 6px'
  },
  icon: {
    margin: 2,
  },
  text: {
    margin: 2,
  },
}));

const DetailsCountry = () => {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const { idCountry } = useParams();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let response = await getDataCountry(idCountry);
      setCountry(response);
      setLoading(false);
    };
    getData();
  }, [idCountry]);

  const getBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <Container>
        <Button onClick={getBack} className={classes.backButton} size="medium" color="secondary" variant="contained">
          <ArrowBack className={classes.icon} fontSize="small" />
          <Typography className={classes.text} variant="button">
            Back
          </Typography>
        </Button>
      </Container>
      {loading ? (
        <div className={classes.details}>
          <CircularProgress size={100} color="inherit" />
        </div>
      ) : (
        <Country country={country} />
      )}
    </Container>
  );
};

export default DetailsCountry;