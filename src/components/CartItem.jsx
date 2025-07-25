import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onDeleteToCart }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    // Calcular monto total
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + parseFloat(item.cost.slice(1)) * item.quantity, 0).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
        onDeleteToCart(item.name);
    };

    const calculateTotalCost = (item) => {
        return (parseFloat(item.cost.slice(1)) * item.quantity).toFixed(2);
    };

    // Abrir modal
    const openModal = () => setShowModal(true);

    // Cerrar modal
    const closeModal = () => setShowModal(false);

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={`${import.meta.env.BASE_URL}${item.image}`} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Más</button>
                <br />
                <button
                    className="get-started-button"
                    style={{ backgroundColor: '#28a745' }}
                    onClick={openModal}
                >
                    Pagar
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h1>Total a pagar: ${calculateTotalAmount()}</h1>

                        {/* Aquí puedes poner el formulario o integración con la pasarela real */}
                        <form onSubmit={e => {
                            e.preventDefault();
                            alert("Pago procesado (simulado)");
                            closeModal();
                        }}>
                            <div>
                                <label>Nombre en tarjeta:</label><br />
                                <input type="text" required placeholder="Juan Pérez" />
                            </div>
                            <div>
                                <label>Número de tarjeta:</label><br />
                                <input type="text" required placeholder="1234 5678 9012 3456" maxLength={19} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div>
                                    <label>Expiración:</label><br />
                                    <input type="text" required placeholder="MM/AA" maxLength={5} />
                                </div>
                                <div>
                                    <label>CVC:</label><br />
                                    <input type="text" required placeholder="123" maxLength={3} />
                                </div>
                            </div>
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                            <button type="submit" className="get-started-button" style={{ marginTop: '1rem' }}>Continuar</button>
                            <button onClick={closeModal} className="get-started-button" style={{ backgroundColor: '#dc3545' }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;
