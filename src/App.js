import "./App.css";
import MessageBoard from "./MessageBoard";
import SeeLatestButton from "./SeeLatestButton";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
function App() {

  const [data, setData] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    fetch("https://muratdemirtas-chat-server.glitch.me/messages")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setData(data);
        setIsUpdatingData(false);
      });
  }, [isUpdatingData]);

  function handler() {
    setIsUpdatingData(true);
  }

  function signInHandler() {
    setIsUserSignedIn(true);
  }
  return (
    <>
      <Navbar />
      {isUserSignedIn ? (
        <>
          <MessageBoard data={data} handler={handler} />
        </>
      ) : (
        <SignIn signInHandler={signInHandler} />
      )}
    </>
  );
}

export default App;
