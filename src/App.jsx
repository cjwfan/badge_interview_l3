import { useEffect, useState } from "react";

import "./App.css";
import { supabase } from "./utils/supabase";

function App() {
  const [names, setNames] = useState([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  async function getUsers() {
    const { data } = await supabase.from("users").select("*");
    console.log(data);
    setNames(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from("users").insert({
      last_name: lastName,
      first_name: firstName,
    });
    getUsers();
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <button type="submit">Add Name</button>
      </form>
      <p>Mia is typing: {firstName}</p>
      <div>
        {names.map((name) => (
          <div key={name.id}>
            <p>First Name: {name.first_name}</p>
            <p>Last Name: {name.last_name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
