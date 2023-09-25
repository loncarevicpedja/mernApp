import User from "../User";
import { useState, useEffect } from "react";

export default function AllUSers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://mernapp-backend-p9uv.onrender.com/users").then(
      (response) => {
        response.json().then((u) => {
          setUsers(u);
        });
      }
    );
  }, []);
  return (
    <div className="all-users-main">
      <div className="all-users-inner">
        <h1>Svi korisnici</h1>
        <div className="all-exhibitions">
          {users.length > 0 && users.map((user) => <User {...user} />)}
        </div>
      </div>
    </div>
  );
}
