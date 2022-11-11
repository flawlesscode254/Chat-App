import React, { useState, useEffect, useRef } from "react";
import FlipMove from "react-flip-move";

import db, { auth } from "../Firebase";
import firebase from "firebase";

import Message from "./Message";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  window.addEventListener("beforeunload", () => {
    db.collection("user").doc(auth?.currentUser?.email).update({
      online: "offline",
    });
  });

  useEffect(() => {
    db.collection("user").doc(auth?.currentUser?.email).update({
      online: "online",
    });
  }, []);

  const dummy = useRef();

  useEffect(() => {
    db.collection("messages")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendMessage = async (e) => {
    await e.preventDefault();
    await db
      .collection("messages")
      .add({
        username: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        message: message,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async () => {
        await setMessage("");
        await dummy.current.scrollIntoView({ behavior: "smooth" });
      });
  };
  return (
    <div
      style={{
        width: "70%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginBottom: 100,
        }}
      >
        <FlipMove>
          {messages &&
            messages.map((item) => (
              <Message
                key={item.id}
                username={item.data.username}
                email={item.data.email}
                message={item.data.message}
                time={item.data.time}
              />
            ))}
        </FlipMove>
        <div ref={dummy}></div>
      </div>

      <div
        style={{
          padding: 10,
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          backgroundColor: "#010438",
          width: "70%",
          marginTop: 10,
        }}
      >
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              paddingRight: 350,
              paddingLeft: 10,
              outline: 0,
              border: "none",
              borderRadius: 10,
            }}
            type="text"
            placeholder="Type message..."
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
