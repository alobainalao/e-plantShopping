import React from 'react';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../components/AboutUs';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/products');
    };

    return (
        <div className="landing-page">
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}/background.png)`
                }}
            ></div>
            <div className="content">
                <div className="landing_content">
                    <h1>Bienvenido a Vinoteca El Roble</h1>
                    <p>Donde el vino y los licores cuentan historias</p>

                    <button className="get-started-button" onClick={handleGetStartedClick}>
                        Explora nuestra selección
                    </button>
                </div>

                <div className="aboutus_container">
                    <AboutUs />
                </div>
            </div>

        </div>
    );
}

export default Home;
