import React, { useState, useEffect } from "react";
import moment from "moment";

import "./Message.css";

import db, { auth } from "../Firebase";

function Message({ username, email, message, time }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (email === auth?.currentUser?.email) {
      db.collection("user")
        .doc(auth?.currentUser?.email)
        .onSnapshot((doc) => {
          setStatus(doc.data().online);
        });
    } else {
      db.collection("user")
        .doc(email)
        .onSnapshot((doc) => {
          setStatus(doc.data().online);
        });
    }
  }, []);
  return (
    <div>
      <div className={email === auth?.currentUser?.email ? "user" : "guest"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: -10,
            color: "gray",
          }}
        >
          <p>{username}</p>
          {email !== auth?.currentUser?.email && (
            <p
              style={{
                color:
                  status === "offline"
                    ? "red"
                    : status === "online"
                    ? "green"
                    : "",
              }}
            >
              {status}
            </p>
          )}
          <p>{moment(new Date(time?.toDate()).toUTCString()).fromNow()}</p>
        </div>

        <div>
          <p
            style={{
              color: "white",
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
