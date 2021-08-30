import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  point: {
    marginBottom: 5,
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
          <Typography className={classes.point} variant="subtitle2">
            {"Population: "}
            <Typography variant="caption">{dataCountry.population}</Typography>
          </Typography>
          <Typography className={classes.point} variant="subtitle2">
            {"Region: "}
            <Typography variant="caption">{dataCountry.region}</Typography>
          </Typography>
          <Typography className={classes.point} variant="subtitle2">
            {"Capital: "}
            <Typography variant="caption">{dataCountry.capital}</Typography>
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default CardCountry;
