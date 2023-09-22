import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [exhibitions, setExhibitions] = useState([]);
  useEffect(() => {
    fetch("https://mernapp-backend-p9uv.onrender.com/exhibition").then(
      (response) => {
        response.json().then((exhibition) => {
          setExhibitions(exhibition);
          console.log(exhibition);
        });
      }
    );
  }, []);

  useEffect(() => {
    if (id != null) {
      fetch("https://mernapp-backend-p9uv.onrender.com/" + id)
        .then((response) => response.json())
        .then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setExhibition(postInfo.exhibition);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, []);
  async function updatePost(ev) {
    console.log(exhibition);
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    data.set("exhibition", exhibition);
    const response = await fetch(
      "https://mernapp-backend-p9uv.onrender.com/post",
      {
        method: "PUT",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="main-create">
      <h1>Izmeni objavu</h1>
      <form className="login" onSubmit={updatePost}>
        <select
          onChange={(e) => {
            setExhibition(e.target.value);
          }}
          value={exhibition}
        >
          <option>Izaberite izložbu...</option>
          {exhibitions.map((ex) => (
            <option value={ex._id}>{ex.title}</option>
          ))}
        </select>
        <input
          type="title"
          placeholder={"Naslov"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Rezime"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Izmeni objavu</button>
      </form>
    </div>
  );
}
