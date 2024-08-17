import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Contacts from "../../pages/Contacts/Contacts";
import Welcome from "../../pages/Welcome/Welcome";
import ChatContainer from "../../pages/ChatContainer/ChatContainer";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const setCurrent = useCallback(async () => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!user) {
      navigate("/");
    } else {
      setCurrentUser(JSON.parse(user));
    }
  }, [navigate]);

  useEffect(() => {
    setCurrent();
  }, [setCurrent]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [currentUser]);

  const fetchContacts = useCallback(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/auth/allusers/${currentUser._id}`
          );
          setContacts(data);
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (max-width: 480px) {
      grid-template-columns: 1fr;
      height: 90vh;
    }

    @media screen and (min-width: 481px) and (max-width: 720px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (min-width: 1081px) {
      grid-template-columns: 25% 75%;
    }
  }
`;
