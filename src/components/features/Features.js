import './features.css'

const Features = () => {
    const data = [
        { text: "Fast Delivery", image: "/realistic-delivery-drone.png" },
        { text: "Secure Payments", image: "/3d-render-online-payment-transaction-security.png" },
        { text: "Easy Returns and Refunds", image: "/9ee22f88-66d1-4381-b8c8-5008f716a80a.png" }
    ]
    return (
        <div className='features_container'>
            <div className='features'>
                {
                    data.map((element, index) => (
                        <div className='feature'>
                            <img src={element.image} alt="" />
                            <p>{element.text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Features
