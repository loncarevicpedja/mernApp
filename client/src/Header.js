import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const url = "http://mern-app-api.vercel.app";
  useEffect(() => {
    fetch(`${url}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${url}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    window.location.href = "/";
  }

  const username = userInfo?.username;
  const name = userInfo?.name;

  return (
    <header>
      <Link to="/" className="logo">
        PUFS
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path
            fill-rule="evenodd"
            d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
      </Link>
      <nav>
        {username && username != "admin" ? (
          <>
            <Link to="/create">Ucestvujte u islozbi</Link>
            <a onClick={logout}>Odjavi se</a>
            <a className="link" href={`/profile/${userInfo.id}`}>
              <div className="span-profile">
                {username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                  style={{ width: "25px", height: "25px" }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </>
        ) : (
          ""
        )}
        {username == "admin" ? (
          <>
            <Link to="/users">Pregled korisnika</Link>
            <Link to="/exhibition">Kreiraj izlozbu</Link>
            <Link to="/news">Kreiraj vesti</Link>
            <a onClick={logout}>Odjavi se</a>
            <a className="link" href={`/profile/${userInfo.id}`}>
              <div className="span-profile">
                {username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                  style={{ width: "25px", height: "25px" }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </>
        ) : (
          ""
        )}
        {!username && (
          <>
            <Link to="/login">Prijavi se</Link>
            <Link to="/register">Registruj se</Link>
          </>
        )}
      </nav>
    </header>
  );
}
