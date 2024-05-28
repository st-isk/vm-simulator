import styles from "./ProccessCode.module.css";
import ProccessPage from "./ProccessPage";

function ProccessCode() {
    return (
        <div className={styles.proccessCodeWrapper}>
            <div className={styles.proccess}>
                <ProccessPage pageNumber="0" />
                <ProccessPage pageNumber="1" />
                <ProccessPage pageNumber="2" />
                <span>Процесс №1</span>
            </div>
            <div className={styles.proccess}>
                <ProccessPage pageNumber="0" />
                <ProccessPage pageNumber="1" />
                <span>Процесс №2</span>
            </div>
        </div>
    );
}

export default ProccessCode;
