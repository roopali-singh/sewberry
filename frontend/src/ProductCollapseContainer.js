import React, { useState } from "react";
import "./OrderCollapseContainer.css";
import DeleteProductDialogBox from "./DeleteProductDialogBox";
import EditProductDialogBox from "./EditProductDialogBox";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function ProductCollapseContainer({ product, classes }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState();
  const productId = product?._id;

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

            <TableRow>
              <StyledTableHeadCell>Product Item Image</StyledTableHeadCell>
              <TableCell>
                <img
                  className="orderCollapse_img"
                  src={product?.image}
                  alt={product?.alt}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <hr />
            </TableRow>

            {/* /////////////////////////////////// PRODUCT DESCRIPTION /////////////////////////// */}

            <TableRow>
              <StyledTableHeadCell>Product Description :</StyledTableHeadCell>
            </TableRow>

            <TableRow>
              <StyledTableHeadCell>Color</StyledTableHeadCell>
              <TableCell>{product?.description?.color}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Neckline</StyledTableHeadCell>
              <TableCell>{product?.description?.neckline}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Type</StyledTableHeadCell>
              <TableCell>{product?.description?.type}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Fabric</StyledTableHeadCell>
              <TableCell>{product?.description?.fabric}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Waist Line</StyledTableHeadCell>
              <TableCell>{product?.description?.waist_line}</TableCell>
            </TableRow>
            <TableRow>
              <StyledTableHeadCell>Lining</StyledTableHeadCell>
              <TableCell>{product?.description?.lining}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  color="#830404"
                  className="dangerButton"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClickOpen}
                >
                  Delete
                </Button>
                <DeleteProductDialogBox
                  //   selectedValue={selectedValue}
                  open={openDeleteDialog}
                  onClose={handleClose}
                  productId={productId}
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
                <EditProductDialogBox
                  open={openEditDialog}
                  onClose={handleClose}
                  product={product}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductCollapseContainer;
