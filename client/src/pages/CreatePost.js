import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [exhibitions, setExhibitions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/exhibition").then((response) => {
      response.json().then((exhibition) => {
        setExhibitions(exhibition);
        console.log(exhibition);
      });
    });
  }, []);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [exhibition, setExhibition] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [files, setFiles] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Dodali smo stanje za onemogućavanje submit dugmeta

  // Funkcija za proveru popunjenosti polja
  const checkFields = () => {
    if (title && summary && content && exhibition && files[0]) {
      setIsSubmitDisabled(false); // Ako su sva polja popunjena, omogućiti submit
    } else {
      setIsSubmitDisabled(true); // Ako bilo koje polje nije popunjeno, onemogućiti submit
    }
  };

  useEffect(() => {
    checkFields(); // Proveriti polja kada se stanje promeni
  }, [title, summary, content, exhibition, files]);

  async function createNewPost(ev) {
    if (!title || !summary || !content || !exhibition || !files[0]) {
      alert("Morate popuniti sva polja pre nego što kreirate objavu.");
      return;
    }
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("exhibition", exhibition);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="main-create">
      <h1>Kreiraj objavu</h1>
      <form className="login" onSubmit={createNewPost}>
        <select
          onChange={(e) => {
            setExhibition(e.target.value);
            console.log(e.target.value);
          }}
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
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder={"Rezime"}
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <Editor value={content} onChange={setContent} />
        {/* Onemogućiti submit ako nisu popunjena sva polja */}
        <button style={{ marginTop: "5px" }} disabled={isSubmitDisabled}>
          Kreiraj objavu
        </button>
      </form>
    </div>
  );
}
