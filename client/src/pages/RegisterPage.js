import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function register(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Nova lozinka i potvrda nove lozinke se ne podudaraju.");
      return;
    }

    const response = await fetch(
      "https://mernapp-backend-p9uv.onrender.com/register",
      {
        method: "POST",
        body: JSON.stringify({ username, password, phone, name }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      setSuccessMessage(data.message);
      setName("");
      setPassword("");
      setUsername("");
      setPhone("");
      setConfirmPassword("");
      window.location.href = "/login";
    } else {
      setErrorMessage("Neuspela registracija!");
    }
  }

  return (
    <div className="main-register">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form className="register" onSubmit={register}>
        <h1>Registruj se</h1>
        <label>Ime i prezime:</label>
        <input
          type="text"
          placeholder="Ime i prezime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Broj telefona:</label>
        <input
          type="text"
          placeholder="Broj telefona (+381 6...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>E-mail:</label>
        <input
          type="text"
          placeholder="E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Lozinka:</label>
        <input
          type={showPasswords ? "text" : "password"}
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Potvrdi lozinku:</label>
        <input
          type={showPasswords ? "text" : "password"}
          placeholder="Potvrdi lozinku"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label>
          Prikazi lozinke:
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
        </label>
        <button>Registruj se</button>
      </form>
    </div>
  );
}
