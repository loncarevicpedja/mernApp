import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function News() {
  const [newsInfo, setNewsInfo] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id != null) {
      fetch(`https://mernapp-backend-p9uv.onrender.com/news/${id}`).then(
        (response) => response.json().then((n) => setNewsInfo(n))
      );
    }
  }, []);

  if (!newsInfo) return "";

  return (
    <div className="post-page">
      <h1>{newsInfo.title}</h1>
      <time>{formatISO9075(new Date(newsInfo.createdAt))}</time>
      <div className="image">
        <img
          src={`https://mernapp-backend-p9uv.onrender.com/${newsInfo.cover}`}
          alt=""
        />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: newsInfo.content }}
      />
    </div>
  );
}
