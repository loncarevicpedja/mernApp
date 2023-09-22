import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Dodali smo stanje za onemogućavanje submit dugmeta

  // Funkcija za proveru popunjenosti polja
  const checkFields = () => {
    if (username && password) {
      setIsSubmitDisabled(false); // Ako su sva polja popunjena, omogućiti submit
    } else {
      setIsSubmitDisabled(true); // Ako bilo koje polje nije popunjeno, onemogućiti submit
    }
  };

  // Proveriti polja kada se promene
  useEffect(() => {
    checkFields();
  }, [username, password]);

  async function login(e) {
    e.preventDefault();
    if (!username || !password) {
      alert("Morate popuniti sva polja pre nego što se prijavite.");
      return;
    }
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Pogrešni podaci za prijavu");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login-div">
      <div className="inner-login-div">
        <form className="login" onSubmit={login}>
          <h1>Prijavi se</h1>
          <input
            type="text"
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Onemogućiti submit ako nisu popunjena sva polja */}
          <button disabled={isSubmitDisabled}>Prijavi se</button>
        </form>
      </div>
    </div>
  );
}
