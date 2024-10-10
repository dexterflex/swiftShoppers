import './footer.css'
import Social from '../social/Social'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='top_section'>
                <h1 className='poppins-bold'>Unlock a New Dimension of Shopping <br />Shop Ahead of the Curve!</h1>
                <button className='poppins-regular'>Shop Now</button>
            </div>
            <div className='middle_section'>
                <div className='middle_left_section'>
                    <h2>SwiftShoppers</h2>
                    <p className='poppins-regular'>SwiftShoppers: Fast, Easy, and Affordable. <br /> Your One-Stop Shop for Everything!</p>
                </div>
                <div className='middle_right_section'>
                    <div>
                        <p>Links</p>
                        <li>Overons</li>
                        <li>Social Media</li>
                        <li>Counters</li>
                        <li>Contact</li>
                    </div>
                    <div>
                        <p>Company</p>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Contact</li>
                    </div>
                    <div>
                        <p>Get in Touch</p>
                        <li>New Delhi, India 10037</li>
                        <li>085-1234567</li>
                        <li>info@SwiftShoppers.net</li>
                    </div>
                </div>
            </div>
            <div className='bottom_section'>
                <Social />
                <p>© 2021 SwiftShoppers. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Footer
