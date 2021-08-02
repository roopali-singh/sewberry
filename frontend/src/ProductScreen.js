import React, { useEffect } from "react";
import "./ProductScreen.css";
// import data from "./data";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
import PriceBox from "./PriceBox";
// import { BrowserRouter as useParams } from "react-router-dom";

function ProductScreen(props) {
  const [{ productDetails, loading, error }, dispatch] = useStateValue();

  var { id } = useParams();
  // const productId = props.match.params.id;

  // const product =
  //   data.products.new_arrivals.info.find((x) => x._id === id) ||
  //   data.products.best_sellers.info.find((x) => x._id === id);
  // data.products.new_arrivals.info.find(
  //   (x) => x._id === props.match.params.id
  // ) ||
  // data.products.best_sellers.info.find(
  //   (x) => x._id === props.match.params.id
  // );

  useEffect(() => {
    async function detailsProduct() {
      dispatch({
        type: "REQUEST_SEND",
        loading: true,
        erroe: false,
      });
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
          type: "PRODUCT_DETAILS_SUCCESS",
          loading: false,
          productDetails: data,
        });
      } catch (error) {
        dispatch({
          type: "REQUEST_FAIL",
          loading: false,
          error:
            error.response && error.response.data.message
              ? `Error ${error.response.status} : ${error.response.data.message}`
              : error.message,
        });
      }
    }
    detailsProduct();
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox loading={loading} />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <div className="productScreen">
          {/* PRODUCT IMAGE */}

          <img
            className="productScreen__image"
            src={productDetails?.image}
            alt={productDetails?.alt}
          />

          <div className="productScreen__info-status">
            {/* PRODUCT INFORMATION */}

            <div className="productScreen__info">
              <span className="productScreen__infoName">
                {productDetails?.name}
              </span>
              <span className="productScreen__infoPrice">
                Price: ₹
                {productDetails?.price?.lower?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>

              {/* PRODUCT INFORMATION DESCRIPTION */}
              <span className="productScreen__infoDesc">Description:</span>

              <ul className="productScreen__infoDescTable">
                <li>color: {productDetails?.description?.color}</li>
                <li>neckline: {productDetails?.description?.neckline}</li>
                <li>type: {productDetails?.description?.type}</li>
                <li>fabric: {productDetails?.description?.fabric}</li>
                <li>waist_line: {productDetails?.description?.waist_line}</li>
                <li>lining: {productDetails?.description?.lining}</li>
              </ul>
            </div>

            {/* PRODUCT STATUS */}
            <PriceBox />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;
