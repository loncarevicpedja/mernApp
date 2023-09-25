import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChangePassword() {
  const { id } = useParams();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [showPasswords, setShowPasswords] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Nova lozinka i potvrda nove lozinke se ne podudaraju.");
      return;
    }

    const response = await fetch(
      `https://mernapp-backend-p9uv.onrender.com/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setErrorMessage(data.error);
    }
  };

  return (
    <div className="main-create">
      <h1>Promena lozinke</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form className="login" onSubmit={handleChangePassword}>
        <label>Trenutna lozinka:</label>
        <input
          type={showPasswords ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <label>Nova lozinka:</label>
        <input
          type={showPasswords ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label>Potvrdi novu lozinku:</label>
        <input
          type={showPasswords ? "text" : "password"}
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <label>
          Prikazi lozinke:
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
        </label>
        <button type="submit">Promeni lozinku</button>
      </form>
    </div>
  );
}
