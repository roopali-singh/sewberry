import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ProductEditForm from "./ProductEditForm";

function EditProductDialogBox({ open, onClose, product }) {
  const [{ userInfo }, dispatch] = useStateValue();

  const [formData, setFormData] = useState({});

  async function editProductHandler() {
    dispatch({
      type: "REQUEST_SEND",
      loading: true,
      error: false,
    });

    try {
      const { data } = await axios.put(
        `api/products/edit/${product?._id}`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );


      dispatch({
        type: "PRODUCT_DETAILS_SUCCESS",
        loading: false,
        productDetails: data,
      });

      // dispatch({
      //   type: "SUCCESS_ACHEIVED",
      //   success: true,
      // });
    } catch (error) {
      dispatch({
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Product Details
          </Typography>
          <Button autoFocus color="inherit" onClick={editProductHandler}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <ProductEditForm product={product} passFormData={setFormData} />
    </Dialog>
  );
}

export default EditProductDialogBox;
