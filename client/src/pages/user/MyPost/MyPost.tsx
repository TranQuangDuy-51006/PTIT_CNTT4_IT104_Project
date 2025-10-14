import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchArticles } from "../../../store/features/articleSlice";
import { fetchCategories } from "../../../store/features/categorySlice";

import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import CardPost from "../../../components/CardPost/CardPost";
import Pagination from "../../../components/Pagination/Pagination";
import ModalAdd from "../../../components/ModalAdd/ModalAdd";

import styles from "./MyPost.module.scss";
import type { Article } from "../../../utils/types";

export default function MyPost() {
  const dispatch = useAppDispatch();
  const { articles, loading: articleLoading } = useAppSelector(
    (state) => state.article
  );
  const { categories, loading: categoryLoading } = useAppSelector(
    (state) => state.category
  );
  const { keyword } = useAppSelector((state) => state.search);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const itemsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchCategories());
  }, [dispatch]);

  // 🔹 Reset phân trang khi dữ liệu hoặc từ khóa thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [articles, keyword]);

  // 🔹 Lấy tên danh mục
  const getCategoryName = (id?: number) => {
    const found = categories.find((c) => c.id === id);
    return found ? found.name : "Uncategorized";
  };

  // 🔹 Lọc bài viết theo user hiện tại + keyword
  const userArticles = articles.filter(
    (a) =>
      a.userId === user.id &&
      (!keyword ||
        a.title.toLowerCase().includes(keyword.toLowerCase()) ||
        a.content.toLowerCase().includes(keyword.toLowerCase()))
  );

  // 🔹 Tính toán phân trang
  const totalPages = Math.ceil((userArticles?.length || 0) / itemsPerPage);
  const safeCurrentPage =
    currentPage > totalPages ? totalPages || 1 : currentPage;

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const currentPosts = userArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔹 Mở modal sửa bài viết
  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setShowModal(true);
  };

  // 🔹 Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingArticle(null);
  };

  return (
    <div>
      <Header />

      <section className={styles.allBlogs}>
        <div className={styles.boxBtn}>
          <button
            className={styles.btnAdd}
            onClick={() => {
              setEditingArticle(null);
              setShowModal(true);
            }}
          >
            ADD NEW ARTICLE
          </button>
        </div>

        {(articleLoading || categoryLoading) && <p>Loading articles...</p>}

        {!articleLoading && currentPosts.length > 0 && (
          <div className={styles.blogCards}>
            {currentPosts.map((post) => (
              <CardPost
                key={post.id}
                id={String(post.id)}
                image={post.image || "/default.jpg"}
                date={post.date}
                title={post.title}
                desc={post.content}
                category={getCategoryName(post.entryId)}
                categoryColor="blue"
                edit
                onEdit={() => handleEdit(post)}
              />
            ))}
          </div>
        )}

        {!articleLoading && userArticles.length === 0 && (
          <p className={styles.noResult}>
            {keyword
              ? "No articles match your search."
              : "You haven't posted any articles yet."}
          </p>
        )}

        {/* {totalPages > 1 && ( */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {/* )} */}
      </section>

      <Footer />

      {showModal && (
        <ModalAdd onClose={handleCloseModal} editingArticle={editingArticle} />
      )}
    </div>
  );
}
