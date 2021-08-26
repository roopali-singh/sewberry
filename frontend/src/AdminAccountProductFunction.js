import React from "react";
import { useStateValue } from "./StateProvider";
import SearchProductBar from "./SearchProductBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

function AdminAccountProductFunction() {
  const [{ showAllProducts }] = useStateValue();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    toolBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div className="adminFunctions">
      <Toolbar className={classes.toolBar}>
        <h1>All Products ({showAllProducts?.length} orders)</h1>
        <SearchProductBar />
      </Toolbar>
    </div>
  );
}

export default AdminAccountProductFunction;
