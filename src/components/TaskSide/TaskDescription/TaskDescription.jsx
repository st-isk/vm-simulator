import styles from "./TaskDescription.module.css";

function TaskDescription({ children }) {
    return (
        <div className={styles.descriptionWrapper}>
            <p>{children}</p>
        </div>
    );
}

export default TaskDescription;
