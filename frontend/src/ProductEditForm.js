import React, { useEffect, useState } from "react";
import "./ProductEditForm.css";
import { useStateValue } from "./StateProvider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

function ProductEditForm({ product, createNewProduct, passFormData }) {
  const [{ userInfo }, dispatch] = useStateValue();

  const [imageSrc, setImageSrc] = useState(
    !createNewProduct ? product?.image : ""
  );
  const [category, setCategory] = useState(
    !createNewProduct ? product?.category : ""
  );
  const [name, setName] = useState(!createNewProduct ? product?.name : "");
  const [imageAlt, setImageAlt] = useState(
    !createNewProduct ? product?.alt : ""
  ); ///// change position
  const [price, setPrice] = useState(
    !createNewProduct ? product?.price?.lower : ""
  );
  const [countInStock, setCountInStock] = useState(
    !createNewProduct ? product?.countInStock : ""
  );
  const [color, setColor] = useState(
    !createNewProduct ? product?.description?.color : ""
  );
  const [neckline, setNeckline] = useState(
    !createNewProduct ? product?.description?.neckline : ""
  );
  const [type, setType] = useState(
    !createNewProduct ? product?.description?.type : ""
  );
  const [fabric, setFabric] = useState(
    !createNewProduct ? product?.description?.fabric : ""
  );
  const [waistLine, setWaistLine] = useState(
    !createNewProduct ? product?.description : ""?.waist_line
  );
  const [lining, setLining] = useState(
    !createNewProduct ? product?.description?.lining : ""
  );

  ////////////////////////////////////////////////////////////

  useEffect(() => {
    passFormData({
      imageSrc: imageSrc,
      category: category,
      name: name,
      imageAlt: imageAlt,
      price: price,
      countInStock: countInStock,
      color: color,
      neckline: neckline,
      type: type,
      fabric: fabric,
      waistLine: waistLine,
      lining: lining,
    });
  }, [
    imageSrc,
    category,
    name,
    imageAlt,
    price,
    countInStock,
    color,
    neckline,
    type,
    fabric,
    waistLine,
    lining,
  ]);

  ///////////////////////////////////////////////////////////

  const useStyles = makeStyles((theme) => ({
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();

  ///////////////////////////////////////////////////////////

  const categories = [
    {
      value: "New Arrivals",
      label: "New Arrivals",
    },
    {
      value: "Best Sellers",
      label: "Best Sellers",
    },
  ];

  return (
    <main className="editProduct">
      {/* ////////////////////////////////// RIGHT SIDE //////////////////////// */}

      <div className="editProduct__left">
        <div className="edit__formField--label">
          {imageSrc ? (
            <img className="editProduct__image" src={imageSrc} alt={imageAlt} />
          ) : (
            <Skeleton variant="rect" width={"100%"} height={"60vh"} />
          )}
        </div>
        <div className="edit__formField--leftLabel">
          <TextField
            id="outlined-select-currency-native"
            select
            label="Select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            SelectProps={{
              native: true,
            }}
            helperText="Please select the category"
            variant="outlined"
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            value={imageSrc}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              onChange={(event) => setImageSrc(event.target.value)}
            >
              Upload Image
            </Button>
          </label>
        </div>
      </div>

      {/* ////////////////////////////////// RIGHT SIDE //////////////////////// */}

      <div className="editProduct__right">
        <div className="edit__formField">
          <strong className="edit__formField--label">Name : </strong>
          <TextField
            multiline
            // fullWidth
            id="outlined-full-width"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label">Image Name : </strong>
          <TextField
            multiline
            // fullWidth
            id="outlined-full-width"
            label="Image Name"
            variant="outlined"
            value={imageAlt}
            onChange={(event) => setImageAlt(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label">Price : </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Price"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label">Count In-Stock : </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="countInStock"
            variant="outlined"
            type="number"
            value={countInStock}
            onChange={(event) => setCountInStock(event.target.value)}
          />
        </div>
        {/* //////////////////////////////////////////////////////////////////////////////// */}
        <strong className="edit__formField--label">Description</strong>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Color :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Color"
            variant="outlined"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Neckline :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Neckline"
            variant="outlined"
            value={neckline}
            onChange={(event) => setNeckline(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Type :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Type"
            variant="outlined"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Fabric :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Fabric"
            variant="outlined"
            value={fabric}
            onChange={(event) => setFabric(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Waist Line :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Waist Line"
            variant="outlined"
            value={waistLine}
            onChange={(event) => setWaistLine(event.target.value)}
          />
        </div>
        <div className="edit__formField">
          <strong className="edit__formField--label edit__formField--subLabel">
            Lining :
          </strong>
          <TextField
            multiline
            id="outlined-full-width"
            label="Lining"
            variant="outlined"
            value={lining}
            onChange={(event) => setLining(event.target.value)}
          />
        </div>
      </div>
    </main>
  );
}

export default ProductEditForm;
