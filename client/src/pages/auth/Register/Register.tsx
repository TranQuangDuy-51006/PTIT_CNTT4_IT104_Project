import styles from "./Register.module.scss";
import img1 from "../../../assets/img/regImg.png";
import img2 from "../../../assets/img/regImg2.png";
import Button from "../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "../../../store/hooks";
import { registerUser } from "../../../store/features/regSlice";

type RegValue = {
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  passConfirm: string;
};

const label = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  pass: "Password",
  passConfirm: "Confirm password",
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RegValue>({
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    passConfirm: "",
  });

  const [message, setMessage] = useState<RegValue>(label);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    let hasError = false;
    const newMsg: any = {};

    if (!data.firstName.trim()) {
      newMsg.firstName = "Họ không được để trống";
      hasError = true;
    } else newMsg.firstName = label.firstName;

    if (!data.lastName.trim()) {
      newMsg.lastName = "Tên không được để trống";
      hasError = true;
    } else newMsg.lastName = label.lastName;

    if (!data.email.trim()) {
      newMsg.email = "Email không được để trống";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newMsg.email = "Email phải đúng định dạng";
      hasError = true;
    } else newMsg.email = label.email;

    if (!data.pass.trim()) {
      newMsg.pass = "Mật khẩu không được để trống";
      hasError = true;
    } else if (data.pass.length < 6) {
      newMsg.pass = "Mật khẩu tối thiểu 6 ký tự";
      hasError = true;
    } else newMsg.pass = label.pass;

    if (!data.passConfirm.trim()) {
      newMsg.passConfirm = "Mật khẩu xác nhận không được để trống";
      hasError = true;
    } else if (data.passConfirm !== data.pass) {
      newMsg.passConfirm = "Mật khẩu phải trùng khớp";
      hasError = true;
    } else newMsg.passConfirm = label.passConfirm;

    setMessage(newMsg);

    if (hasError) {
      return;
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.pass,
    };

    setIsLoading(true);
    try {
      await dispatch(registerUser(payload)).unwrap();
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.left}>
        <h1>Welcome to the website</h1>
        <p>RIKKEI EDUCATION</p>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div>
              <input
                onChange={handleChange}
                name="firstName"
                type="text"
                value={data.firstName}
              />
              <br />
              <label
                className={`${styles.label} ${
                  message.firstName !== label.firstName ? styles.errorLabel : ""
                }`}
              >
                {message.firstName}
              </label>
            </div>
            <div>
              <input
                onChange={handleChange}
                name="lastName"
                type="text"
                value={data.lastName}
              />
              <br />
              <label
                className={`${styles.label} ${
                  message.lastName !== label.lastName ? styles.errorLabel : ""
                }`}
              >
                {message.lastName}
              </label>
            </div>
          </div>

          <div>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              value={data.email}
            />
            <label
              className={`${styles.label} ${
                message.email !== label.email ? styles.errorLabel : ""
              }`}
            >
              {message.email}
            </label>
          </div>

          <div>
            <input
              onChange={handleChange}
              name="pass"
              type="password"
              value={data.pass}
            />
            <label
              className={`${styles.label} ${
                message.pass !== label.pass ? styles.errorLabel : ""
              }`}
            >
              {message.pass}
            </label>
          </div>

          <div>
            <input
              onChange={handleChange}
              name="passConfirm"
              type="password"
              value={data.passConfirm}
            />
            <label
              className={`${styles.label} ${
                message.passConfirm !== label.passConfirm
                  ? styles.errorLabel
                  : ""
              }`}
            >
              {message.passConfirm}
            </label>
          </div>

          <Button maxcontent primary>
            {isLoading ? "Submitting..." : "Sign up"}
          </Button>

          <p className={styles.switchText}>
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      <img className={styles.circle1} src={img1} alt="" />
      <img className={styles.circle2} src={img2} alt="" />
    </div>
  );
}
