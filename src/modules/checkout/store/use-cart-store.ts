import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    productIds: string[]; // Keep for backward compatibility
    addProduct: (productId: string, quantity?: number) => void;
    removeProduct: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    getProductQuantity: (productId: string) => number;
    getTotalItems: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            productIds: [], // Keep for backward compatibility
            addProduct: (productId, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.productId === productId);
                    const newItems = existingItem
                        ? state.items.map(item =>
                            item.productId === productId
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                        : [...state.items, { productId, quantity }];
                    
                    const newProductIds = state.productIds.includes(productId)
                        ? state.productIds
                        : [...state.productIds, productId];
                    
                    return {
                        items: newItems,
                        productIds: newProductIds
                    };
                });
            },

            removeProduct: (productId) =>
                set((state) => ({
                    items: state.items.filter(item => item.productId !== productId),
                    productIds: state.productIds.filter((id) => id !== productId)
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter(item => item.productId !== productId),
                            productIds: state.productIds.filter((id) => id !== productId)
                        };
                    }
                    return {
                        items: state.items.map(item =>
                            item.productId === productId
                                ? { ...item, quantity }
                                : item
                        )
                    };
                }),

            getProductQuantity: (productId) => {
                const item = get().items.find(item => item.productId === productId);
                return item ? item.quantity : 0;
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            clearCart: () =>
                set({
                    items: [],
                    productIds: []
                }),
        }),
        {
            name: "headspa-cart",
            storage: createJSONStorage(() => localStorage),
            skipHydration: false,
            partialize: (state) => ({ items: state.items, productIds: state.productIds }),
        }
    )
)