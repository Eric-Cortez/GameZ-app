import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../store/category';
import { getProducts } from '../../store/product';
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state?.product?.entries);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([dispatch(getCategories()), dispatch(getProducts())]);
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id="home-page">
            {/* <img src="https://example.com/image.jpg" alt="Gamer background" /> */}
            <p className="home-header">Games Our Authors Love!</p>
            <div className="games-we-love">
                {allProducts?.slice(0, 12).map((product) => (
                    <figure key={product?.id}>
                        <Link className="games-we-love-link" to={`/products/${product?.id}`}>
                            <img
                                className="games-we-love-image"
                                src={product?.image_url}
                                alt={product?.name}
                            />
                        </Link>
                        <figcaption className="fig-caption" >
                            <Link className="fig-caption" to={`/products/${product?.id}`}>{product?.name}</Link>
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className='site-info-header'>
                <h2>What is GameZ?</h2>
                <a href="https://github.com/gitxandalf/gameZ/wiki">Read our wonderfully weird story.</a>
            </div>

            <div className='site-info'>

                <div className='community'>
                    <h3>A community doing good</h3>
                    <p>
                        GameZ is a global online marketplace, where people come together to make, sell, buy, and collect unique games.
                        We’re also a community pushing for positive change for small businesses, people, and the planet.
                        Here are some of the ways we’re making a positive impact, together.
                    </p>
                </div>
                <div className='support'>
                    <h3>Support independent creators</h3>
                    <p>
                        There’s no GameZ warehouse – just millions of people selling the things they love.
                        We make the whole process easy, helping you connect directly with makers to find something extraordinary.
                    </p>
                </div>
                <div className='peace'>
                    <h3>Peace of mind</h3>
                    <p>Your privacy is the highest priority of our dedicated team.
                        And if you ever need assistance, we are always ready to step in for support.</p>
                </div>
            </div>
              <div className='site-info-footer'>
                <h4>Have a question? Well, we’ve got some answers.</h4>
                <a className="home-btn" href="https://github.com/gitxandalf/gameZ/blob/main/README.md">Go to Help Center</a>
            </div>
            <br/>
        </div >
    );
}
export default HomePage;
