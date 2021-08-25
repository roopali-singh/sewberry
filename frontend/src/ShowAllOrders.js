import React, { useEffect, useState } from "react";
import "./ShowAllOrders.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import SearchBar from "./SearchBar";

/// LOADASH TO SORT MULTIPLE COLUMNS ////////////////
import orderBy from "lodash/orderBy";

/// MATERIAL UI TABLES imports ////////////////
import { withStyles, makeStyles, alpha } from "@material-ui/core/styles";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green } from "@material-ui/core/colors";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import OrderCollapseContainer from "./OrderCollapseContainer";

function ShowAllOrders() {
  const [
    { userInfo, loading, error, showAllOrders, orderDetails, success },
    dispatch,
  ] = useStateValue();

  const [orderId, setOrderId] = useState("");
  const [sortOrder, setSortOrder] = useState();
  const [sortBy, setSortBy] = useState();

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

        dispatch({
          type: "SHOW_ALL_ORDERS",
          loading: false,
          showAllOrders: data,
        });

        dispatch({
          type: "ALL_ORDERS",
          allOrders: data,
        });

        dispatch({
          type: "SUCCESS_ACHEIVED",
          success: false,
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
  }, [dispatch, userInfo, orderDetails, success]);

  // CAPITALIZE FIRST LETTER ////////////////////////////////

  function capitalizeFirstLetter(string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  // DEFINING THE TABLE HEAD CELLS ////////////////////////////////

  const headCells = [
    { prop: "createdAt", label: "Order createdAt" },
    { prop: "shippingAddress.firstName", label: "User Name" },
    { prop: "orderItems.length", label: "No. of Items" },
    { prop: "_id", label: "Order ID" },
    { prop: "isPaid", label: "is Paid" },
    { prop: "shippingAddress.city", label: "Delivery State" },
    { prop: "isDelivered", label: "is Delivered" },
    { prop: "orderTotal", label: "Order Total" },
  ];

  // DEFINING THE TABLE HEAD CELLS ////////////////////////////////

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: alpha(theme.palette.primary.light, 0.7),
      // color: theme.palette.primary.contrastText,

      fontWeight: 700,
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

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  // SORTING FUNCTION ////////////////////////////////

  function handleSortRequest(prop) {
    const isAsc = sortBy === prop && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(prop);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="allOrders">
      {loading ? (
        <LoadingBox loading={loading} />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <Table className={classes.table}>
          {/* //////////////////////////////////////////// TABLE HEAD //////////////////////////////////// */}
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell />
              {headCells?.map((cell) => (
                <StyledTableCell
                  key={cell?.prop}
                  sortDirection={sortBy === cell?.prop ? sortOrder : false}
                >
                  <TableSortLabel
                    active={sortBy === cell?.prop}
                    direction={sortBy === cell?.prop ? sortOrder : "asc"}
                    onClick={() => handleSortRequest(cell?.prop)}
                  >
                    {cell?.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* //////////////////////////////////////////// TABLE BODY //////////////////////////////////// */}
          <TableBody>
            {orderBy(showAllOrders, sortBy, sortOrder)?.map((order, index) => (
              <React.Fragment key={order?._id}>
                <StyledTableRow hover>
                  <StyledTableCell>{index + 1}</StyledTableCell>
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
                    <strong>
                      {capitalizeFirstLetter(order?.shippingAddress?.firstName)}{" "}
                      {order?.shippingAddress?.lastName &&
                        capitalizeFirstLetter(order?.shippingAddress?.lastName)}
                    </strong>
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
                  <StyledTableCell>
                    <strong>
                      ₹{" "}
                      {order?.orderTotal?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                  </StyledTableCell>
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
                      <OrderCollapseContainer order={order} classes={classes} />
                    </Collapse>
                  </StyledTableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default ShowAllOrders;
