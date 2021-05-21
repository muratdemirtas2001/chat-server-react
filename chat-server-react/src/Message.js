import React from "react";
function Message({ message }) {
  return (
    <>
      <div className="message-wrapper">
        <h3> From: {message.from}</h3>
        <h3>{message.text}</h3>
        <button>delete</button>
      </div>
    </>
  );
}

export default Message;
