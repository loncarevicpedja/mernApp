import Post from "../Post";
import { useEffect, useState } from "react";
import News from "../News";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [news, setNews] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Ovde postavljamo showAnimation na true kada komponenta prvi put mountuje
    setShowAnimation(true);
  }, []);

  useEffect(() => {
    fetch(
      "https://mern-app-lqi0cg76g-loncarevicpedja9-gmailcom.vercel.app/exhibition"
    )
      .then((response) => response.json())
      .then((data) => {
        setExhibitions(data);
      })
      .catch((error) => {
        console.error("Error fetching exhibitions:", error);
      });

    fetch(
      "https://mern-app-lqi0cg76g-loncarevicpedja9-gmailcom.vercel.app/news"
    )
      .then((response) => response.json())
      .then((n) => {
        setNews(n);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://mern-app-lqi0cg76g-loncarevicpedja9-gmailcom.vercel.app/post"
    ).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className="main-index">
      <div className={`cover ${showAnimation ? "animate" : ""}`}>
        <img src="https://ulus.rs/wp-content/uploads/2020/01/ULUS-REDAKCIJA-01.jpg" />
        <div class="text-animation">
          <p>Dobrodošli na </p>
          <p>Portal udruženja fotografa Srbije</p>
        </div>
      </div>

      <div className="all-exhibitions-header">
        <h2>Najnovije vesti</h2>
        <div className="all-exhibitions">
          {news.slice(0, 2).map((n) => (
            <News {...n} />
          ))}
          <a className="link" href={`/allnews`}>
            <div className="see-all-news">
              <p className="link">Vidi sve vesti</p>
            </div>
          </a>
        </div>
      </div>
      <div className="about-portal">
        <h1>O udruženju</h1>
        <div className="about-img-text">
          <div className="about-image">
            <img src="https://ulus.rs/wp-content/uploads/2020/03/Galerija-ULUS.jpg" />
          </div>
          <div className="about-content">
            <p>
              Portal udruženja fotografa Srbije (PUFS) je najveće i regionalno
              najstarije nacionalno reprezentativno udruženje u kulturi koje je,
              kao Udruženje likovnih umetnika (ULU), osnovano davne 1919.
              godine. Broji preko 2.500 članova, od kojih je oko 550 u statusu
              samostalnih umetnika. Prvobitni razlozi za udruživanje umetnika
              bili su okrenuti rešavanju strukovnih pitanja i pitanja statusa
              umetnika u društvu. To je bitno razlikovalo ULU od drugih
              umetničkih udruženja iz tog perioda, kao što su to na primer LADA
              iz 1904. ili Udruženje srpskih umetnika za plastičnu umetnost i
              muziku iz 1898, koja su likovne stvaraoce okupljala prema
              umetničkim afinitetima[1]. Kao strukovno udruženje umetnika koji
              deluju na teritoriji Republike Srbije, ULUS je osnovan posle
              Drugog svetskog rata, 1945. godine. Od tada, pa sve do danas,
              svoju misiju ostvaruje u zaštiti radnih i profesionalnih prava i
              interesa likovnih umetnika, obezbeđivanju njihovog boljeg
              društvenog položaja i, shodno tome, osiguravanju boljeg položaja
              umetnosti u društvu, podizanjem standarda kvaliteta umetničke
              produkcije i organizovanjem reprezentativnog umetničkog programa.
              U cilju ostvarenja svojih osnovnih ciljeva ULUS je angažovan na
              uspostavljanju saradnje sa drugim srodnim udruženjima i
              organizacijama, institutima i partnerima u zemlji i inostranstvu,
              kao i sa privrednim subjektima, fondovima i lokalnim
              institucijama. Kao reprezentativnom udruženju u kulturi, ULUS-u su
              povereni poslovi vođenja evidencije o samostalnim umetnicima od
              strane Ministarstva kulture Republike Srbije.
            </p>
          </div>
        </div>
      </div>
      <div className="posts">
        <h2>Izložbe i objave</h2>
        {exhibitions.map((exhibition) => {
          // Filtriramo objave za trenutnu izložbu
          const exhibitionPosts = posts.filter(
            (post) => post.exhibition === exhibition._id
          );

          // Proveravamo da li ima barem jedna objava za izložbu
          if (exhibitionPosts.length === 0 || !exhibition.isActual) {
            return;
          }

          return (
            <div className="exhibition-div">
              <a className="link" href={`/exhibition/${exhibition._id}`}>
                <h3>{exhibition.title}</h3>
              </a>
              <div className="post-list">
                {exhibitionPosts.slice(0, 2).map((post) => (
                  <Post key={post._id} {...post} />
                ))}
                {exhibitionPosts.length > 2 && (
                  <a className="link" href={`/exhibition/${exhibition._id}`}>
                    <div className="see-all">
                      <p className="link">Vidi sve objave za ovu izlozbu</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <div className="footer-contact">
          <h1>Kontakt</h1>
          <h4>Portal udruženja fotografa Srbije</h4>
          <h4>Umetnički pavilјon Cvijeta Zuzorić,</h4>
          <h4>Mali Kalemegdan 1, Beograd, Srbija</h4>
        </div>
        <div className="footer-map">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.949826912685!2d20.451410974851413!3d44.822586776020906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654bd3b9ab6d%3A0xd79c4eae1e882b40!2z0KPQvNC10YLQvdC40YfQutC4INC_0LDQstC40ZnQvtC9ICLQptCy0LjRmNC10YLQsCDQl9GD0LfQvtGA0LjRmyI!5e0!3m2!1ssr!2srs!4v1693590732720!5m2!1ssr!2srs"
            // width="600"
            // height="450"
            // style="border:0;"
            // allowfullscreen=""
            // loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
