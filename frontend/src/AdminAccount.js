import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./AdminAccount.css";
import AdminAccountOrderFunction from "./AdminAccountOrderFunction";
import AdminAccountProductFunction from "./AdminAccountProductFunction";
import ShowAllOrders from "./ShowAllOrders";
import ShowAllProducts from "./ShowAllProducts";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateProductDialogBox from "./CreateProductDialogBox";

function AdminAccount() {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState("orders");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("details")) {
      const details = searchParams.get("details");
      setQuery(details);
    } else {
      history.push("/account");
    }
  }, [location]);

  /////////// STYLING THE ADD PRODUCT ICON /////////

  const useStyles = makeStyles((theme) => ({
    addProduct: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  /////////////////////////////////////////////////

  function handleCreateDialog() {
    setOpenCreateDialog(true);
  }

  function handleClose() {
    setOpenCreateDialog(false);
    // setSelectedValue(value);
  }

  return (
    <main className="adminAccount">
      {/* ///////////////////////// ORDERS ///////////////////////////// */}
      {query === "orders" && (
        <div>
          <AdminAccountOrderFunction />
          <ShowAllOrders />
        </div>
      )}

      {query === "products" && (
        <div>
          <AdminAccountProductFunction />
          <ShowAllProducts />
          <div className="addProductIcon">
            <Fab
              className={classes.addProduct}
              color="secondary"
              aria-label="add"
              onClick={handleCreateDialog}
            >
              <AddIcon />
            </Fab>
            <CreateProductDialogBox
              open={openCreateDialog}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminAccount;
