import { useEffect } from "react";

function App() {
  console.log(process.env);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/test-endpoint`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <h1>Client</h1>
    </div>
  );
}

export default App;
