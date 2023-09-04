import { formatISO9075 } from "date-fns";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function News({
  content,
  cover,
  createdAt,
  summary,
  title,
  _id,
}) {
  const { userInfo } = useContext(UserContext);
  const username = userInfo.username ? userInfo.username : null;
  const url = "http://localhost:4000";
  function DeleteNews(e) {
    e.preventDefault();
    const id = _id;
    console.log(id);
    fetch(`${url}/deletenews/${_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/news";
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
    <div className="news">
      <div className="news-image">
        <Link to={`/news/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt=""></img>
        </Link>
      </div>
      <div className="news-content">
        <div className="news-content-inner">
          <div className="title-delete">
            <Link to={`/news/${_id}`} className="edit-btn-link-global">
              <h2 className="news-title"> {title}</h2>
            </Link>
            {username == "admin" ? (
              <p className="delete-button" onClick={DeleteNews}>
                X
              </p>
            ) : (
              ""
            )}
          </div>
          {/* <p className="summary">{summary}</p> */}
        </div>
        <p className="info">
          <time>{formatISO9075(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
      </div>
    </div>
  );
}
