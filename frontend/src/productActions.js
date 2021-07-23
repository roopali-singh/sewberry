// import { useStateValue } from "./StateProvider";
// import Axios from "axios";

// const [dispatch] = useStateValue();

// export const listProducts = async () => {
//   dispatch({
//     type: "REQUEST_SEND",
//     loading: true,
//   });

//   try {
//     const { data } = await Axios.get("/api/products");
//     dispatch({
//       type: "PRODUCT_LIST_SUCCESS",
//       loading: false,
//       products: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: "REQUEST_FAIL",
//       loading: false,
//       error: error.message,
//     });
//   }
// };
