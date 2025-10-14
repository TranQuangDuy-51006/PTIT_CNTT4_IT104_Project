import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./HeaderAdmin.module.scss";

export default function HeaderAdmin() {
  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <MdOutlineEmail className={styles.icon} />
        <IoNotificationsOutline className={styles.icon} />
        <img src="#" alt="#" className={styles.avatar} />
      </div>
    </header>
  );
}
