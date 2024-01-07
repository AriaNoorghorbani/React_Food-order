import { useReducer } from "react";
import { createContext } from "react";

const cartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action === "ADD_ITEM") {
    const existingIndexItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingIndexItem > -1) {
      const existingItem = state.items[existingIndexItem];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingIndexItem] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
  }

  if (action === "REMOVE_ITEM") {
  }
  return state;
}

export function CartContextProvider() {
  useReducer(cartReducer, { cart: [] });
  return <cartContext.Provider></cartContext.Provider>;
}

export default cartContext;
