import React from "react";
import Message from "./Message";
import { useState } from "react";
const axios = require("axios");
function MessageBoard({ data, handler }) {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const [editText,setEditText]=useState("murat is lazy")
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
     console.log("hello from edit");
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
          <div className="message-board">
            {data.map((message) => {
              return <Message message={message} handler={handler} handleEdit={handleEdit} />;
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
