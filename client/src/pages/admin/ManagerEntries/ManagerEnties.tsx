import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiEdit2, FiTrash2, FiSave } from "react-icons/fi";
import type { RootState, AppDispatch } from "../../../store/store";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../store/features/categorySlice";
import styles from "./ManagerEnties.module.scss";
import { toast } from "sonner";

export default function ManagerEntries() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddOrUpdate = () => {
    let check = false;
    categories.forEach((cat) => {
      if (cat.name == categoryName) {
        toast.warning("Trùng kìa, nhập ngu vậy ????");
        check = true;
      }
    });
    if (!categoryName.trim() || check) return;

    if (editingId !== null) {
      dispatch(updateCategory({ id: editingId, name: categoryName }));
      setEditingId(null);
    } else {
      dispatch(addCategory(categoryName));
    }
    setCategoryName("");
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setCategoryName(name);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ backgroundColor: "white", padding: "20px" }}>
        <h2 className={styles.title}>Manage Categories</h2>

        <div className={styles.form}>
          <label>Category Name:</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button onClick={handleAddOrUpdate}>
            {editingId !== null ? "Update" : "Add Category"}
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Category List</h3>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.empty}>
                    No categories found
                  </td>
                </tr>
              ) : (
                filtered.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(cat.id, cat.name)}
                      >
                        Sửa
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(cat.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
