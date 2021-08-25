import React, { useState } from "react";
import { useStateValue } from "./StateProvider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
// For Radio Buttons
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
////////////////////////////
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
///////////////////////////////

function EditOrderDialogBox({ open, onClose, orderId, orderEditInfo }) {
  const [{ userInfo, orderDetails }, dispatch] = useStateValue();
  const [selectedPaymentValue, setSelectedPaymentValue] = useState(
    orderEditInfo?.orderPaymentInfo ? "paid" : "notPaid"
  );
  const [selectedDeliveryValue, setSelectedDeliveryValue] = useState(
    orderEditInfo?.orderDeliveryInfo ? "delivered" : "notDelivered"
  );
  const [orderTotalValue, setOrderTotalValue] = useState(
    orderEditInfo?.orderTotalInfo
  );
  const [amountError, setAmountError] = useState(false);

  ////////////////////////////////////////////////////////

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  /////////// RADIO BUTTONS ///////////

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  ////////////////////////////////////

  const useStyles = makeStyles((theme) => ({
    dialogTitle: {
      fontWeight: 800,
    },

    toDisplayFlex: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },

    noMargin: {
      margin: "0",
      padding: "0",
    },
  }));

  const classes = useStyles();

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

  async function changeOrderStatusHandler(
    selectedPaymentValue,
    selectedDeliveryValue,
    orderTotalValue
  ) {
    dispatch({
      type: "REQUEST_SEND",
      loading: false,
      error: false,
    });

    try {
      const { data } = await axios.put(
        `/api/orders/edit/${orderId}`,
        {
          selectedPaymentValue,
          selectedDeliveryValue,
          orderTotalValue,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      dispatch({
        type: "ORDER_DETAILS_SUCCESS",
        loading: false,
        orderDetails: data,
      });
      console.log("💛 💛 💛 💛 orderDetails => ", orderDetails);
      console.log("💛 💛 💛 💛 data => ", data);
    } catch (error) {
      dispatch({
        // type: "USER_SIGNIN_FAIL",
        type: "REQUEST_FAIL",
        loading: false,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  //////////////////////////////////////////

  function submitHandler(e) {
    e.preventDefault();
    if (orderTotalValue <= orderEditInfo?.orderTotalInfo) {
      console.log("💗 💗 💗 💗  LESS that the orderTotal");
      setAmountError(false);
      changeOrderStatusHandler(
        selectedPaymentValue === "paid" ? true : false,
        selectedDeliveryValue === "delivered" ? true : false,
        orderTotalValue
      );
    } else {
      console.log("🙊 🙊 🙊 🙊 GREATER that the orderTotal");
      setAmountError(true);
    }
  }
  /////////////////////////////////////////////

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Change Order Status
      </DialogTitle>
      <DialogContent className={classes.toDisplayFlex}>
        {/* //////////////// Payment Status /////////////// */}
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Status</FormLabel>
            <RadioGroup
              aria-label="paymentStatus"
              name="paymentStatus1"
              value={selectedPaymentValue}
              onChange={(event) => setSelectedPaymentValue(event.target.value)}
            >
              <FormControlLabel
                disabled={orderEditInfo?.orderPaymentInfo}
                value="notPaid"
                control={<Radio />}
                label="Not Paid"
              />
              <FormControlLabel
                disabled={orderEditInfo?.orderPaymentInfo}
                value="paid"
                control={<GreenRadio />}
                label="Paid"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        {/* //////////////// Delivery Status /////////////// */}

        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Delivery Status</FormLabel>
            <RadioGroup
              aria-label="deliveryStatus"
              name="deliveryStatus1"
              value={selectedDeliveryValue}
              onChange={(event) => setSelectedDeliveryValue(event.target.value)}
            >
              <FormControlLabel
                disabled={orderEditInfo?.orderDeliveryInfo}
                value="notDelivered"
                control={<Radio />}
                label="Not Delivered"
              />
              <FormControlLabel
                disabled={orderEditInfo?.orderDeliveryInfo}
                value="delivered"
                control={<GreenRadio />}
                label="Delivered"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </DialogContent>

      {/* //////////////// Current Order Value /////////////// */}
      <DialogContent dividers>
        <DialogContentText>
          Current Order Value:{" "}
          <strong>
            ₹{" "}
            {orderEditInfo?.orderTotalInfo?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </strong>
        </DialogContentText>
        <TextField
          disabled={orderEditInfo?.orderPaymentInfo}
          error={amountError}
          autoFocus
          value={orderTotalValue}
          margin="dense"
          id="name"
          label={`Should not exceed ₹${orderEditInfo?.orderTotalInfo?.toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2,
            }
          )}`}
          type="number"
          fullWidth
          onChange={(e) => setOrderTotalValue(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={submitHandler} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditOrderDialogBox;
