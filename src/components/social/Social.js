import './social.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Social = () => {
    return (
        <div className="social-container">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <FaLinkedinIn />
            </a>
        </div>
    );
}

export default Social;
