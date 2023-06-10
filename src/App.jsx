import { useEffect } from "react";

import "./App.css";

function App() {
  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODJmOWUyZDZmM2ExZGM4MDNiMzUwYmY3NmYxNjhmMiIsInN1YiI6IjY0ODFkMzA4ZDJiMjA5MDBjYTFkOWFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z30aoYMnkVcNfi5lrNMdBFxcjc62ImrdliBvElGuz10",
  //     },
  //   };

  //   fetch("https://api.themoviedb.org/3/authentication", options)
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <div>Films DB</div>
    </>
  );
}

export default App;
