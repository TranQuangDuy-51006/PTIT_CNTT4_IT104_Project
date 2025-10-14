import React from "react";
import styles from "./Footer.module.scss";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.logo}>MY BLOG</h2>
        </div>

        <div className={styles.about}>
          <h4>About Rareblocks</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dictum aliquet accumsan porta lectus ridiculus in mattis. Natus
            sodales volutpat ullamcorper amet adipiscing fermentum.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Help</h4>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Resources</h4>
          <ul>
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      <div className={styles.socials}>
        <FaTwitter />
        <FaFacebookF />
        <FaInstagram />
        <FaGithub />
      </div>
    </footer>
  );
}
