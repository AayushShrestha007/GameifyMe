// src/components/OurStory.jsx
import React from 'react';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';

// Styled Components

// Container for the entire Our Story page
const StoryContainer = styled.div`
  padding: 50px 20px 50px 20px; /* Top padding accounts for fixed Navbar */
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

// Header for the page
const Header = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
`;

// Paragraph text
const Paragraph = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Image styling
const StoryImage = styled.img`
  width: 200%;
  max-width:800px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 30px;
`;

// Contact information container
const ContactInfo = styled.div`
  margin-top: 40px;
  font-size: 1.1em;
  color: #333;

  p {
    margin: 5px 0;
  }
`;

// OurStory Component
const OurStory = () => {
  return (
    <>
      <Navbar />
      <StoryContainer>
        <Header>Our Story</Header>
        <Paragraph>
          Welcome to GameifyMe! Our journey began with a simple mission: to revolutionize the gift giving experience by blending fun and functionality. Founded in the heart of Lalitpur, Nepal, we envisioned a platform where gamers could not only enjoy their favorite games but also connect, share, and grow within a vibrant community.
        </Paragraph>

        <StoryImage src="/assets/images/our_story.jpg" alt="Our Story" />
        <Paragraph>
          Over the years, GameifyMe has evolved into a hub for gaming enthusiasts worldwide. We've introduced innovative features, hosted exciting tournaments, and fostered a supportive environment that encourages both casual and competitive gaming. Our team is passionate about delivering top-notch services and continuously improving to meet the ever-changing needs of our community.
        </Paragraph>
        <ContactInfo>
          <p><strong>Email:</strong> <a href="mailto:info@gameifyme.com">info@gameifyme.com</a></p>
          <p><strong>Location:</strong> Lalitpur, Nepal</p>
        </ContactInfo>
      </StoryContainer>
    </>
  );
};

export default OurStory;
