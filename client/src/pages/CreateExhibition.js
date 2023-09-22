import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import Exhibition from "../Exhibitions";

export default function CreateExhibition() {
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

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Dodali smo stanje za onemogućavanje submit dugmeta

  // Funkcija za proveru popunjenosti polja
  const checkFields = () => {
    if (title && duration && description) {
      setIsSubmitDisabled(false); // Ako su sva polja popunjena, omogućiti submit
    } else {
      setIsSubmitDisabled(true); // Ako bilo koje polje nije popunjeno, onemogućiti submit
    }
  };

  useEffect(() => {
    checkFields(); // Proveriti polja kada se stanje promeni
  }, [title, duration, description]);

  async function createNewExhibition(ev) {
    ev.preventDefault();
    const response = await fetch(
      "https://mernapp-backend-p9uv.onrender.com/exhibition",
      {
        method: "POST",
        body: JSON.stringify({ title, duration, description }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      setRedirect(true);
      window.location.href = "/exhibition";
    } else {
      alert("Registration failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/exhibition"} />;
  }
  return (
    <div className="main-creating-exhbition">
      <div className="creating-exhibition">
        <h2>Kreiraj izlozbu</h2>
        <form onSubmit={createNewExhibition}>
          <input
            type="title"
            placeholder="Naziv izlozbe"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="date"
            placeholder="Trajanje izlozbe"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
          <Editor value={description} onChange={setDescription} />
          {/* Onemogućiti submit ako nisu popunjena sva polja */}
          <button style={{ marginTop: "5px" }} disabled={isSubmitDisabled}>
            Kreiraj izlozbu
          </button>
        </form>
      </div>
      <div className="all-exhibitions-header">
        <h2>Sve izlozbe</h2>
        <div className="all-exhibitions">
          {exhibitions.map((e) => (
            <Exhibition {...e} />
          ))}
        </div>
      </div>
    </div>
  );
}
