import React from "react";
import Message from "./Message";
import { useState } from "react";
const axios = require("axios");
function MessageBoard({ data, handler }) {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  function fromHandler(e) {
    setFrom(e.target.value);
  }
  function textHandler(e) {
    setText(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    // axios
    //   .post("https://muratdemirtas-chat-server.glitch.me/messages", {
    //     from: "murat",
    //     text: "helllllooooo",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     window.location = "/retrieve"; //This line of code will redirect you once the submission is succeed
    //   });
    console.log("hello on submit handler");
    var body = {
      from: from,
      text: text,
    };

    axios({
      method: "post",
      url: "https://muratdemirtas-chat-server.glitch.me/messages",
      data: body,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (data) {
    return (
      <>
        <div className="content">
          <div className="message-board">
            {data.map((message) => {
              return <Message message={message} />;
            })}
          </div>
          <div className="message-input-wrapper">
            <form
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
                onChange={textHandler}
              ></input>
              <button type="submit" onClick={handler}>
                send message
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else return null;
}
export default MessageBoard;
