import styles from "./AdminHome.module.scss";
import { FiUsers, FiBookOpen, FiLogOut, FiSearch } from "react-icons/fi";
import { ImBook } from "react-icons/im";
import HeaderAdmin from "../../../layouts/HeaderAdmin/HeaderAdmin";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { deleteStorage, getStorage } from "../../../utils/storage";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AdminHome() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Do you want to log out?",
      text: "Log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      deleteStorage("ad");
      navigate("/login");
    }
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
