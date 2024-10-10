import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
    const [selected, setSelected] = useState(null);

    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null);  // Collapse if already opened
        }
        setSelected(index);  // Expand the clicked question
    };

    const questions = [
        {
            question: "How long does delivery take?",
            answer: "Delivery usually takes between 3-5 business days, depending on your location and chosen shipping method."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Visa, MasterCard, PayPal, and Apple Pay. You can select your preferred method at checkout."
        },
        {
            question: "Can I return or exchange a product?",
            answer: "Yes, we offer a 30-day return policy. Items must be in their original condition with the receipt."
        },
        {
            question: "How do I track my order?",
            answer: "You will receive a tracking link via email once your order has been shipped. You can track your order in real-time."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship to many countries around the world. International shipping rates and times vary depending on the destination."
        }
    ];

    return (
        <div className="faq-container">
            <div className="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {questions.map((item, index) => (
                        <div key={index} className="faq-item">
                            <div className="faq-question" onClick={() => toggle(index)}>
                                <h3>{item.question}</h3>
                                <span>{selected === index ? '-' : '+'}</span>
                            </div>
                            <div className={selected === index ? 'faq-answer show' : 'faq-answer'}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
