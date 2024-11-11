import React from 'react';

// Component for displaying additional product information
const AdditionalInformation = ({ product }) => (
    <div className='additional-informations'>
        <h3 className='heading poppins-medium'>Additional Information</h3>
        {/* Render shipping information */}
        <InformationText label="Shipping" text={product.shippingInformation} />
        {/* Render return policy information */}
        <InformationText label="Return Policy" text={product.returnPolicy} />
    </div>
);

// Reusable component for displaying a labeled text field
const InformationText = ({ label, text }) => (
    <p className='information poppins-regular'>
        <strong>{label} :</strong> {text}
    </p>
);

export default AdditionalInformation;
