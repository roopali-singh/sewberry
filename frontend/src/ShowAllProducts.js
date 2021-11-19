import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";

/// LOADASH TO SORT MULTIPLE COLUMNS ////////////////
import orderBy from "lodash/orderBy";

/// MATERIAL UI TABLES imports ////////////////
import { withStyles, makeStyles, alpha } from "@material-ui/core/styles";

// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import CancelIcon from "@material-ui/icons/Cancel";
// import { green } from "@material-ui/core/colors";
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
import ProductCollapseContainer from "./ProductCollapseContainer";

// import OrderCollapseContainer from "./OrderCollapseContainer";

function ShowAllProducts() {
  const [
    { userInfo, loading, error, showAllProducts, productDetails, success },
    dispatch,
  ] = useStateValue();

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [sortOrder, setSortOrder] = useState();
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    dispatch({
      type: "REMOVING_ERROR",
      loading: false,
      error: false,
    });
  }, []);

  useEffect(() => {
    async function listAllProducts() {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        error: false,
      });
      try {
        const { data } = await axios.get("/api/products/admin/list", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        dispatch({
          type: "SHOW_ALL_PRODUCTS",
          loading: false,
          showAllProducts: data,
        });

        dispatch({
          type: "ALL_PRODUCTS",
          allProducts: data,
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
    }
    listAllProducts();
  }, [dispatch, userInfo, productDetails, success]);

  // STYLING THE TABLE ////////////////////////////////

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
    root: {
      padding: "0.9375rem",
    },
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();

  // DEFINING THE TABLE HEAD CELLS ////////////////////////////////

  const headCells = [
    { prop: "createdAt", label: "Product createdAt" },
    { prop: "category", label: "Product Category" },
    { prop: "_id", label: "Product ID" },
    { prop: "name", label: "Product Name" },
    { prop: "alt", label: "Product Img Name" },
    { prop: "countInStock", label: "Product Count-In-Stock" },
    { prop: "price.lower", label: "Product Price" },
  ];

  // SORTING FUNCTION ////////////////////////////////

  function handleSortRequest(prop) {
    const isAsc = sortBy === prop && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(prop);
  }

  // OPEN COLLAPSE CONTAINER /////////////////////////////////////////////////////////////////////

  function collapseContainer(id) {
    setOpen((open) => !open);
    setProductId(id);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.root}>
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
            {orderBy(showAllProducts, sortBy, sortOrder)?.map(
              (product, index) => (
                <React.Fragment key={product?._id}>
                  <StyledTableRow hover>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => collapseContainer(product?._id)}
                      >
                        {open && productId === product?._id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>{product?.createdAt}</StyledTableCell>
                    <StyledTableCell>
                      <strong>{product?.category}</strong>
                    </StyledTableCell>
                    <StyledTableCell>{product?._id}</StyledTableCell>
                    <StyledTableCell>
                      <strong>{product?.name}</strong>
                    </StyledTableCell>
                    <StyledTableCell>{product?.alt}</StyledTableCell>
                    <StyledTableCell>
                      {product?.countInStock === 0 ? (
                        <strong style={{ color: "#db0c0c" }}>
                          Out of Stock
                        </strong>
                      ) : (
                        `${product?.countInStock}`
                      )}
                    </StyledTableCell>

                    <StyledTableCell>
                      <strong>
                        ₹{" "}
                        {product?.price?.lower?.toLocaleString("en-IN", {
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
                        in={open && productId === product?._id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <ProductCollapseContainer
                          product={product}
                          classes={classes}
                        />
                      </Collapse>
                    </StyledTableCell>
                  </StyledTableRow>
                </React.Fragment>
              )
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default ShowAllProducts;
