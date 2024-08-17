import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "../Logout/Logout";
import ChatInput from "../ChatInput/ChatInput";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if (userData) setUser(userData);
      } catch (error) {
        console.error("Error fetching user data from localStorage", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (user && currentChat) { 
        try {
          const response = await axios.post(
            "https://chatting-app-api.vercel.app/api/messages/getmsg",
            {
              from: user._id,
              to: currentChat._id,
            }
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };
    fetchMessages();
  }, [currentChat, user]);

  const handleSendMsg = async (msg) => {
    if (user) {
      try {
        socket.current?.emit("send-msg", {
          to: currentChat._id,
          from: user._id,
          msg,
        });
        await axios.post("https://chatting-app-api.vercel.app/api/messages/addmsg", {
          from: user._id,
          to: currentChat._id,
          message: msg,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: true, message: msg },
        ]);
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={message._id || Math.random()}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
