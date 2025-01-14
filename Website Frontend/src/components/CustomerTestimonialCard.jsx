import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #D9D9D9;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  margin: 20px auto;
`;

const CustomerImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StarIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`;

const TestimonialText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const CustomerName = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #555;
`;

const CustomerTestimonialCard = ({ image, testimonial, name, starCount = 5 }) => {
  const stars = Array.from({ length: starCount }).map((_, i) => (
    <StarIcon key={i} src="/assets/icons/star.png" alt="star" />
  ));

  return (
    <CardContainer>
      <CustomerImage src={image} alt={name} />
      <ContentContainer>
        <StarContainer>{stars}</StarContainer>
        <TestimonialText>{testimonial}</TestimonialText>
        <CustomerName>{name}</CustomerName>
      </ContentContainer>
    </CardContainer>
  );
};

export default CustomerTestimonialCard;
