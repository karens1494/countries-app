import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  Error: {
    textAlign: "center",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const NotFound404 = () => {
  const classes = useStyles();
  return (
    <Container className={classes.Error}>
      <div>
        <Typography variant="h1">Error 404!</Typography>
        <Typography variant="h5">Oppps! Page Not Found</Typography>
        <Link to="/">Go Home</Link>
      </div>
    </Container>
  );
};

export default NotFound404;
