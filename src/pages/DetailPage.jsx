import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchImageDetail,
  fetchComments,
  postComment,
  deleteComment,
} from "../api";
import CommentList from "../components/Comment";
import CommentForm from "../components/CommentWrite";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const img = await fetchImageDetail(id);
        const comm = await fetchComments(id);
        setImage(img);
        setComments(comm);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubmit = async (content) => {
    try {
      await postComment(id, content);
      const comm = await fetchComments(id);
      setComments(comm);
    } catch (err) {
      alert("작성 실패: " + err.message);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      const comm = await fetchComments(id);
      setComments(comm);
    } catch (err) {
      alert("삭제 실패: " + err.message);
    }
  };

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>에러: {error}</div>;
  

  return (
    <div className="detail">
      <div className="detailin">
        <h2 className="detailtitle">{image.title}</h2>
        <img
          src={image.image_url}
          alt={image.title}
          className="detailimage"
        />

        <p className="detailcontent">{image.content}</p>

  
        <div className="detailcommentbox">
          <div className="detailcommentcount">
            댓글: {comments.length}개
          </div>
          <CommentForm onSubmit={handleSubmit} />
        </div>

        
        <CommentList comments={comments} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default DetailPage;