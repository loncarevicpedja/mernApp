import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditUser() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id != null) {
      fetch("http://localhost:4000/profile/" + id)
        .then((response) => response.json())
        .then((userInfo) => {
          setUsername(userInfo.username);
          setName(userInfo.name);
          setPhone(userInfo.phone);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, []);
  async function updateUser(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("username", username);
    data.set("name", name);
    data.set("phone", phone);
    data.set("id", id);
    const response = await fetch(`http://localhost:4000/updateuser/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Uneto korisnicko ime vec postoji!");
    }
  }

  if (redirect) {
    return <Navigate to={"/profile/" + id} />;
  }

  return (
    <div className="main-create">
      <h1>Promena ličnih informacija</h1>
      <form className="login" onSubmit={updateUser}>
        <input
          type="username"
          placeholder={"E-mail"}
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="name"
          placeholder={"Ime i prezime"}
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <input
          type="phone"
          placeholder={"+381 64..."}
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <button style={{ marginTop: "5px" }}>Izmeni informacije</button>
      </form>
    </div>
  );
}
