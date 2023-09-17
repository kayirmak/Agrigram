import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const CartContext = createContext(null);

import { db } from "../../firebase.config";

export const CartProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [items, setItems] = useState([]);

  const getItems = () => {
    setItems([]);
    const storesRef = db
      .collection("users")
      .doc(currentUser?.id?.toString())
      .collection("cart");

    const unsubscribe = storesRef.onSnapshot((StoreSnapshot) => {
      StoreSnapshot.docs.map(async (storeQuery) => {
        const store = storeQuery.data();
        storesRef
          .doc(store.id.toString())
          .collection("cart")
          .onSnapshot((prodSnapshot) => {
            const prods = prodSnapshot.docs.map((prod) => prod.data());
            const obj = { ...store, items: prods };
            setItems((prev) => {
              if (prev && prev.length) {
                let tmp = false;
                for (const [idx, storeItem] of prev.entries()) {
                  if (storeItem.id == store.id) {
                    tmp = false;
                    prev.splice(idx, 1, obj);
                    return [...prev];
                  } else {
                    tmp = true;
                  }
                }
                if (tmp) {
                  return [...prev, obj];
                }
              } else return [obj];
            });
          });
      });
    });
    return unsubscribe;
  };

  const value = { items, getItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
