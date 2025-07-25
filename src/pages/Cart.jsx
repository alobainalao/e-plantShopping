import React from 'react';
import CartItem from '../components/CartItem';

function Cart() {
    const handleContinueShopping = () => {
        window.history.back(); // Regresa a la página anterior
    };

    const handleDeleteToCart = (itemName) => {
        console.log(`Item eliminado del carrito: ${itemName}`);
    };

    return (
        <CartItem
            onContinueShopping={handleContinueShopping}
            onDeleteToCart={handleDeleteToCart}
        />
    );
}

export default Cart;