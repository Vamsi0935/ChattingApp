import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    console.log(`Selected contact index: ${index}`, contact);
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 1.2rem; 
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar img {
        height: 3rem;
      }

      .username h3 {
        color: white;
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar img {
      height: 4rem;
      max-inline-size: 100%;
    }

    .username h2 {
      color: white;
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 12% 70% 18%;

    .brand {
      flex-direction: column;
      gap: 0.5rem;
      img {
        height: 1.5rem;
      }
      h3 {
        font-size: 1rem;
      }
    }

    .contacts {
      .contact {
        min-height: 4rem;
        .avatar img {
          height: 2.5rem;
        }
        .username h3 {
          font-size: 0.9rem;
        }
      }
    }

    .current-user {
      gap: 1rem;

      .avatar img {
        height: 3rem;
      }

      .username h2 {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    grid-template-rows: 15% 65% 20%;

    .brand {
      img {
        height: 1.2rem;
      }
      h3 {
        font-size: 0.8rem;
      }
    }

    .contacts {
      .contact {
        min-height: 3rem;
        .avatar img {
          height: 2rem;
        }
        .username h3 {
          font-size: 0.8rem;
        }
      }
    }

    .current-user {
      gap: 0.5rem;

      .avatar img {
        height: 2.5rem;
      }

      .username h2 {
        font-size: 1rem;
      }
    }
  }
`;
