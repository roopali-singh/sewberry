import React from "react";
import { useStateValue } from "./StateProvider";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

function AdminAccountFunction() {
  const [{ showAllOrders }, dispatch] = useStateValue();

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
        <h1>All Orders ({showAllOrders?.length} orders)</h1>
        <SearchBar />
      </Toolbar>
    </div>
  );
}

export default AdminAccountFunction;
