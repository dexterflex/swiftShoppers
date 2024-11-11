SwiftShoppers

SwiftShoppers is a modern e-commerce platform built using React and Redux, integrated with Firebase for authentication and data storage. The application provides users with a seamless shopping experience, allowing them to browse products, manage their cart, and track their orders.

Table of Contents

- Features
- Technologies Used
- Installation
- Usage
- Environment Variables
- Project Structure
- API Endpoints
- Contributing
- License
- Contact

Features

- User authentication with Firebase (signup, login, logout).
- Product browsing with search functionality.
- Cart management (add, remove, update products).
- Order tracking and history.
- Protected routes for authenticated users.
- Responsive design for mobile and desktop users.

Technologies Used

- Frontend: React, Redux, React Router, Firebase
- Backend: Firebase Firestore
- Styling: CSS, Styled-components
- State Management: Redux Toolkit
- Package Manager: npm

Installation

1. Clone the repository:

   git clone https://github.com/yourusername/swiftshoppers.git

2. Navigate to the project directory:

   cd swiftshoppers

3. Install the dependencies:

   npm install

4. Create a .env file in the root directory and populate it with your Firebase configuration and API URLs. See the Environment Variables section for details.

5. Start the development server:

   npm start

6. Open your browser and navigate to http://localhost:3000 to view the application.

Usage

- Sign Up: Create a new account by filling out the signup form.
- Login: Access your account using your credentials.
- Browse Products: Navigate through the product categories and search for items.
- Manage Cart: Add products to your cart and proceed to checkout.
- Track Orders: View your order history in the orders section.


Project Structure

Here’s a high-level overview of the project structure:

swiftshoppers/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── redux/              # Redux slices and store configuration
│   ├── firebase/           # Firebase configuration
│   ├── App.js              # Main application file
│   ├── index.js            # Entry point
│   └── styles/             # Global styles and CSS
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation

API Endpoints

This project uses the following API endpoints:

- Products: https://dummyjson.com/products
- Categories: https://dummyjson.com/products/categories
- Search Products: https://dummyjson.com/products/search?q={query}
- Single Product: https://dummyjson.com/products/{id}

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   git checkout -b feature/YourFeature
3. Make your changes and commit them:
   git commit -m "Add your feature description"
4. Push to the branch:
   git push origin feature/YourFeature
5. Create a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For any inquiries, please contact:

- Your Name: your.email@example.com
- GitHub: yourusername
