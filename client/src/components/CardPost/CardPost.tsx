import { FiArrowUpRight } from "react-icons/fi";
import styles from "./CardPost.module.scss";
import { useNavigate } from "react-router-dom";

type CardPostProps = {
  id?: string;
  image: string;
  date: string;
  title: string;
  desc: string;
  category: string;
  categoryColor?: string;
  edit?: boolean;
  onEdit?: () => void;
};

export default function CardPost(props: CardPostProps) {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`/detail/${props.id}`);
  };

  return (
    <div className={styles.card}>
      <img src={props.image} alt={props.title} className={styles.image} />

      <div className={styles.content}>
        <p className={styles.date}>Date: {props.date.slice(0, 10)}</p>

        <div className={styles.titleRow}>
          <h3>{props.title}</h3>
          <FiArrowUpRight onClick={handleDetail} className={styles.icon} />
        </div>

        <p className={styles.desc}>{props.desc}</p>
        <div className={styles.flex}>
          <span
            className={styles.category}
            style={{ color: props.categoryColor }}
          >
            {props.category}
          </span>
          {props.edit && (
            <button className={styles.edit} onClick={props.onEdit}>
              Edit your post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
