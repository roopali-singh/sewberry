import React, { useState } from "react";
import "./OrderCollapseContainer.css";
import DeleteOrderDialogBox from "./DeleteOrderDialogBox";
import EditOrderDialogBox from "./EditOrderDialogBox";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalMallIcon from "@material-ui/icons/LocalMall";

function OrderCollapseContainer({ order, classes }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState();
  const orderId = order?._id;
  const orderEditInfo = {
    orderTotalInfo: order?.orderTotal,
    orderPaymentInfo: order?.isPaid,
    orderDeliveryInfo: order?.isDelivered,
  };

  const StyledTableHeadCell = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  }))(TableCell);

  ////////////// HANDLE AND CLOSE FUNCTION ////////////////

  function handleDeleteClickOpen() {
    setOpenDeleteDialog(true);
  }

  function handleEditClickOpen() {
    setOpenEditDialog(true);
  }

  function handleClose() {
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    // setSelectedValue(value);
  }

  return (
    <Box margin={1}>
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {/* /////////////////////////////////// ORDERS ITEMS DETAILS /////////////////////////// */}
            {order?.orderItems?.map((orderItem) => (
              <React.Fragment key={orderItem?._id}>
                <TableRow>
                  <StyledTableHeadCell>OrderItem Id</StyledTableHeadCell>
                  <TableCell>{orderItem?._id}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadCell>OrderItem Title</StyledTableHeadCell>
                  <TableCell>{orderItem?.alt}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadCell>OrderItem Price</StyledTableHeadCell>
                  <TableCell>
                    <strong>
                      ₹{" "}
                      {orderItem?.price?.lower?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableHeadCell>OrderItem Image</StyledTableHeadCell>
                  <TableCell>
                    <img
                      className="orderCollapse_img"
                      src={orderItem?.image}
                      alt={orderItem?.alt}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <hr />
                </TableRow>
              </React.Fragment>
            ))}
            {/* /////////////////////////////////// CUSTOMER DETAILS /////////////////////////// */}
            <TableRow>
              <StyledTableHeadCell>Customer Email</StyledTableHeadCell>
              <TableCell>
                <a
                  className="orderCollapse__emailLink"
                  href={`mailto: ${order?.shippingAddress?.email}`}
                  // target="_blank"
                >
                  <strong>{order?.shippingAddress?.email}</strong>
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>ShippingAddress</StyledTableHeadCell>
              <TableCell>
                <TableRow>
                  <TableCell>{order?.shippingAddress?.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}>
                    {order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.state}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}>
                    {order?.shippingAddress?.city}:{" "}
                    {order?.shippingAddress?.pin}
                  </TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {order?.isPaid && order?.isDelivered ? (
                  <>
                    <Chip
                      color="primary"
                      label="Paid"
                      icon={<PaymentIcon />}
                      size="small"
                      style={{ margin: "10px", padding: "15px" }}
                    />
                    <Chip
                      color="secondary"
                      label="Delivered"
                      icon={<LocalMallIcon />}
                      size="small"
                      style={{ margin: "10px", padding: "15px" }}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="#830404"
                      className="dangerButton"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteClickOpen}
                    >
                      Delete
                    </Button>
                    <DeleteOrderDialogBox
                      //   selectedValue={selectedValue}
                      open={openDeleteDialog}
                      onClose={handleClose}
                      orderId={orderId}
                    />

                    <Button
                      variant="contained"
                      color="#ff9800"
                      className="editButton"
                      startIcon={<EditIcon />}
                      onClick={handleEditClickOpen}
                    >
                      Edit
                    </Button>
                    <EditOrderDialogBox
                      open={openEditDialog}
                      onClose={handleClose}
                      orderId={orderId}
                      orderEditInfo={orderEditInfo}
                    />
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* {order?.orderItems?.map((orderItem) => (
        <img src={orderItem?.image} alt={orderItem?.alt} />
      ))} */}
    </Box>
  );
}

export default OrderCollapseContainer;
