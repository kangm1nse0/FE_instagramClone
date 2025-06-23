import React, { useEffect, useState } from "react";
import { fetchImages } from "../api";
import { useNavigate } from "react-router-dom";
import "./Feed.css";

function Feed() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages()
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="feedpage">
      <div className="feedin">
        <div className="feedprofile">
          <img
            src="/lion.png"
            alt="logo"
            className="logo"
          />
          <div className="feedprofiletext">
            <h2 className="feedtitle">likeLion_13th_frontend</h2>
            <div className="feeddesc">
              멋쟁이사자처럼 13기 여러분 화이팅! 
            </div>
            <div className="pagecount">게시물: {images.length}개</div>
          </div>
        </div>
        <div className="pagegrid">
          {images.map((img) => (
            <div
              key={img.id}
              className="feedcard"
              onClick={() => navigate(`/image/${img.id}`)}
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="cardimg"
              />
              <h3 className="cardtitle">{img.title}</h3>
              <p className="cardcontent">{img.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;