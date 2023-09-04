import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Uvoz biblioteke za modalne prozore

export default function UserSearch() {
  const [searchText, setSearchText] = useState(""); // Stanje za unos teksta pretrage
  const [searchResults, setSearchResults] = useState([]); // Stanje za rezultate pretrage
  const [modalIsOpen, setModalIsOpen] = useState(false); // Stanje za prikazivanje/skrivanje modalnog prozora
  const [modalWidth, setModalWidth] = useState(400); // Početna širina modalnog prozora
  const [modalHeight, setModalHeight] = useState(200); // Početna visina modalnog prozora
  const [noResults, setNoResults] = useState(false);
  // Funkcija za otvaranje modalnog prozora
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Funkcija za zatvaranje modalnog prozora
  const closeModal = () => {
    setModalIsOpen(false);
    setSearchText("");
  };

  // Funkcija za izvršavanje pretrage korisnika
  const searchUsers = async () => {
    try {
      // Napravite API poziv za pretragu korisnika
      const response = await fetch(
        `http://localhost:4000/users/search?name=${searchText}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setSearchResults(data); // Postavljanje rezultata pretrage
          calculateModalSize(data.length); // Računanje veličine modalnog prozora
          openModal(); // Otvaranje modalnog prozora kada postoje rezultati
        }
      } else {
        console.error("Greška prilikom pretrage korisnika.");
      }
    } catch (error) {
      console.error("Greška prilikom pretrage korisnika:", error);
    }
  };

  // Funkcija za dinamičko računanje veličine modalnog prozora
  const calculateModalSize = (resultCount) => {
    const maxWidth = 600; // Maksimalna širina modalnog prozora
    const maxHeight = 400; // Maksimalna visina modalnog prozora
    const minWidth = 300; // Minimalna širina modalnog prozora
    const minHeight = 100; // Minimalna visina modalnog prozora
    const width = Math.min(maxWidth, minWidth + resultCount * 50); // Računanje širine
    const height = Math.min(maxHeight, minHeight + resultCount * 30); // Računanje visine
    setModalWidth(width);
    setModalHeight(height);
  };

  useEffect(() => {
    // Prilikom promene širine i visine modalnog prozora, postavite ih
    Modal.setAppElement("body"); // Postavite element aplikacije za pristupibilnost
  }, []);

  return (
    <div className="user-search">
      <div className="search-input-btn">
        <input
          type="text"
          placeholder="Pretraži korisnike..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={searchUsers}>Pretraži</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rezultati pretrage"
        style={{
          content: {
            width: `${modalWidth}px`, // Postavljanje širine modalnog prozora
            height: `${modalHeight}px`, // Postavljanje visine modalnog prozora
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <div className="search-results">
          {searchResults.length ? (
            searchResults.map((user) => (
              <div key={user._id} className="search-result">
                <a href={`/profile/${user._id}`}>{user.name}</a>
              </div>
            ))
          ) : (
            <div className="search-result">
              Nema rezultata za unete vrednosti...
            </div>
          )}
          <button className="close-button" onClick={closeModal}>
            Zatvori
          </button>
        </div>
      </Modal>
    </div>
  );
}
