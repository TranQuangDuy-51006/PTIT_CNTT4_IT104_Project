import React, { useState, useEffect } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import imgLogin from "../../../assets/img/LoginImg.png";
import Button from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginUser } from "../../../store/features/loginSlice";
import { toast } from "sonner";
import styles from "./Login.module.scss";
import { getStorage, setStorage } from "../../../utils/storage";

const label = {
  email: "Email address",
  password: "Password",
};

const admin = {
  email: "admin",
  pass: "123456",
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error, loading } = useAppSelector((state) => state.login);
  const isLogin = getStorage("user");

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(label);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: any = {};
    let hasError = false;

    if (!data.email.trim()) {
      newMsg.email = "Email không được để trống";
      hasError = true;
    } else newMsg.email = label.email;

    if (!data.password.trim()) {
      newMsg.password = "Mật khẩu không được để trống";
      hasError = true;
    } else newMsg.password = label.password;

    setMessage(newMsg);

    if (hasError) {
      return;
    }

    if (data.email === admin.email && data.password === admin.pass) {
      toast.success("Đăng nhập thành công!");
      setStorage("ad", admin);
      navigate("/admin/user");
      return;
    }

    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (isLogin) {
      toast.success("Đăng nhập thành công!");
      if (user?.email === admin.email && data.password === data.password) {
        navigate("/admin/user");
      } else {
        navigate("/");
      }
    }
  }, [isLogin, navigate, data.password]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.imageBox}>
          <img src={imgLogin} alt="Login" />
        </div>

        <div className={styles.formBox}>
          <h3 className={styles.title}>Login</h3>

          <div className={styles.socialLogin}>
            <span>Sign in with</span>
            <div className={styles.icons}>
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
            </div>
          </div>

          <div className={styles.or}>Or</div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="email"
                placeholder="Enter a valid email address"
                value={data.email}
                onChange={handleChange}
              />
              <label
                className={`${styles.label} ${
                  message.email !== label.email ? styles.errorLabel : ""
                }`}
              >
                {message.email}
              </label>
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
              />
              <label
                className={`${styles.label} ${
                  message.password !== label.password ? styles.errorLabel : ""
                }`}
              >
                {message.password}
              </label>
            </div>

            <Button primary maxcontent>
              {loading ? "Đang đăng nhập..." : "Login"}
            </Button>
          </form>

          <p className={styles.registerText}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register
            </Link>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>Copyright © 2025. All rights reserved.</span>
        <div className={styles.footerIcons}>
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
          <FaGoogle />
        </div>
      </footer>
    </div>
  );
}
