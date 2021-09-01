import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const DataLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress key={Math.random() * 1000} size={100} color="inherit" />
    </div>
  );
};

export default DataLoading;
