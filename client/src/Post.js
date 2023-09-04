import { formatISO9075 } from "date-fns";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  likes,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const { userInfo } = useContext(UserContext);
  const userId = userInfo.id ? userInfo.id : null;
  const url = "http://localhost:4000";
  useEffect(() => {
    if (userId != null) {
      likes.forEach((like) => {
        if (like === userId) {
          setIsLiked(true);
        }
        setNumLikes(likes.length);
      });
    }
  }, []);
  function Like() {
    const postId = _id;
    fetch(`${url}/${postId}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLiked(true);
        console.log(data);
        setNumLikes(data.message);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  }
  function Dislike() {
    const postId = _id; // Promenjeno ovde
    fetch(`${url}/${postId}`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLiked(false);
        console.log(data.message);
        setNumLikes(data.message);
      })
      .catch((error) => {
        console.error("Error disliking post:", error);
      });
  }

  function DeletePost(e) {
    e.preventDefault();
    const id = _id;
    console.log(id);
    fetch(`${url}/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
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

  return (
    <div className="post">
      <div className="title">
        <Link className="edit-btn-link-global" to={`/profile/${author._id}`}>
          <a className="author">{author.username}</a>
        </Link>
        {userInfo.username == "admin" || userInfo._id == author._id ? (
          <p className="delete-button" onClick={DeletePost}>
            X
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="image-post">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt=""></img>
        </Link>
      </div>
      <div className="texts">
        {userId != null ? (
          <div className="like">
            {!isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
                style={{ width: "30px", height: "30px" }}
                onClick={Like}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
                style={{ width: "30px", height: "30px", color: "red" }}
                onClick={Dislike}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            )}
            <p>{numLikes}</p>
          </div>
        ) : (
          <Link to="/login">Prijavite se da bi glasali!</Link>
        )}
        <Link to={`/post/${_id}`}>
          <h4> {title}</h4>
        </Link>
        <div className="opis-vreme">
          {/* <p className="summary">{summary}</p> */}
          <p className="info">
            <time>
              {formatISO9075(new Date(createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </p>
        </div>
      </div>
    </div>
  );
}
