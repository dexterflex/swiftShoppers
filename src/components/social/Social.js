import './social.css'; // Import CSS for styling
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import social media icons

// Social component to display social media links
const Social = () => {
    return (
        <div className="social-container"> {/* Container for social links */}
            {/* Facebook link */}
            <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
            >
                <FaFacebookF /> {/* Facebook icon */}
            </a>

            {/* Twitter link */}
            <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
            >
                <FaTwitter /> {/* Twitter icon */}
            </a>

            {/* Instagram link */}
            <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
            >
                <FaInstagram /> {/* Instagram icon */}
            </a>

            {/* LinkedIn link */}
            <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
            >
                <FaLinkedinIn /> {/* LinkedIn icon */}
            </a>
        </div>
    );
}

export default Social;
