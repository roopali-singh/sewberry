import React from "react";
import { useStateValue } from "./StateProvider";
import SearchOrderBar from "./SearchOrderBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

function AdminAccountOrderFunction() {
  const [{ showAllOrders }] = useStateValue();

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
        <SearchOrderBar />
      </Toolbar>
    </div>
  );
}

export default AdminAccountOrderFunction;
