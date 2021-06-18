// import data from "./data";
export const initialState = {
  products: [],
  productDetails: [],
  loading: true,
  error: false,
  // ADD TO CART
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  // PRODUCTS SHOWN ON SHOP LINK SCREEN
  productsShown: true,
  saleProductsShown: false,
  allProductsShown: false,
  // WISHLIST BASKET
  wishlistBasket: JSON.parse(localStorage.getItem("wishlistBasket")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return {
        ...state,
        loading: action.loading,
      };

    case "PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        products: action.products,
      };

    case "PRODUCT_LIST_FAIL":
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    //FOR PRODUCT_SCREEN

    // case "PRODUCT_DETAILS_REQUEST":
    //   return {
    //     ...state,
    //     loading: action.loading,
    //   };

    case "PRODUCT_DETAILS_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        productDetails: action.productDetails,
      };

    // case "PRODUCT_DETAILS_FAIL":
    //   return {
    //     ...state,
    //     loading: action.loading,
    //     error: action.error,
    //   };

    //ADD TO BASKET
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.items],
      };

    //REMOVE FROM BASKET

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem._id === action._id
      );
      const found = state.basket.find((item) => item._id === action._id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        found.countInStock = found.countInStock + 1;
        // at index: {index} remove that element;
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product with id: ${action._id} as its not in the basket`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    // ADDING AND REMOVIGN FROM THE WISHLIST ITEMS

    case "ADD_TO_WISHLIST":
      // to check if the item is not already present in favourites

      const wishlistItem = state.wishlistBasket?.find(
        (wishlistBasketId) => wishlistBasketId?._id === action.items?._id
      );
      let newWishlistBasket = [...state.wishlistBasket];

      if (!wishlistItem) {
        // item not present => add that item
        newWishlistBasket = [...state.wishlistBasket, action.items];
      } else {
        // item present => remove that item
        newWishlistBasket = state.wishlistBasket?.filter(
          (wishlistPresent) => wishlistPresent?._id !== wishlistItem?._id
        );
      }

      return {
        ...state,
        wishlistBasket: newWishlistBasket,
      };

    // SETTING THE TOTAL BASKET PRICE

    case "SHOW_PRODUCTS":
      return {
        ...state,
        productsShown: action.productsShown,
        saleProductsShown: action.saleProductsShown,
        allProductsShown: action.allProductsShown,
      };

    // CHANGING THE TOTAL DISCOUNT PRICE

    case "CHANGE_TOTAL_DISCOUNT_PRICE":
      return {
        ...state,
        discountPrice: action.discountPrice,
      };

    default:
      return state;
  }
};

export default reducer;
