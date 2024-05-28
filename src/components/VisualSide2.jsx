import styles from "./VisualSide2.module.css";
import ProccessCode from "./VisualSide2/ProccessCode/ProccessCode";
import Tables2 from "./VisualSide2/Tables2/Tables2";

function VisualSide2() {
    return (
        <div className={styles.visualSide2Wrapper}>
            <ProccessCode></ProccessCode>
            <Tables2></Tables2>
        </div>
    );
}

export default VisualSide2;
