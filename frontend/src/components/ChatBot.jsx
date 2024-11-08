import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import MessageParser from "./MessageParser.jsx";
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider.jsx";
import { useNavigate } from "react-router-dom";
import '../styles/ChatbotOverrides.css'
function ChatBot(props) {
  const navigate = useNavigate();

  // Header styles
  const chatHeader = {
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    backgroundColor: "#efefef",
    fontFamily: "Arial",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#514f4f",
    padding: "12.5px",
    fontWeight: "bold",
  };

  const handleClick = () => {
    props.setChatBot(false);
    navigate("/");
  };

  const botName = "AIBot";

  // Chatbot configuration
  const config = {
    initialMessages: [
      createChatBotMessage("Hi! I'm Gemini bot, you can ask any questions here"),
    ],
    botName: botName,
    customComponents: {
      header: () => (
        <div style={chatHeader}>
          AI ChatBot
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            ✖️
          </button>
        </div>
      ),
    },
    customStyles: {
      botMessageBox: {
        backgroundColor: "#376B7E",
      },
      chatButton: {
        backgroundColor: "#5ccc9d",
      },
    },
  };

  return (
    <div
      style={{
        height: "100vh", // Full height of the viewport
        backgroundColor: "rgb(255, 246, 233)", // Match design
        width: "100vw", // Full width of the viewport
        boxSizing: "border-box",
      }}
    >
      <div style={{minWidth: '100vw',height:'100vh'}}>
        <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
      </div>
    </div>
  );
}

export default ChatBot;
