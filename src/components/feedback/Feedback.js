import React, { useState } from 'react';
import './feedback.css';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Thank you for your feedback!');
    };

    return (
        <div className="feedback-form-container">
            <h2>We'd Love Your Feedback</h2>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className="form-field">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                </div>

                <div className="form-field">
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Your Feedback"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
