import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Stock Analytics
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Stock Analysis
        </Button>
        <Button color="inherit" component={Link} to="/correlation">
          Correlation
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
