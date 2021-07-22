import React, { useEffect } from "react";
import "./ShopLinkScreen.css";
// import data from "./data.js";
import { useStateValue } from "./StateProvider";
import Product from "./Product";
import axios from "axios";
import LoadingBox from "./LoadingBox";
import ErrorBox from "./ErrorBox";
// import { listProducts } from "./productActions";

function ShopLinkScreen() {
  const [
    {
      products,
      loading,
      error,
      productsShown,
      allProductsShown,
      saleProductsShown,
    },
    dispatch,
  ] = useStateValue();
  // const [productsShown, setProductsShown] = useState(true);
  // const [allProductsShown, setallProductsShown] = useState(false);
  // const [saleProductsShown, setSaleProductsShown] = useState(false);

  useEffect(() => {
    async function listProducts() {
      dispatch({
        type: "PRODUCT_LIST_REQUEST",
        loading: true,
        error: false,
      });
      try {
        const { data } = await axios.get("/api/products");
        dispatch({
          type: "PRODUCT_LIST_SUCCESS",
          loading: false,
          products: data,
        });
        // return request;
      } catch (error) {
        dispatch({
          type: "PRODUCT_LIST_FAIL",
          loading: false,
          error: error.message,
        });
      }
    }
    listProducts();
  }, [dispatch]);

  const showAllProducts = () => {
    dispatch({
      type: "SHOW_PRODUCTS",
      productsShown: false,
      saleProductsShown: false,
      allProductsShown: true,
    });
    // setProductsShown(false);
    // setSaleProductsShown(false);
    // setallProductsShown(true);
  };

  const showSaleProducts = () => {
    dispatch({
      type: "SHOW_PRODUCTS",
      productsShown: false,
      allProductsShown: false,
      saleProductsShown: true,
    });
    // setProductsShown(false);
    // setallProductsShown(false);
    // setSaleProductsShown(true);
  };

  if (allProductsShown || productsShown) {
    var allProducts = { textDecorationLine: "underline" };
  } else if (saleProductsShown) {
    var saleProducts = { textDecorationLine: "underline" };
  }

  return (
    <>
      {error ? (
        <ErrorBox error={error} />
      ) : (
        <div className="shop">
          <h1 className="shop__title">SHOP</h1>
          <div className="shop__sections">
            <p onClick={showAllProducts} style={allProducts}>
              All Products
            </p>
            <p onClick={showSaleProducts} style={saleProducts}>
              Sale
            </p>
          </div>

          {loading ? (
            <LoadingBox loading={loading} />
          ) : (
            <div className="shop__products">
              {/* //DOING TESTING WORK */}
              {/* {products
                ?.filter(
                  (items) =>
                    items?.best_sellers?.info?.category === "Best Sellers"
                )
                ?.map((product) => (
                  <Product key={product._id} product={product} forShopScreen />
                ))} */}
              {/* //TESTING WORK COLUMN END */}
              {productsShown &&
                // products?.best_sellers?.info?.map((product) => (
                //   <Product key={product._id} product={product} forShopScreen />
                // ))
                products
                  ?.filter((items) => items?.category === "Best Sellers")
                  ?.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      forShopScreen
                    />
                  ))}

              {allProductsShown &&
                // products?.best_sellers?.info?.map((product) => (
                //   <Product key={product._id} product={product} forShopScreen />
                // ))
                products
                  ?.filter((items) => items?.category === "Best Sellers")
                  ?.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      forShopScreen
                    />
                  ))}
              {saleProductsShown &&
                // products?.new_arrivals?.info?.map((product) => (
                //   <Product
                //     key={product._id}
                //     product={product}
                //     forShopScreen
                //     forSale
                //   />
                // ))
                products
                  ?.filter((items) => items?.category === "New Arrivals")
                  ?.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      forShopScreen
                      forSale
                    />
                  ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShopLinkScreen;
