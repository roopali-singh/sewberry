import React, { useEffect, useState } from "react";
import "./ShowAllOrders.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green } from "@material-ui/core/colors";

/// MATERIAL UI TABLES imports ////////////////
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function ShowAllOrders() {
  const [{ userInfo, loading, error, showAllOrders }, dispatch] =
    useStateValue();

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      error: false,
    });
  }, []);

  useEffect(() => {
    const listAllOrders = async () => {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        error: false,
      });
      try {
        const { data } = await axios.get("/api/orders/seed", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        console.log("userInfo (token) 🚀 🚀 🚀 🚀 ", userInfo?.token);

        dispatch({
          type: "SHOW_ALL_ORDERS",
          loading: false,
          showAllOrders: data,
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
    };

    listAllOrders();
  }, [dispatch, userInfo, showAllOrders?.length]);

  // CAPITALIZE FIRST LETTER ////////////////////////////////

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  // DEFINING THE TABLE HEAD CELLS ////////////////////////////////

  const headCells = [
    { id: 1, lable: "Order createdAt" },
    { id: 2, lable: "User Name" },
    { id: 3, lable: "No. of Items" },
    { id: 4, lable: "Order ID" },
    { id: 6, lable: "is Paid" },
    { id: 7, lable: "Delivery State" },
    { id: 8, lable: "is Delivered" },
    { id: 9, lable: "Order Total" },
  ];

  // DEFINING THE TABLE HEAD CELLS ////////////////////////////////

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.common.white,
      },
    },
  }))(TableRow);

  const StyledTableHeadCell = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  }))(TableCell);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  // BUTTON STYLING ////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="allOrders">
      <h1>Show All Orders ({showAllOrders?.length} orders)</h1>
      <hr />
      {loading ? (
        <LoadingBox loading={loading} />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <Table className={classes.table}>
          {/* //////////////////////////////////////////// TABLE HEAD //////////////////////////////////// */}
          <TableHead>
            <TableRow>
              <StyledTableCell />
              {headCells?.map((cell) => (
                <StyledTableCell key={cell?.id}>{cell?.lable}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* //////////////////////////////////////////// TABLE BODY //////////////////////////////////// */}
          <TableBody>
            {showAllOrders?.map((order) => (
              <>
                <StyledTableRow key={order?._id}>
                  <StyledTableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOrderId(order?._id)}
                    >
                      {orderId === order?._id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell>{order?.createdAt}</StyledTableCell>
                  <StyledTableCell>
                    {capitalizeFirstLetter(order?.shippingAddress?.firstName)}{" "}
                    {order?.shippingAddress?.lastName &&
                      capitalizeFirstLetter(order?.shippingAddress?.lastName)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {order?.orderItems?.length} Items
                  </StyledTableCell>
                  <StyledTableCell>{order?._id}</StyledTableCell>
                  <StyledTableCell>
                    {order?.isPaid ? (
                      <CheckCircleIcon style={{ color: green[500] }} />
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {order?.shippingAddress?.city}
                  </StyledTableCell>

                  <StyledTableCell>
                    {order?.isDelivered ? (
                      <CheckCircleIcon style={{ color: green[500] }} />
                    ) : (
                      <CancelIcon style={{ color: "#db0c0c" }} />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>₹ {order?.orderTotal}</StyledTableCell>
                </StyledTableRow>
                {/* //////////////////////////////////////////// COLLAPSABLE ROW //////////////////////////////////// */}
                <StyledTableRow>
                  <StyledTableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={9}
                  >
                    <Collapse
                      in={orderId === order?._id}
                      timeout="auto"
                      unmountOnExit
                    >
                      {" "}
                      <Box margin={1}>
                        <TableContainer>
                          <Table>
                            <TableBody>
                              {/* /////////////////////////////////// ORDERS ITEMS DETAILS /////////////////////////// */}
                              {order?.orderItems?.map((orderItem) => (
                                <>
                                  <TableRow>
                                    <StyledTableHeadCell>
                                      OrderItem Id
                                    </StyledTableHeadCell>
                                    <TableCell>{orderItem?._id}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <StyledTableHeadCell>
                                      OrderItem Title
                                    </StyledTableHeadCell>
                                    <TableCell>{orderItem?.alt}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <StyledTableHeadCell>
                                      OrderItem Price
                                    </StyledTableHeadCell>
                                    <TableCell>₹ {orderItem?.price}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <StyledTableHeadCell>
                                      OrderItem Image
                                    </StyledTableHeadCell>
                                    <TableCell>
                                      <img
                                        src={orderItem?.image}
                                        alt={orderItem?.alt}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <hr />
                                  </TableRow>
                                </>
                              ))}
                              {/* /////////////////////////////////// CUSTOMER DETAILS /////////////////////////// */}
                              <TableRow>
                                <StyledTableHeadCell>
                                  Customer Email
                                </StyledTableHeadCell>
                                <TableCell>
                                  {order?.shippingAddress?.email}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <StyledTableHeadCell>
                                  ShippingAddress
                                </StyledTableHeadCell>
                                <TableCell>
                                  <TableRow>
                                    <TableCell>
                                      {order?.shippingAddress?.address}
                                    </TableCell>
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
                                  <Button
                                    variant="contained"
                                    color="#830404"
                                    className="dangerButton"
                                    startIcon={<DeleteIcon />}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="#ff9800"
                                    className="editButton"
                                    startIcon={<EditIcon />}
                                  >
                                    Edit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Collapse>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default ShowAllOrders;
