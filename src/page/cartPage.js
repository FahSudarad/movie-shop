// page/cart
import React from "react";
import Cart from "../components/Cart";

function CartPage({
  cartItems,
  handleAddToCart,
  handleRemoveFromCart,
  clearCart,
  navigateToCart,
}) {
  return (
    <div>
      <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        clearCart={clearCart}
        navigateToCart={navigateToCart}
      />
    </div>
  );
}

export default CartPage;
