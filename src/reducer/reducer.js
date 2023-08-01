import ItemsAdded from "./ListReducer";
import CartItemsAdded from "./CartReducer";
import OrderAdded from "./OrderReducer";
import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";
import {
  adminTotalListOrderReducer,
  adminTotalListUserReducer,
} from "./adminReducers";

const rootReducer = combineReducers({
  ItemsAdded,
  CartItemsAdded,
  OrderAdded,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  adminOrderList: adminTotalListOrderReducer,
  adminUserList: adminTotalListUserReducer,
});

export default rootReducer;
