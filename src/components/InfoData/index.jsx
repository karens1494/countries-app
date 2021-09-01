import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  point: {
    marginBottom: 5,
  },
}));

const InfoData = ({ label, value }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.point} variant="subtitle2">
      {`${label}: `}
      <Typography variant="caption">{value}</Typography>
    </Typography>
  );
};

export default InfoData;
