
import { db } from '../../../firebase.config';
import { collection, getDocs, doc, getDoc, query, setDoc } from '@firebase/firestore';

import { 
  getCartItemsFailure,
  getCartItemsStart, 
  getCartItemsSuccess 
} from "./cartSlice"


const getCartItems = async (dispatch, data) => {
  dispatch(getCartItemsStart());
  try {
    dispatch(getCartItemsSuccess(data));
    console.log(data);
    // if (change.type === "added") {
    //   console.log("New city: ", change.doc.data());
    // }
    // if (change.type === "modified") {
    //     console.log("Modified city: ", change.doc.data());
    // }
    // if (change.type === "removed") {
    //     console.log("Removed city: ", change.doc.data());
    // }


  } catch (error) {
    dispatch(getCartItemsFailure(error.message));
  }
}

const addToCart = async (item) => {
  try {
    const userRef = doc(db, "users", "35");
    const userCollections = collection(userRef, `cart`);
    const storeItems = collection(userCollections, `${item.supplier.id}/cart`);
    console.log(item, 'item');
    
    // await setDoc(doc(userCollections, item.supplier.id), item.supplier);
    await setDoc(doc(storeItems, item.id.toString()), item);
  } catch (error) {
    
  }
}


export {
  getCartItems,
  addToCart
}