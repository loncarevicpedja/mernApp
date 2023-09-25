import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post";

export default function ExhibitionPage() {
  const [exhibition, setExhibition] = useState({});
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      fetch(`https://mernapp-backend-p9uv.onrender.com/exhibition/${id}`)
        .then((response) => response.json())
        .then((exhibitionData) => {
          setExhibition(exhibitionData);
        })
        .catch((error) => {
          console.error("Exhibition fetch error:", error);
        });
    }

    fetch("https://mernapp-backend-p9uv.onrender.com/post")
      .then((response) => response.json())
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((error) => {
        console.error("Posts fetch error:", error);
      });
  }, [id]);

  const filteredPosts = posts.filter((post) => post.exhibition === id);

  return (
    <div className="main">
      <div className="main-inner">
        <div className="exhibition-info">
          <h1>{exhibition.title}</h1>
          <p>{exhibition.duration}</p>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: exhibition.description }}
          />
        </div>
        <div className="post-list">
          {filteredPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
