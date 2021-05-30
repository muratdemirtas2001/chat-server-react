import React from "react";
import { useState } from "react";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
const axios = require("axios");
function Edit({
  onSubmitHandleEdit,
  messageId,
  handleEdit,
  setIsEditing,
  setIsUpdatingData,
}) {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  function fromHandler(e) {
    console.log(e.target.value);
    setFrom(e.target.value);
  }

  function textHandler(e) {
    console.log(e.target.value);
    setText(e.target.value);
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    //   event.preventDefault();
    console.log("hello from onSubmitHandleEdit");
    console.log(messageId);
    // setIsEditing(true);
    var body = {
      text: text,
      from: from,
    };

    axios({
      method: "put",
      url: `https://muratdemirtas-chat-server.glitch.me/messages/${messageId}`,
      data: body,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsUpdatingData(true);
  }

  return (
    <div className="message-input-wrapper edit-message">
      <h1>Update your message.......</h1>
      <form
        method="put"
        className="form-wrapper"
        onSubmit={(e) => handleEditSubmit(e)}
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
            aria-label="send"
            //to hide editing on click
            onClick={(e) => {
              handleEditSubmit(e);
              setIsEditing(false);
            }}
          >
            <SendOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </form>
    </div>
  );
}

export default Edit;
