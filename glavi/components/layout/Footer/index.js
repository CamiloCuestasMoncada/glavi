import styles from "./Footer.module.css";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Icon } from "@material-ui/core";
import Image from "next/image";

export default function Footer() {
  let iconStyles = {
    fontSize: "77px",
    cursor: "pointer",
  };
  return (
    <div className={styles.footerContainer}>
      <div className={styles.socialMedia}>
        <Icon>
          <FacebookIcon style={iconStyles} />
        </Icon>
        <Icon>
          <YouTubeIcon style={iconStyles} />
        </Icon>
      </div>
      <div className={styles.copyrigth}>
        <p>Glavi ©2021. All rights reserved.</p>
      </div>
      <p>
        Developed and designed by <a>xxx</a>
      </p>
      
    </div>
  );
}
