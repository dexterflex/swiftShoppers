import './hero.css';
import Social from '../social/Social';

const Hero = () => {
    return (
        <section className='hero_section'>
            {/* Container for the hero image */}
            <div className="image_container">
                <img
                    src="/—Pngtree—3d order online shop_13342845.png"
                    alt="Online shopping illustration"
                />
            </div>

            {/* Background overlay with text and social links */}
            <div className='blur_bg'>
                <h1>
                    Welcome to <span>&#10077; SwiftShoppers &#10078;</span>
                </h1>
                <p>
                    SwiftShoppers: Fast, Easy, and Affordable. <br />
                    Your One-Stop Shop for Everything!
                </p>
                <button>Shop Now</button>
                <Social />
            </div>
        </section>
    );
};

export default Hero;
