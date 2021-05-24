import "./App.css";
import MessageBoard from "./MessageBoard";
import SeeLatestButton from "./SeeLatestButton";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";

function App() {
  // console.log("APP");
  const [data, setData] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    fetch("https://muratdemirtas-chat-server.glitch.me/messages/latest")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log("useEffect");
        setData(data);
        // console.log(data);
        setIsUpdatingData(false);
      });
  }, [isUpdatingData]);
  // console.log(isUpdatingData);
  function handler() {
    setIsUpdatingData(true);
  }
  function signInHandler() {
    // e.preventDefault();
    // console.log("sign in handler");
    // fetch("https://muratdemirtas-chat-server.glitch.me")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.authentication === true) {
    //       setIsUserSignedIn(true);
    //     }
    //   });
    setIsUserSignedIn(true); 
  }
  console.log(isUserSignedIn)
  return (
    <>
      <Navbar />
      {isUserSignedIn ? (
        <>
          <MessageBoard data={data} handler={handler} />
          <SeeLatestButton handler={handler} />
        </>
      ) : (
        <SignIn signInHandler={signInHandler} isUserSignedIn={isUserSignedIn} />
      )}
      {/* <SignIn /> */}
      {/* <MessageBoard data={data} handler={handler} />
      <SeeLatestButton handler={handler} /> */}
    </>
  );
}

export default App;
