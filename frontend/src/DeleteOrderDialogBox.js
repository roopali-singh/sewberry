import React, { useState } from "react";
import "./OrderCollapseContainer.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
// MATERILA UI IMPORTS ///////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function DeleteOrderDialogBox({ open, onClose, orderId }) {
  const [{ userInfo }, dispatch] = useStateValue();

  const [input, setInput] = useState("");
  const [wrongIdError, setwrongIdError] = useState("Enter the Order Id");
  const [idError, setIdError] = useState(false);

  const useStyles = makeStyles({
    DialogContentText: {
      fontWeight: 700,
    },
  });

  const classes = useStyles();

  //////////////// SENDING DELETE ORDER REQUEST ////////////////////

  async function deleteOrder(OrderIdInput) {
    dispatch({
      type: "REQUEST_SEND",
      loading: false,
      error: false,
    });

    try {
      const { data } = await axios.delete(
        `/api/orders/deleteOrder/${OrderIdInput}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      dispatch({
        type: "SUCCESS_ACHEIVED",
        success: true,
      });
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

  function deleteHandler(e) {
    e.preventDefault();
    if (input === orderId) {
      // e.preventDefault();
      setIdError(false);
      setwrongIdError("Order Id matched");
      deleteOrder(input);
    } else {
      setIdError(true);
      setwrongIdError("Invalid Order Id");
    }
  }

  ///////////// DRAGGABLE //////////////////

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  //////////////////////////////////////////

  return (
    // <>
    //   {loading ? (
    //     <LoadingBox loading={loading} />
    //   ) : error ? (
    //     <ErrorBox error={error} />
    //   ) : (
    <Dialog
      open={open}
      onClose={onClose}
      aria-describedby="alert-dialog-description"
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Delete order
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you absolutely sure you want to delete the order with orderId:
          <strong> {`${orderId}`}</strong>
        </DialogContentText>
        <DialogContentText
          // className={classes.DialogContentText}
          id="alert-dialog-description"
        >
          Make sure to inform the customer before deleting the order.
        </DialogContentText>
        <DialogContentText
          className={classes.DialogContentText}
          id="alert-dialog-description"
        >
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          <TextField
            // autoFocus
            error={idError}
            id="outlined-basic"
            label={wrongIdError}
            variant="outlined"
            value={input}
            type="text"
            fullWidth
            required
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="#830404"
          className="dangerButton"
          onClick={deleteHandler}
          startIcon={<DeleteIcon />}
          // autoFocus
        >
          Delete
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    //   )}
    // </>
  );
}

export default DeleteOrderDialogBox;
