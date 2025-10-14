import styles from "./AdminHome.module.scss";
import { FiUsers, FiBookOpen, FiLogOut, FiSearch } from "react-icons/fi";
import { ImBook } from "react-icons/im";
import HeaderAdmin from "../../../layouts/HeaderAdmin/HeaderAdmin";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { deleteStorage, getStorage } from "../../../utils/storage";
import { useEffect } from "react";

export default function AdminHome() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    deleteStorage("ad");
    navigate("/login");
  };
  useEffect(() => {
    const isAdmin = getStorage("ad");
    if (!isAdmin) {
      navigate("/dont-admin");
    }
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <NavLink
            to="/admin/user"
            className={({ isActive }) =>
              `${styles.sideBtn} ${isActive ? styles.active : ""}`
            }
          >
            <FiUsers className={styles.icon} /> Manage Users
          </NavLink>

          <NavLink
            to="/admin/entries"
            className={({ isActive }) =>
              `${styles.sideBtn} ${isActive ? styles.active : ""}`
            }
          >
            <ImBook className={styles.icon} /> Manage Entries
          </NavLink>

          <NavLink
            to="/admin/article"
            className={({ isActive }) =>
              `${styles.sideBtn} ${isActive ? styles.active : ""}`
            }
          >
            <FiBookOpen className={styles.icon} /> Manage Article
          </NavLink>

          <button onClick={handleLogOut} className={styles.sideBtn}>
            <FiLogOut className={styles.icon} /> Log out
          </button>
        </aside>
        <Outlet />
        {/* <ManagerUser /> */}
      </div>
    </div>
  );
}
