import "./App.css";
import MessageBoard from "./MessageBoard";
import SeeLatestButton from "./SeeLatestButton";
import Navbar from "./Navbar";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import useInterval from "./useInterval"
function App() {
  const [data, setData] = useState("");
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isUserSigningUp, setIsUserSigningUp] = useState(false);

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

    useInterval(
      () => {
        // Your custom logic here
          fetch("https://muratdemirtas-chat-server.glitch.me/messages")
            .then((resp) => {
              return resp.json();
            })
            .then((data) => {
              setData(data);
              // setIsUpdatingData(false);
            })
            .catch((e) => console.error(e.message));
        // setCount(count + 1);
      },
      // Delay in milliseconds or null to stop it
     30000    );


  // const fetchDataInEvery10 = setInterval(timer, 10000);
  // function timer() {
  //   fetch("https://muratdemirtas-chat-server.glitch.me/messages")
  //     .then((resp) => {
  //       return resp.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       // setIsUpdatingData(false);
  //     })
  //     .catch((e) => console.error(e.message));
  //   clearInterval(fetchDataInEvery10);
  // }
  function signInHandler() {
    setIsUserSignedIn(true);
  }
  return (
    <>
      <Navbar />
      {isUserSignedIn ? (
        <>
          <MessageBoard
            data={data}
            setIsUpdatingData={setIsUpdatingData}
            setIsUserSignedIn={setIsUserSignedIn}
          />
        </>
      ) : (
        <SignIn
          signInHandler={signInHandler}
          setIsUserSigningUp={setIsUserSigningUp}
          isUserSigningUp={isUserSigningUp}
          setIsUserSignedIn={setIsUserSignedIn}
        />
      )}
    </>
  );
}

export default App;
