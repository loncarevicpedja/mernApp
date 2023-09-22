import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import News from "../News";

export default function CreateNews() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("https://mernapp-backend-p9uv.onrender.com/news").then((response) => {
      response.json().then((n) => {
        setNews(n);
        console.log(news);
      });
    });
  }, []);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Dodali smo stanje za onemogućavanje submit dugmeta

  // Funkcija za proveru popunjenosti polja
  const checkFields = () => {
    if (title && summary && content) {
      setIsSubmitDisabled(false); // Ako su sva polja popunjena, omogućiti submit
    } else {
      setIsSubmitDisabled(true); // Ako bilo koje polje nije popunjeno, onemogućiti submit
    }
  };

  useEffect(() => {
    checkFields(); // Proveriti polja kada se stanje promeni
  }, [title, summary, content]);

  async function createNewNews(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    const response = await fetch(
      "https://mernapp-backend-p9uv.onrender.com/news",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );
    if (response.ok) {
      window.location.href = "/news";
    } else {
      alert("Neuspelo kreiranje vesti");
    }
  }
  return (
    <div className="create-exhibition-main">
      <div className="creating-exhibition">
        <h2>Kreiraj novu vest</h2>
        <form onSubmit={createNewNews}>
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
            Kreiraj vest
          </button>
        </form>
      </div>
      <div className="all-exhibitions-header">
        <h2>Sve vesti</h2>
        <div className="all-exhibitions">
          {news.map((n) => (
            <News {...n} />
          ))}
        </div>
      </div>
    </div>
  );
}
