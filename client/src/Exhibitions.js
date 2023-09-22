import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Exhibition({
  _id,
  title,
  duration,
  description,
  isActual,
}) {
  function DeleteExhibition(id) {
    fetch(`https://mernapp-backend-p9uv.onrender.com/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert("Izlozba je uspesno obrisana");
          window.location.href = "/exhibition";
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

  function EndExhibition(id) {
    fetch(`https://mernapp-backend-p9uv.onrender.com/endexibition/${id}`)
      .then((response) => response.json())
      .then((exInfo) => {
        console.log(exInfo);
        window.location.href = "/exhibition";
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }

  return (
    <div className="exhibition">
      <h4 className="">{title}</h4>
      <p>{isActual ? "Aktivna" : "Zavrsena"}</p>
      <p>{duration}</p>
      <a className="link" href={`/exhibition/${_id}`}>
        <p className="link">Vidi sve objave za ovu izlozbu</p>
      </a>
      <div className="edit-button-div">
        <Link className="edit-btn-link" onClick={() => EndExhibition(_id)}>
          Zakljuci izlozbu
        </Link>
      </div>
      <div className="edit-button-div">
        <Link className="edit-btn-link" onClick={() => DeleteExhibition(_id)}>
          Obrisi izlozbu
        </Link>
      </div>
    </div>
  );
}
