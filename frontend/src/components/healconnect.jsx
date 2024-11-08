// src/HealConnectPage.js
import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme.js';
import {useNavigate} from "react-router-dom"
const PageWrapper = styled.div`
  background-color: ${colors.background};
  font-family: Arial, sans-serif;
  color: ${colors.primary};
  min-height: 100vh;
  width: 100vw;
  padding: 10px;
`;

// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 20px;
//   background-color: ${colors.primary};
//   color: ${colors.white};
//   font-size: 24px;
// `;

// const NavLinks = styled.nav`
//   display: flex;
//   gap: 20px;
//   a {
//     color: ${colors.white};
//     text-decoration: none;
//     font-size: 18px;
//   }
// `;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const Tagline = styled.h2`
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 30px;
  font-style: italic;
`;

const SectionWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background-color: ${colors.white};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextContent = styled.div`
  flex: 1;
  text-align: left;

  h3 {
    font-size: 24px;
    margin-bottom: 20px;
    color: ${colors.primary};
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
    color: ${colors.primary};
  }
`;

const StartButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const HealConnectPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/chatbot');
  };
  return (
    <PageWrapper>
      <Content>
        <Tagline>"Your Personal Mental Health Companion, Anytime!!"</Tagline>
        <SectionWrapper>
          <TextContent>
            <h3>CHATBOT</h3>
            <p>
              Get instant support, mood tracking, and guided exercises through
              our intelligent chatbot.
            </p>
            <StartButton onClick={handleStartClick}>Start Now</StartButton>
          </TextContent>
          <ImageWrapper>
            <img
              src="https://via.placeholder.com/400x300" // Replace with your image URL
              alt="Chatbot Illustration"
            />
          </ImageWrapper>
        </SectionWrapper>
      </Content>
    </PageWrapper>
  );
};

export default HealConnectPage;
