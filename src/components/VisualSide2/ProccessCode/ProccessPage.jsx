import styles from "./ProccessPage.module.css";

function ProccessPage({ pageNumber }) {
    return (
        <div className={styles.page}>
            <div className={styles.pageCode}>
                <span>.............................</span>
                <span>.............................</span>
                <span>.............................</span>
                <span>.............................</span>
            </div>
            <div className={styles.pageNumber}>Страница {pageNumber}</div>
        </div>
    );
}

export default ProccessPage;
