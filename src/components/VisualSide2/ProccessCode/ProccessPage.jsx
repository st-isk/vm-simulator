import styles from "./ProccessPage.module.css";

function ProccessPage({
    pageNumber,
    highlightIndex,
    processIndex,
    currentPage,
    currentProcess,
}) {
    return (
        <div className={styles.page}>
            <div className={styles.pageCode}>
                {Array(8)
                    .fill()
                    .map((_, index) => (
                        <span
                            key={index}
                            style={{
                                border:
                                    highlightIndex === index &&
                                    processIndex === currentProcess &&
                                    pageNumber === currentPage
                                        ? "1px solid black"
                                        : "none",
                                borderRadius: "4px", // Добавляем скругление рамки
                            }}
                        >
                            .............................
                        </span>
                    ))}
            </div>
            <div className={styles.pageNumber}>Страница {pageNumber}</div>
        </div>
    );
}

export default ProccessPage;
