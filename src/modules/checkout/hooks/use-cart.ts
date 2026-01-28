import { useCallback } from "react";
import { useCartStore } from "../store/use-cart-store";
import { useShallow } from 'zustand/react/shallow'

export const useCart = () => {
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getProductQuantity = useCartStore((state) => state.getProductQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const productIds = useCartStore(useShallow((state) => state.productIds || []));
  const items = useCartStore(useShallow((state) => state.items || []));
  const totalItems = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  const toggleProduct = useCallback((productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(productId);
    } else {
      addProduct(productId);
    }
  }, [addProduct, removeProduct, productIds]);

  const isProductInCart = useCallback((productId: string) => {
    return productIds.includes(productId);
  }, [productIds]);

  const getQuantity = useCallback((productId: string) => {
    return getProductQuantity(productId);
  }, [getProductQuantity]);

  return {
    productIds,
    items,
    addProduct,
    removeProduct,
    updateQuantity,
    getProductQuantity,
    clearCart,
    toggleProduct,
    isProductInCart,
    getQuantity,
    totalItems,
    uniqueItems: productIds.length,
  };
};
