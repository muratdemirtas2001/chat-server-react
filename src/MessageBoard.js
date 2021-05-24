import React from "react";
import Message from "./Message";
import { useState } from "react";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";


const axios = require("axios");
function MessageBoard({ data, handler }) {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("murat is lazy");
  function fromHandler(e) {
    setFrom(e.target.value);
  }
  function textHandler(e) {
    setText(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
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
        console.error("Error:", error);
      });
  }
  function handleEdit(id) {
    var body = {
      text: editText,
    };

    axios({
      method: "patch",
      url: `https://muratdemirtas-chat-server.glitch.me/messages/${id}`,
      data: body,
    });
  }
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
                variant="outlined"
                onChange={fromHandler}
              />
              <TextField
                id="outlined-basic"
                label="Message"
                variant="outlined"
                name="text"
                onChange={textHandler}
                className="extended-input-size"
              />
              <Tooltip title="Send">
                <IconButton type="submit" onClick={handler} aria-label="send">
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
          <div className="message-board">
            {data.map((message) => {
              return (
                <Message
                  message={message}
                  handler={handler}
                  handleEdit={handleEdit}
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
