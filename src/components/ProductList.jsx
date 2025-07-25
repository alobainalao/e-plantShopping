import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import Header from './Header'; // ruta correcta según tu estructura
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const [addedToCart, setAddedToCart] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true); // empieza mostrando plantas

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart(prev => ({
            ...prev,
            [product.name]: true,
        }));
    };

    const handleDeleteToCart = (name) => {
        setAddedToCart(prev => {
            if (name in prev) {
                const { [name]: _, ...rest } = prev;
                return rest;
            }
            return prev;
        });
    };

    const handleShowCart = () => {
        setShowCart(true);
        setShowPlants(false);
    };

    const handleShowPlants = () => {
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
        setShowPlants(true);
    };

    // calcula cantidad total productos
    const calculateTotalQuantity = () => {
        return cart.reduce((qty, item) => qty + item.quantity, 0);
    };

    const liquorsArray = [
        {
            category: "Vinos Tintos",
            products: [
                { name: "Cabernet Sauvignon", image: "/images/liquors/cabernet_sauvignon.jpg", description: "Vino tinto seco con notas de roble y frutas negras.", cost: "$350" },
                { name: "Malbec", image: "/images/liquors/malbec.jpg", description: "Intenso y afrutado, ideal para carnes rojas.", cost: "$320" },
                { name: "Merlot", image: "/images/liquors/merlot.jpg", description: "Suave y afrutado, perfecto para cualquier ocasión.", cost: "$300" },
                { name: "Tempranillo", image: "/images/liquors/tempranillo.jpg", description: "Tinto español con cuerpo y aroma a vainilla.", cost: "$330" },
                { name: "Syrah", image: "/images/liquors/syrah.jpg", description: "Potente y especiado, ideal para platillos intensos.", cost: "$360" },
                { name: "Zinfandel", image: "/images/liquors/zinfandel.jpg", description: "Complejo, con toques de frutos rojos y especias.", cost: "$340" }
            ]
        },
        {
            category: "Vinos Blancos",
            products: [
                { name: "Chardonnay", image: "/images/liquors/chardonnay.jpg", description: "Blanco seco con toques de manzana y cítricos.", cost: "$310" },
                { name: "Sauvignon Blanc", image: "/images/liquors/sauvignon_blanc.jpg", description: "Fresco y ácido, ideal para pescados y mariscos.", cost: "$290" },
                { name: "Riesling", image: "/images/liquors/riesling.jpg", description: "Aromático, ligeramente dulce, perfecto como aperitivo.", cost: "$280" },
                { name: "Gewürztraminer", image: "/images/liquors/gewürztraminer.jpg", description: "Exótico, floral y ligeramente especiado.", cost: "$320" },
                { name: "Viognier", image: "/images/liquors/viognier.jpg", description: "Blanco afrutado con notas de durazno y miel.", cost: "$310" },
                { name: "Albariño", image: "/images/liquors/albariño.jpg", description: "Fresco y cítrico, perfecto para mariscos.", cost: "$300" }
            ]
        },
        {
            category: "Whiskies y Tequilas",
            products: [
                { name: "Tequila", image: "/images/liquors/tequila.jpg", description: "Puro y cristalino, ideal para cocteles.", cost: "$420" },
                { name: "Mezcal", image: "/images/liquors/mezcal.jpg", description: "Ahumado y artesanal, sabor profundo.", cost: "$450" },
                { name: "Tequila Añejo", image: "/images/liquors/tequila_anejo.jpg", description: "Envejecido en barrica, sabor profundo y suave.", cost: "$550" },
                { name: "Whisky", image: "/images/liquors/whisky.jpg", description: "Ahumado y complejo, tradición escocesa pura.", cost: "$700" },
                { name: "Bourbon", image: "/images/liquors/bourbon.jpg", description: "Dulce y con notas de vainilla y caramelo.", cost: "$600" },
                { name: "Scotch", image: "/images/liquors/scotch.jpg", description: "Intenso y equilibrado, clásico escocés.", cost: "$650" }
            ]
        }
    ];


    return (
        <div>
            <Header
                onShowCart={handleShowCart}
                onShowPlants={handleShowPlants}
                cartQuantity={calculateTotalQuantity()}
            />

            {!showCart && showPlants && (
                <div className="product-grid">
                    {liquorsArray.map((category, index) => (
                        <div key={index}>
                            <h1>{category.category}</h1>
                            <div className="product-list">
                                {category.products.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img
                                            className="product-image"
                                            src={`${import.meta.env.BASE_URL}${plant.image}`}
                                            alt={plant.name}
                                        />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-price">{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={plant.name in addedToCart}
                                        >
                                            {(plant.name in addedToCart) ? 'Agregando...' : 'Agregar'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCart && (
                <CartItem
                    onContinueShopping={handleContinueShopping}
                    onDeleteToCart={handleDeleteToCart}
                />
            )}
        </div>
    );
}

export default ProductList;
