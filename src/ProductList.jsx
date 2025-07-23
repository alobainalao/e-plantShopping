import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProductList.css'
import CartItem from './CartItem';
import { addItem } from './CartSlice';

function ProductList() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items); 
    const [addedToCart, setAddedToCart] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
        }));
    };

    const handleDeleteToCart = (name) => {
        setAddedToCart((prevState) => {
            if (name in prevState) {
                const { [name]: _, ...rest } = prevState;
                return rest;
            }
            console.log('No such item in cart:', name);
            return prevState;
        });
    };

    const carsArray = [
  {
    category: "SUVs",
    products: [
      {
        name: "Toyota RAV4",
        image: "https://cdn.pixabay.com/photo/2020/03/25/07/31/toyota-4965935_1280.jpg",
        description: "SUV compacto, espacioso y eficiente.",
        price: "$28,000"
      },
      {
        name: "Honda CR-V",
        image: "https://cdn.pixabay.com/photo/2020/05/22/15/33/honda-crv-5207630_1280.jpg",
        description: "SUV confiable, ideal para familias.",
        price: "$29,500"
      },
      {
        name: "Ford Escape",
        image: "https://cdn.pixabay.com/photo/2022/03/09/10/03/ford-escape-7056209_1280.jpg",
        description: "SUV versátil con opciones híbridas.",
        price: "$30,000"
      },
      {
        name: "Mazda CX-5",
        image: "https://cdn.pixabay.com/photo/2020/02/20/17/17/mazda-4864446_1280.jpg",
        description: "Diseño elegante y excelente manejo.",
        price: "$31,000"
      },
      {
        name: "Chevrolet Equinox",
        image: "https://cdn.pixabay.com/photo/2016/03/27/20/51/car-1283335_1280.jpg",
        description: "SUV cómodo con gran equipamiento.",
        price: "$27,000"
      },
      {
        name: "Hyundai Tucson",
        image: "https://cdn.pixabay.com/photo/2021/12/03/16/31/hyundai-6843744_1280.jpg",
        description: "Moderno, con gran eficiencia y diseño.",
        price: "$26,500"
      }
    ]
  },
  {
    category: "Electric Vehicles",
    products: [
      {
        name: "Tesla Model 3",
        image: "https://cdn.pixabay.com/photo/2023/11/21/13/15/tesla-8399810_1280.jpg",
        description: "Sedán eléctrico de alto rendimiento.",
        price: "$40,000"
      },
      {
        name: "Nissan Leaf",
        image: "https://cdn.pixabay.com/photo/2016/10/03/16/59/nissan-leaf-1715460_1280.jpg",
        description: "Compacto, accesible y totalmente eléctrico.",
        price: "$27,000"
      },
      {
        name: "Chevrolet Bolt",
        image: "https://cdn.pixabay.com/photo/2019/10/13/16/06/chevrolet-bolt-4546884_1280.jpg",
        description: "Compacto eléctrico con buena autonomía.",
        price: "$26,000"
      },
      {
        name: "BMW i3",
        image: "https://cdn.pixabay.com/photo/2020/05/22/15/33/bmw-i3-5207633_1280.jpg",
        description: "Estilo futurista y tecnología avanzada.",
        price: "$45,000"
      },
      {
        name: "Volkswagen ID.4",
        image: "https://cdn.pixabay.com/photo/2021/04/11/20/47/volkswagen-id4-6169637_1280.jpg",
        description: "SUV eléctrico familiar y moderno.",
        price: "$38,000"
      },
      {
        name: "Ford Mustang Mach-E",
        image: "https://cdn.pixabay.com/photo/2021/07/14/11/53/ford-mustang-6465523_1280.jpg",
        description: "Potente SUV eléctrico con estilo deportivo.",
        price: "$43,000"
      }
    ]
  },
  {
    category: "Luxury",
    products: [
      {
        name: "BMW 7 Series",
        image: "https://cdn.pixabay.com/photo/2019/11/08/15/14/bmw-4611475_1280.jpg",
        description: "Lujo, potencia y tecnología premium.",
        price: "$85,000"
      },
      {
        name: "Mercedes-Benz S-Class",
        image: "https://cdn.pixabay.com/photo/2016/11/29/12/37/car-1868726_1280.jpg",
        description: "La cúspide del lujo en sedanes.",
        price: "$90,000"
      },
      {
        name: "Audi A8",
        image: "https://cdn.pixabay.com/photo/2020/01/23/19/49/audi-4789301_1280.jpg",
        description: "Elegancia alemana y confort.",
        price: "$88,000"
      },
      {
        name: "Lexus LS",
        image: "https://cdn.pixabay.com/photo/2019/11/13/20/44/lexus-ls-4624193_1280.jpg",
        description: "Silencioso, lujoso y confiable.",
        price: "$81,000"
      },
      {
        name: "Jaguar XJ",
        image: "https://cdn.pixabay.com/photo/2020/03/18/13/44/jaguar-xj-4943873_1280.jpg",
        description: "Estilo británico con alto desempeño.",
        price: "$83,000"
      },
      {
        name: "Genesis G90",
        image: "https://cdn.pixabay.com/photo/2022/09/29/18/57/genesis-g90-7489034_1280.jpg",
        description: "El nuevo lujo coreano con estilo moderno.",
        price: "$76,000"
      }
    ]
  },
  {
    category: "Sports Cars",
    products: [
      {
        name: "Chevrolet Corvette",
        image: "https://cdn.pixabay.com/photo/2020/04/16/19/23/chevrolet-corvette-5052235_1280.jpg",
        description: "Deportivo icónico con motor central.",
        price: "$65,000"
      },
      {
        name: "Porsche 911",
        image: "https://cdn.pixabay.com/photo/2018/04/06/19/42/porsche-3297612_1280.jpg",
        description: "Deportivo alemán legendario.",
        price: "$100,000"
      },
      {
        name: "Ford Mustang",
        image: "https://cdn.pixabay.com/photo/2017/09/02/13/25/mustang-2705400_1280.jpg",
        description: "Muscle car clásico estadounidense.",
        price: "$42,000"
      },
      {
        name: "Dodge Challenger",
        image: "https://cdn.pixabay.com/photo/2019/10/25/17/34/dodge-4580486_1280.jpg",
        description: "Potencia bruta y estilo retro.",
        price: "$39,000"
      },
      {
        name: "Nissan GT-R",
        image: "https://cdn.pixabay.com/photo/2017/09/01/18/13/nissan-2701513_1280.jpg",
        description: "Tecnología y desempeño japonés.",
        price: "$110,000"
      },
      {
        name: "Mazda MX-5 Miata",
        image: "https://cdn.pixabay.com/photo/2021/02/14/08/57/mazda-mx5-6013498_1280.jpg",
        description: "Ligero, divertido y asequible.",
        price: "$28,000"
      }
    ]
  },
  {
    category: "Pickup Trucks",
    products: [
      {
        name: "Ford F-150",
        image: "https://cdn.pixabay.com/photo/2017/07/12/19/56/ford-2496900_1280.jpg",
        description: "La pickup más vendida en EE.UU.",
        price: "$38,000"
      },
      {
        name: "Chevrolet Silverado",
        image: "https://cdn.pixabay.com/photo/2018/08/21/23/07/chevy-3621795_1280.jpg",
        description: "Potente y confiable en el trabajo.",
        price: "$40,000"
      },
      {
        name: "Ram 1500",
        image: "https://cdn.pixabay.com/photo/2018/06/06/18/53/ram-truck-3457726_1280.jpg",
        description: "Comodidad, fuerza y estilo robusto.",
        price: "$42,000"
      },
      {
        name: "Toyota Tacoma",
        image: "https://cdn.pixabay.com/photo/2017/09/03/12/41/toyota-tacoma-2707882_1280.jpg",
        description: "Pickup mediana duradera y confiable.",
        price: "$36,000"
      },
      {
        name: "GMC Sierra",
        image: "https://cdn.pixabay.com/photo/2021/01/03/15/13/gmc-5884263_1280.jpg",
        description: "Lujo y poder en una pickup.",
        price: "$45,000"
      },
      {
        name: "Nissan Frontier",
        image: "https://cdn.pixabay.com/photo/2021/06/18/22/58/nissan-6346631_1280.jpg",
        description: "Versátil y resistente para el trabajo.",
        price: "$34,000"
      }
    ]
  }
];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // Calculate total products in the cart
    const calculateTotalQuantity = () => {
        return cart.reduce((quantity, item) => quantity + item.quantity, 0).toFixed(0);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path></svg></h1></a>
                        <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                    </div>
                   
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-title">{plant.description}</div>
                                        <div className="product-price">{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={plant.name in addedToCart}
                                        >
                                            {(plant.name in addedToCart) ?  'Adding...' : 'Add to Cart'}
                                            
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                    <CartItem onContinueShopping={handleContinueShopping} onDeleteToCart={handleDeleteToCart} />
            )}
        </div>
    );
}

export default ProductList;
