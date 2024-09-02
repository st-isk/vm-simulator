import styles from "./ProccessCode.module.css";
import ProccessPage from "./ProccessPage";

function ProccessCode({ highlightIndex, currentProcess, currentPage }) {
    return (
        <div className={styles.proccessCodeWrapper}>
            <div className={styles.proccess}>
                <ProccessPage
                    pageNumber={0}
                    highlightIndex={highlightIndex}
                    processIndex={0}
                    currentPage={currentPage}
                    currentProcess={currentProcess}
                />
                <ProccessPage
                    pageNumber={1}
                    highlightIndex={highlightIndex}
                    processIndex={0}
                    currentPage={currentPage}
                    currentProcess={currentProcess}
                />
                <ProccessPage
                    pageNumber={2}
                    highlightIndex={highlightIndex}
                    processIndex={0}
                    currentPage={currentPage}
                    currentProcess={currentProcess}
                />
                <span>Процесс №1</span>
            </div>
            <div className={styles.proccess}>
                <ProccessPage
                    pageNumber={0}
                    highlightIndex={highlightIndex}
                    processIndex={1}
                    currentPage={currentPage}
                    currentProcess={currentProcess}
                />
                <ProccessPage
                    pageNumber={1}
                    highlightIndex={highlightIndex}
                    processIndex={1}
                    currentPage={currentPage}
                    currentProcess={currentProcess}
                />
                <span>Процесс №2</span>
            </div>
        </div>
    );
}

export default ProccessCode;
