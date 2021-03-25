import styles from "./SpeechBubble.module.css";

export default function SpeechBubble() {
  return (
    <div className={styles.bubble}>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit, malesuada
        posuere mauris habitant viverra varius pretium ridiculus, enim curabitur
        nostra vehicula placerat turpis. 
      </p>
    </div>
  );
}
