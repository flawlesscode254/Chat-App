import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import db, { auth } from "../Firebase";

import Chat from "./Chat";

const Home = ({ show }) => {
  const [forum, setForum] = useState("");
  const [forums, setForums] = useState([]);
  const [chat, setchat] = useState("General");
  const [status, setStatus] = useState("");

  const addForum = () => {
    if (!forum || forum === "") {
      setStatus("Name can't be empty");
      setTimeout(() => {
        setStatus("");
      }, 1500);
    }
    db.collection("forums")
      .add({
        forum: forum,
      })
      .then(() => {
        setForum("");
      });
  };

  useEffect(() => {
    db.collection("forums").onSnapshot((snapshot) => {
      setForums(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      {show && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: 20,
              position: "fixed",
            }}
          >
            {auth?.currentUser?.email === "newtonkibiwott48@gmail.com" && (
              <>
                <p
                  style={{
                    color: "red",
                  }}
                >
                  {status}
                </p>
                <TextField
                  id="outlined-basic"
                  value={forum}
                  onChange={(e) => setForum(e.target.value)}
                  label="Forum"
                  variant="outlined"
                />
                <Button
                  onClick={addForum}
                  style={{
                    marginTop: 20,
                  }}
                  variant="contained"
                >
                  Add Forum
                </Button>
              </>
            )}
            <div
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant={chat === "General" ? "contained" : "outlined"}
                onClick={() => {
                  setchat("General");
                }}
                style={{
                  marginBottom: 25,
                }}
                endIcon={<SendIcon />}
              >
                General
              </Button>
              {forums.map((val) => {
                return (
                  <Button
                    key={val.id}
                    variant={chat === val.id ? "contained" : "outlined"}
                    onClick={() => {
                      setchat(val.id);
                    }}
                    style={{
                      marginBottom: 25,
                    }}
                    endIcon={<SendIcon />}
                  >
                    {val.data.forum}
                  </Button>
                );
              })}
            </div>
          </div>
          <Chat chat={chat} />
        </div>
      )}
    </>
  );
};

export default Home;
