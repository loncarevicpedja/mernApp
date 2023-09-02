import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function VerificationPage() {
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const value = parts[parts.length - 1];
  useEffect(() => {
    fetch(`http://localhost:4000/verify/${value}`)
      .then((response) => response.json())
      .then((postInfo) => {
        console.log(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, []);
  return (
    <div>
      <h1>Uspesno ste verifikovani</h1>
    </div>
  );
}
