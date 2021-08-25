import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./AdminAccount.css";
import AdminAccountFunction from "./AdminAccountFunction";
import ShowAllOrders from "./ShowAllOrders";
import ShowAllProducts from "./ShowAllProducts";

function AdminAccount() {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState("orders");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("details")) {
      const details = searchParams.get("details");
      setQuery(details);
    } else {
      history.push("/account");
    }
    console.log("searchParams => ", searchParams);
    console.log("query => ", query);
    console.log("location.search => ", location.search);
  }, [location]);

  return (
    <main className="adminAccount">
      {/* ///////////////////////// ORDERS ///////////////////////////// */}
      {query === "orders" && (
        <>
          <AdminAccountFunction />
          <ShowAllOrders />
        </>
      )}

      {query === "products" && (
        <>
          <AdminAccountFunction />
          <ShowAllProducts />
        </>
      )}
    </main>
  );
}

export default AdminAccount;
