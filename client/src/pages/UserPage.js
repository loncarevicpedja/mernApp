import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import Post from "../Post";

export default function UserPage() {
  const { userInfo } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  function DeleteUser(id) {
    fetch(`http://localhost:4000/deleteuser/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("Korisnik je uspesno obrisan");
          window.location.href = "/users";
        } else {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    fetch(`http://localhost:4000/profile/${id}`)
      .then((response) => response.json())
      .then((u) => {
        setUser(u);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/post`)
      .then((res) => res.json())
      .then((post) => {
        setPosts(post);
      });
  }, []);

  const filteredPosts = posts.filter((post) => post.author._id == id);

  return (
    <div className="main">
      <div className="inner-main">
        <div className="profile-information">
          <div className="user-information">
            <p>Ime: {user.name}</p>
            <p>E-mail: {user.username}</p>
            <p>Broj telefona: {user.phone}</p>
            <p>Broj aktuelnih objava: {filteredPosts.length}</p>
          </div>
          <div className="post-user">
            {userInfo.id === user._id && (
              <div className="edit-row">
                <Link className="edit-btn" to={`/user/${user._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Izmeni profil
                </Link>
              </div>
            )}
            {userInfo.id === user._id && (
              <div className="edit-row">
                <Link className="edit-btn" to={`/changepassword/${user._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Izmeni lozinku
                </Link>
              </div>
            )}
            {userInfo.username == "admin" && (
              <div className="edit-row">
                <Link className="edit-btn" onClick={() => DeleteUser(user._id)}>
                  Obrisi korisnika
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="post-list">
          {filteredPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
