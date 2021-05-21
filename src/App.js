import "./App.css";
import MessageBoard from "./MessageBoard";
import SeeLatestButton from "./SeeLatestButton";
import { useEffect, useState } from "react";

function App() {
  console.log("APP");
  const [data, setData] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  useEffect(() => {
    console.log("hello");
    fetch("https://muratdemirtas-chat-server.glitch.me/messages/latest")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("useEffect");
        setData(data);
        setIsUpdatingData(false);
      });
  }, [isUpdatingData]);
  // console.log(isUpdatingData);
  function handler() {
    setIsUpdatingData(true);
    console.log("hello from handler appp")
  }
  // setIsUpdatingData(true);
  // console.log(isUpdatingData);
  return (
    <>
      <MessageBoard data={data} handler={handler} />
      <SeeLatestButton handler={handler} />
    </>
  );
}

export default App;
