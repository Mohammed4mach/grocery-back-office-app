import { createContext, useContext, useState } from "react";
import { Cart } from '@/services';

const cartContext = createContext({});

const getCartCount = () => {
  const cart      = new Cart();
  const cartItems = cart.get() ?? {};

  let count = 0;

  for(let key in cartItems)
    count += (Number.parseInt(cartItems[key]?.quantity ?? 0));

  return count;
};

export const useCart = () => {
  return useContext(cartContext);
};

export const CartProvider = ({ children }) => {
  const itemsCount        = getCartCount();
  const [count, setCount] = useState(itemsCount);

  const refreshCount = () => setCount(prev => getCartCount())

  return (
    <cartContext.Provider value={{count, refreshCount}} >
      {children}
    </cartContext.Provider>
  );
}

