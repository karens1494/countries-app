import { AppBar, Box, Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Brightness2, BrightnessHigh } from "@material-ui/icons";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "25vw",
    width: "100%",
    marginBottom: 20,
  },
  offset: theme.mixins.toolbar,
  selectTheme: {
    margin: 10,
    borderRadius: "25%",
  },
  title: {
    fontSize: "140%",
    margin: 15,
    cursor: 'pointer'
  },
}));

const Header = ({ darkState, handleThemeChange }) => {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };
  return (
    <>
      <AppBar position="static" color="secondary" className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={8}>
            <Container>
              <Typography variant="h3" className={classes.title} onClick={goHome}>
                Where in the World?
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="row-reverse">
              <Button className={classes.selectTheme} onClick={handleThemeChange}>
                {darkState ? <Brightness2 fontSize="medium" /> : <BrightnessHigh fontSize="medium" />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
};

export default Header;
