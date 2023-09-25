import { useEffect, useState } from "react";
import News from "../News";

export default function AllNews() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("https://mernapp-backend-p9uv.onrender.com/news")
      .then((response) => response.json())
      .then((n) => {
        setNews(n);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);
  return (
    <div className="all-news-main">
      <div className="all-exhibitions-header">
        <h2>Vesti</h2>
        <div className="all-exhibitions">
          {news.map((n) => (
            <News {...n} />
          ))}
        </div>
      </div>
    </div>
  );
}
