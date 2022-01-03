import Link from "next/link";
import styles from "./Button.module.css";

function Button(props) {
  const { link } = props;

  if (link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={styles.btn}>
      {props.children}
    </button>
  );
}
export default Button;
