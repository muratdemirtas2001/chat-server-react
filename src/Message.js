import React from "react";
const axios = require("axios");

function Message({ message, handler, handleEdit }) {
  function handleDelete(id) {
    console.log("hello from delete");
    // axios({
    //   method: "delete",
    //   url: `https://muratdemirtas-chat-server.glitch.me/messages/${id}`,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     handler();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    fetch(`https://muratdemirtas-chat-server.glitch.me/messages/${id}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // this is the data we get after putting our data, do whatever you want with this data
        handler()
      );
  }

  return (
    <>
      <div className="message-wrapper">
        <p> From: {message.from}</p>
        <p>{message.text}</p>
        <button onClick={() => handleDelete(message.id)}>delete</button>
        <button onClick={() => handleEdit(message.id)}>Edit</button>
      </div>
    </>
  );
}

export default Message;
