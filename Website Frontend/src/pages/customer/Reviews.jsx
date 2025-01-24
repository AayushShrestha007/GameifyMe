// src/components/Reviews.jsx
import React from 'react';
import styled from 'styled-components';
import CustomerTestimonialCard from '../../components/CustomerTestimonialCard';
import Navbar from '../../components/Navbar';

// Styled Components

// Container for the entire Reviews page
const ReviewsContainer = styled.div`
  padding: 100px 0px 50px 0px; /* Top padding accounts for fixed Navbar */
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

// Header for the page
const Header = styled.h1`
  font-size: 3em;
  margin-bottom: 40px;
  color: #333;
`;

// Grid container to hold testimonial cards
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  justify-items: center;
  align-items: start;
`;

// Sample Testimonials Data
const testimonials = [
    {
        image: '/assets/images/testimonial/testimonial 1.png',
        testimonial: 'This service is amazing! Highly recommended for anyone looking to get a personalized gift that is also unique',
        name: 'John Doe',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 2.png',
        testimonial: 'Really good customer support. I will buy again for sure, I got this as a gift for my son and he absolutely loved it',
        name: 'Steve Johnson',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 3.png',
        testimonial: 'An incredible experience from start to finish. The image was delivered as promised to my inbox and I loved it',
        name: 'Jane Smith',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 4.png',
        testimonial: 'Customer support is exceptional. They resolved my issues promptly and efficiently without any hesitation.',
        name: 'Diana Prince',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 5.png',
        testimonial: 'The variety of games available on GameifyMe keeps me engaged for hours. Fantastic platform!',
        name: 'Ethan Hunt',
        starCount: 4,
    },
    {
        image: '/assets/images/testimonial/testimonial 6.png',
        testimonial: 'GameifyMe’s interface is sleek and modern. It makes navigating through the platform a breeze.',
        name: 'Fiona Gallagher',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 7.png',
        testimonial: 'The social features allow me to connect with fellow gamers easily. It’s like having a gaming family!',
        name: 'George Martin',
        starCount: 4,
    },
    {
        image: '/assets/images/testimonial/testimonial 8.png',
        testimonial: 'I appreciate the constant updates and new features introduced by GameifyMe. Keeps things fresh!',
        name: 'Hannah Lee',
        starCount: 5,
    },
    {
        image: '/assets/images/testimonial/testimonial 9.png',
        testimonial: 'GameifyMe provides a seamless gaming experience with minimal lag and excellent performance.',
        name: 'Ian Wright',
        starCount: 5,
    },
];


const Reviews = () => {
    return (
        <>
            <Navbar />
            <ReviewsContainer>
                <Header>Our Customer Reviews</Header>
                <TestimonialsGrid>
                    {testimonials.map((testimonial, index) => (
                        <CustomerTestimonialCard
                            key={index}
                            image={testimonial.image}
                            testimonial={testimonial.testimonial}
                            name={testimonial.name}
                            starCount={testimonial.starCount}
                        />
                    ))}
                </TestimonialsGrid>
            </ReviewsContainer>
        </>
    );
};

export default Reviews;
