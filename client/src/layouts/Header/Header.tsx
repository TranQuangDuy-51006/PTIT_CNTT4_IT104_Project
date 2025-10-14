import React, { useState } from "react";
import logo from "../../assets/img/Logo.png";
import styles from "./Header.module.scss";
import Button from "../../components/Button/Button";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { deleteStorage, getStorage } from "../../utils/storage";
import { useAppDispatch } from "../../store/hooks";
import { setKeyword } from "../../store/features/searchSlice";

export default function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(getStorage("user"));
  const [drop, setDrop] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDrop = () => {
    setDrop(drop === "none" ? "block" : "none");
  };

  const handleLogOut = () => {
    setIsLogin("");
    deleteStorage("user");
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setKeyword(searchTerm.trim()));
  };

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <img src={logo} alt="logo" />
        <span>RIKKEI_EDU _BLOG</span>
      </div>

      <form
        className={`${styles.flex} ${styles.inputSearch}`}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" style={{ background: "none", border: "none" }}>
          <IoSearchOutline size={18} />
        </button>
      </form>

      {isLogin ? (
        <div className={styles.setting}>
          <img
            className={styles.avt}
            onClick={handleDrop}
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png"
            alt=""
          />
          <div className={styles.menu} style={{ display: drop }}>
            <div style={{ display: "flex" }}>
              <img
                className={styles.avt}
                src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png"
                alt=""
              />
              <div>
                <p>{isLogin.firstName + " " + isLogin.lastName}</p>
                <p>{isLogin.email}</p>
              </div>
            </div>
            <ul className={styles.menuBox}>
              <li>View profile</li>
              <li>Update profile picture</li>
              <li>Change password</li>
              <li onClick={handleLogOut}>Log out</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <Button bd_gray href="/login">
            Sign Up
          </Button>
          <Button bd_gray href="/register">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}
