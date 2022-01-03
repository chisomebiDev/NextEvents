import EventItem from "./EventItem";
import styles from "./EventList.module.css";

function EventList(props) {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
}

export default EventList;
