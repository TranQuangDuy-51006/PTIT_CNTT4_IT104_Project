import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineUpload } from "react-icons/hi";
import Button from "../Button/Button";
import styles from "./ModalAdd.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { addArticle, updateArticle } from "../../store/features/articleSlice";
import { fetchCategories } from "../../store/features/categorySlice";
import type { RootState, AppDispatch } from "../../store/store";
import type { Article } from "../../utils/types";
import { uploadToCloudinary } from "../../service/uploadService";

type ModalAddProps = {
  onClose: () => void;
  editingArticle?: Article | null;
};

const moodList = [
  {
    id: 1,
    name: "Normal",
  },
  {
    id: 2,
    name: "Sad",
  },
  {
    id: 3,
    name: "Happy",
  },
  {
    id: 4,
    name: "Aonhay",
  },
];

export default function ModalAdd({ onClose, editingArticle }: ModalAddProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.category);
  const isLogin = JSON.parse(localStorage.getItem("user") || "null");

  const [formData, setFormData] = useState<Article>({
    userId: isLogin.id,
    title: "",
    content: "",
    mood: "",
    status: "public",
    image: "",
    date: new Date().toISOString(),
    entryId: undefined,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingArticle) {
      setFormData(editingArticle);
    }
  }, [editingArticle]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
      toast.success("Ảnh đã được tải lên thành công ");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Tải ảnh lên thất bại ");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Vui lòng nhập tiêu đề!");
    if (!formData.content.trim()) return toast.error("Vui lòng nhập nội dung!");
    if (!formData.mood.trim()) return toast.error("Vui lòng nhập tâm trạng!");
    if (!formData.entryId)
      return toast.error("Vui lòng chọn danh mục bài viết!");
    if (!formData.image) return toast.error("Vui lòng tải lên ảnh!");

    try {
      const articleToSubmit = {
        ...formData,
        date: new Date().toISOString(),
      };

      if (editingArticle) {
        await dispatch(updateArticle(articleToSubmit)).unwrap();
        toast.success(" Bài viết đã được cập nhật thành công");
      } else {
        await dispatch(addArticle(articleToSubmit)).unwrap();
        toast.success(" Bài viết đã được thêm thành công");
      }

      onClose();
    } catch (err) {
      console.error("Submit article failed:", err);
      toast.error("Không thể lưu bài viết, vui lòng thử lại!");
    }
  };

  let checkStatus = editingArticle?.status == "public" ? true : false;

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{editingArticle ? " Edit Article" : " Add New Article"}</h3>
          <IoCloseCircleOutline
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Article Categories:</label>
            <select
              name="entryId"
              value={formData.entryId || ""}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Mood:</label>
            <select name="mood" onChange={handleChange} value={formData.mood}>
              {moodList.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <label>Status:</label>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="status"
                  value="public"
                  checked={formData.status === "public"}
                  onChange={handleChange}
                />
                <label style={{ marginLeft: "4px" }}>Public</label>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="status"
                  value="private"
                  checked={formData.status === "private"}
                  onChange={handleChange}
                />
                <label style={{ marginLeft: "4px" }}>Private</label>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div className={styles.uploadBox}>
              <HiOutlineUpload className={styles.uploadIcon} />
              <p>Browse and choose files to upload</p>
              <input
                type="file"
                className={styles.fileInput}
                accept="image/*"
                onChange={handleFileChange}
              />
              {uploading && <p> Uploading...</p>}
            </div>
            {formData.image && (
              <div className={styles.preview}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </div>
            )}
          </div>

          <div className={styles.btnContainer}>
            <Button success>
              {uploading ? "..." : editingArticle ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
