import { Box, Container, FormControl, Grid, Input, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  rootSearch: {
    marginTop: "3vw",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "5px",
    height: 56,
    display: "flex",
    justifyContent: "flex-start",
  },
  input: {
    marginTop: 2,
    marginLeft: 10,
    width: "85%",
  },
  contentIcon: {
    display: "absolute",
    height: "100%",
    alignItems: "center",
    justifyItems: "center",
    marginLeft: 20,
    left: 0,
  },
  rootSelect: {
    marginTop: "3vw",
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
    width: 160,
  },
}));

const NavSearch = ({ handleChange, search, region, handleChangeRegion }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} lg={4}>
          <div className={classes.rootSearch}>
            <Search className={classes.contentIcon} fontSize="small" />
            <Input
              id="search"
              name="search"
              className={classes.input}
              color="secondary"
              placeholder="Search for a country..."
              value={search}
              onChange={handleChange}
              disableUnderline
            />
          </div>
        </Grid>
        <Grid item xs={6} md={5} lg={8}>
          <Box display="flex" flexDirection="row-reverse">
            <div className={classes.rootSelect}>
              <FormControl variant="outlined">
                <Select value={region} onChange={handleChangeRegion} style={{ width: 160 }}>
                  <MenuItem value="none" disabled>
                    Filter by Region
                  </MenuItem>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Africa">Africa</MenuItem>
                  <MenuItem value="Americas">America</MenuItem>
                  <MenuItem value="Asia">Asia</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                  <MenuItem value="Oceania">Oceania</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NavSearch;
