import React, { useEffect, useState } from "react";
import styles from "./ManagerArticle.module.scss";
import Pagination from "../../../components/Pagination/Pagination";
import ModalAdd from "../../../components/ModalAdd/ModalAdd";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchArticles,
  deleteArticle,
  updateArticle,
} from "../../../store/features/articleSlice";
import { fetchCategories } from "../../../store/features/categorySlice";
import { toast } from "sonner";
import Swal from "sweetalert2";
import type { Article } from "../../../utils/types";

export default function ManagerArticle() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.article);
  const { categories } = useAppSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    const article = articles.find((a) => a.id === id);
    if (!article) return;

    try {
      await dispatch(
        updateArticle({ ...article, status: newStatus as "public" | "private" })
      ).unwrap();
      toast.success("Status updated successfully!");
    } catch {
      toast.error("Error updating status!");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteArticle(id)).unwrap();
        toast.success("Post deleted!");

        const totalPagesAfterDelete = Math.ceil(
          (articles.length - 1) / itemsPerPage
        );
        if (currentPage > totalPagesAfterDelete) {
          setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
      } catch {
        toast.error("Error deleting post!");
      }
    }
  };

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const openAddModal = () => {
    setEditingArticle(null);
    setShowModal(true);
  };

  const openEditModal = (article: Article) => {
    setEditingArticle(article);
    setShowModal(true);
  };

  const getCategoryName = (entryId?: number) => {
    const category = categories.find((c) => c.id === entryId);
    return category ? category.name : "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.btnAdd} onClick={openAddModal}>
          Thêm mới bài viết
        </button>
        <h2>Quản lý bài viết</h2>
      </div>

      {loading ? (
        <p>Đang tải bài viết...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tiêu đề</th>
              <th>Chủ đề</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th>Chỉnh sửa trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.length > 0 ? (
              currentArticles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{article.title}</td>
                  <td>{getCategoryName(article.entryId)}</td>
                  <td>{article.content}</td>
                  <td>
                    <span
                      className={
                        article.status === "public"
                          ? styles.public
                          : styles.private
                      }
                    >
                      {article.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={article.status}
                      onChange={(e) =>
                        handleStatusChange(article.id!, e.target.value)
                      }
                      className={styles.select}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.btnEdit}
                      onClick={() => openEditModal(article)}
                    >
                      Sửa
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(article.id!)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {showModal && (
        <ModalAdd
          onClose={() => {
            setShowModal(false);
            setEditingArticle(null);
          }}
          editingArticle={editingArticle}
        />
      )}
    </div>
  );
}
