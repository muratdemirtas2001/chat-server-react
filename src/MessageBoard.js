import React from "react";
import Message from "./Message";
import { useState } from "react";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Edit from "./Edit";
console.log(module);

// const axios = require("axios");
function MessageBoard({ data, setIsUpdatingData, setIsUserSignedIn }) {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [messageId, setMessageId] = useState();
  const [editFrom, setEditFrom] = useState("");
  const [editText, setEditText] = useState("");

  function fromHandler(e) {
    console.log(e.target.value);
    setFrom(e.target.value);
  }

  function textHandler(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsUpdatingData(false);
    console.log("hello on submit handler");
    var body = {
      from: from,
      text: text,
    };

    // axios({
    //   method: "post",
    //   url: "https://muratdemirtas-chat-server.glitch.me/messages",
    //   data: body,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // const data = { username: "example" };

    fetch("https://muratdemirtas-chat-server.glitch.me/messages", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log("Success:", body);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    setText("");
    setIsUpdatingData(true);
  }
  // function handleEdit() {
  //   setIsEditing(true);
  // }
  // function onSubmitHandleEdit(event, id) {
  //   event.preventDefault();
  //   console.log("hello from onSubmitHandleEdit");
  //   // setIsEditing(true);
  //   var body = {
  //     text: editText,
  //     from: editText,
  //   };

  //   axios({
  //     method: "put",
  //     url: `https://muratdemirtas-chat-server.glitch.me/messages/${id}`,
  //     data: body,
  //   });
  // }
  if (data) {
    return (
      <>
        <div className="content">
          <div className="message-input-wrapper">
            <form
              method="post"
              className="form-wrapper"
              onSubmit={onSubmitHandler}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="From"
                name="from"
                value={from}
                variant="outlined"
                onChange={fromHandler}
              />
              <TextField
                id="outlined-basic"
                label="Message"
                variant="outlined"
                name="text"
                value={text}
                onChange={textHandler}
                className="extended-input-size"
              />
              <Tooltip title="Send">
                <IconButton
                  type="submit"
                  onClick={() => setIsUpdatingData(true)}
                  aria-label="send"
                >
                  <SendOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </form>
            {/* <form
              // action="https://muratdemirtas-chat-server.glitch.me/messages"
              method="post"
              className="form-wrapper"
              onSubmit={onSubmitHandler}
            >
              <input
                placeholder="from"
                name="from"
                onChange={fromHandler}
              ></input>
              <input
                placeholder="text"
                name="text"
                size="100"
                onChange={textHandler}
              ></input>
              {/* <button type="submit" onClick={handler}>
                send message
              </button> */}
            {/* <Tooltip title="Send">
                <IconButton type="submit" onClick={handler} aria-label="send">
                  <SendOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </form>  */}
          </div>
          <div className="log-out">
            <Tooltip title="LOG-OUT">
              <IconButton
                type="submit"
                onClick={() => setIsUserSignedIn(false)}
                aria-label="Log-out"
              >
                <ExitToAppIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="message-board">
            {isEditing ? (
              <Edit
                setIsEditing={setIsEditing}
                messageId={messageId}
                setIsUpdatingData={setIsUpdatingData}
                editFrom={editFrom}
                editText={editText}
              />
            ) : null}
            {data.map((message) => {
              return (
                <Message
                  message={message}
                  // handler={handler}
                  setIsUpdatingData={setIsUpdatingData}
                  setIsEditing={setIsEditing}
                  setMessageId={setMessageId}
                  setEditText={setEditText}
                  setEditFrom={setEditFrom}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  } else return null;
}
export default MessageBoard;
