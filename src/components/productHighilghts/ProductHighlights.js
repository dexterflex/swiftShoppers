// Component to display product highlights
const ProductHighlights = ({ product }) => (
    <div className='product-highlights'>
        <h3 className='heading poppins-medium'>Product Highlights</h3>
        {/* Display individual product highlights using HighlightText component */}
        <HighlightText className="poppins-regular" label="Brand" text={product.brand} />
        <HighlightText className="poppins-regular" label="Weight" text={`${product.weight} lbs`} />
        <HighlightText
            className="poppins-regular"
            label="Dimensions"
            text={`${product.dimensions.width} (Width) * ${product.dimensions.height} (Height) * ${product.dimensions.depth} (Depth)`}
        />
        <HighlightText className="poppins-regular" label="Warranty" text={product.warrantyInformation} />
    </div>
);

// Component to display a single highlight with label and text
const HighlightText = ({ label, text }) => (
    <p className='highlights poppins-regular'>
        <strong>{label} :</strong> {text} {/* Format highlight text */}
    </p>
);

export default ProductHighlights;
