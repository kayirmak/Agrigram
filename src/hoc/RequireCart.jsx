import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { CartContext } from "./CartProvider";

function RequireCart() {
  const {items} = useContext(CartContext);
  const location = useLocation();

  if (!items.length) {
    return <Navigate to="/cart" state={{from: location}} />
  }

  return <Outlet />;
}

export default RequireCart;
