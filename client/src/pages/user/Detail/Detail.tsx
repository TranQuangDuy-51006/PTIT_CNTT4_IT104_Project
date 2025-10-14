import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./Detail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchArticles } from "../../../store/features/articleSlice";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import user1 from "../../../assets/img/img1.png";
import user2 from "../../../assets/img/img1.png";

export default function Detail() {
  const [showAllComments, setShowAllComments] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.article);

  // 🔹 Lấy danh sách bài viết nếu chưa có
  useEffect(() => {
    if (!articles || articles.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles]);

  // 🔹 Tìm bài viết theo id (so sánh chuỗi để tránh lỗi)
  const article = articles.find((a) => a.id?.toString() === id);

  const comments = [
    {
      id: 1,
      user: "Lina",
      avatar: user1,
      text: "Very good!",
      likes: 15,
      replies: 6,
    },
    {
      id: 2,
      user: "Rikke",
      avatar: user2,
      text: "Hello Rikke!!",
      likes: 10,
      replies: 3,
    },
  ];

  const handleBack = () => navigate(-1);

  return (
    <div>
      <Header />
      <section className={styles.detailPage}>
        <button onClick={handleBack} className={styles.backBtn}>
          <IoIosArrowBack />
        </button>

        {loading ? (
          <p className={styles.loading}>Loading article...</p>
        ) : article ? (
          <div className={styles.article}>
            <div className={styles.authorRow}>
              <img src={user1} alt="author" className={styles.avatar} />
              <div>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.content}>{article.content}</p>
              </div>
            </div>

            <div className={styles.actions}>
              <span>
                <FaRegHeart /> 0 Like
              </span>
              <span>
                <FaRegCommentDots /> 0 Replies
              </span>
            </div>
          </div>
        ) : (
          <p className={styles.notFound}>Article not found!</p>
        )}

        {/* Bình luận */}
        <div className={styles.commentSection}>
          <button
            className={styles.viewBtn}
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Hide comments" : "View all 2 comments"}
          </button>

          {showAllComments && (
            <div className={styles.commentList}>
              {comments.map((c) => (
                <div className={styles.comment} key={c.id}>
                  <img
                    src={c.avatar}
                    alt={c.user}
                    className={styles.commentAvatar}
                  />
                  <div className={styles.commentBody}>
                    <p className={styles.commentText}>{c.text}</p>
                    <div className={styles.commentActions}>
                      <span>
                        <FaRegHeart /> {c.likes} Like
                      </span>
                      <span>
                        <FaRegCommentDots /> {c.replies} Replies
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
