import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InfoData from "../InfoData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: 400,
  },
  content: {
    margin: 10,
  },
  media: {
    height: 200,
    width: "auto",
  },
  title: {
    marginBottom: 10,
  },
}));

const CardCountry = ({ dataCountry }) => {
  const classes = useStyles();
  const history = useHistory();

  const showDetailsCountry = () => {
    history.push(`/${dataCountry.code}`);
  };

  return (
    <CardActionArea onClick={showDetailsCountry}>
      <Card className={classes.root} color="secondary">
        <CardMedia className={classes.media} image={dataCountry.flag} title={dataCountry.name} />
        <CardContent className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            {dataCountry.name}
          </Typography>
          <InfoData label="Population" value={dataCountry.population} />
          <InfoData label="Region" value={dataCountry.region} />
          <InfoData label="Capital" value={dataCountry.capital} />
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default CardCountry;
