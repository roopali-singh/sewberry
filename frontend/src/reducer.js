// import data from "./data";
export const initialState = {
  products: [],
  productDetails: [],
  // USER SIGN-IN and SIGN-OUT
  userInfo:
    //  localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) :
    {},
  // TO GET THE CREATED ORDER
  order:
    //  localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) :
    {},
  orderDetails: {},
  userOrderInfo: {},
  loading: true,
  error: false,
  success: false,
  // FROM THE ADMIN SIDE
  showAllOrders: [],
  allOrders: [],
  showAllProducts: [],
  // ADD TO CART
  basket:
    //  localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) :
    [],
  // PRODUCTS SHOWN ON SHOP LINK SCREEN
  productsShown: true,
  saleProductsShown: false,
  allProductsShown: false,
  // WISHLIST BASKET
  wishlistBasket:
    // localStorage.getItem("wishlistBasket") ? JSON.parse(localStorage.getItem("wishlistBasket")) :
    [],
  favourites: [],
  favouriteSuccess: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVING_ERROR":
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case "REQUEST_SEND":
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    case "PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        products: action.products,
      };

    case "REQUEST_FAIL":
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    //FOR PRODUCT_SCREEN

    case "PRODUCT_DETAILS_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        productDetails: action.productDetails,
      };

    //ADD TO BASKET
    case "ADD_TO_BASKET":
      const foundInBasket = state?.basket?.find(
        (item) => item?._id === action.items?._id
      );

      if (foundInBasket) {
        return {
          ...state,
          basket: state?.basket?.map((product) =>
            product?._id === foundInBasket?._id ? action.items : product
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.items],
        };
      }

    //EMPTYING THE BASKET
    case "BASKET__EMPTY":
      return {
        ...state,
        basket: action.basket,
      };

    //REMOVE FROM BASKET

    case "REMOVE_FROM_BASKET":
      // const index = state.basket.findIndex(
      //   (basketItem) => basketItem._id === action._id
      // );
      // const found = state.basket.find((item) => item._id === action._id);
      // let newBasket = [...state.basket];

      // if (index >= 0) {
      //   found.countInStock = found.countInStock + 1;
      //   // at index: {index} remove that element;
      //   newBasket.splice(index, 1);
      // } else {
      //   console.warn(
      //     `Can't remove product with id: ${action._id} as its not in the basket`
      //   );
      // }

      // return {
      //   ...state,
      //   basket: newBasket,
      // };

      return {
        ...state,
        basket: state.basket.filter((item) => item?._id !== action?._id),
      };

    // ADDING AND REMOVIGN FROM THE WISHLIST ITEMS

    case "ADD_TO_WISHLIST":
      // to check if the item is not already present in favourites

      const wishlistItem = state?.wishlistBasket?.find(
        (wishlistBasketId) => wishlistBasketId?._id === action?.items?._id
      );
      let newWishlistBasket = [...state?.wishlistBasket];

      if (!wishlistItem) {
        // item not present => add that item
        newWishlistBasket = [...state?.wishlistBasket, action?.items];
      } else {
        // item present => remove that item
        newWishlistBasket = state?.wishlistBasket?.filter(
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
        orderTotal: action.orderTotal,
      };

    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        userInfo: action.userInfo,
      };

    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case "ORDER_CREATE_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        // success: action.success,
        order: action.order,
      };

    case "ORDER_CREATE_RESET":
      return {
        ...state,
        order: action.order,
        // success: action.success,
      };

    // LISTING THE USER ORDERS

    case "USER_ORDERS_LIST":
      return {
        ...state,
        loading: action.loading,
        userOrderInfo: action.userOrderInfo,
      };

    // SH0WING USER ORDER FOR PAYMENT

    case "ORDER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        orderDetails: action.orderDetails,
      };

    // SH0WING ALL ORDER FOR ADMIN

    case "SHOW_ALL_PRODUCTS":
      return {
        ...state,
        loading: action.loading,
        showAllProducts: action.showAllProducts,
      };

    case "ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.allProducts,
      };

    case "SHOW_ALL_ORDERS":
      return {
        ...state,
        loading: action.loading,
        showAllOrders: action.showAllOrders,
      };

    case "ALL_ORDERS":
      return {
        ...state,
        allOrders: action.allOrders,
      };

    // FOR THE WISHLIST SCREEN PAGE

    case "SHOW_ALL_FAVOURITES":
      return {
        ...state,
        loading: action.loading,
        favourites: action.favourites,
      };

    case "SUCCESS_ACHEIVED":
      return {
        ...state,
        success: action.success,
      };

    case "FAVOURITE_SUCCESS_ACHEIVED":
      return {
        ...state,
        loading: action.loading,
        favouriteSuccess: action.favouriteSuccess,
      };

    default:
      return state;
  }
};

export default reducer;
