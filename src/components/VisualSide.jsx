import styles from "./VisualSide.module.css";
import AddressesInfo from "./VisualSide/AddressesInfo/AddressesInfo";
import Tables from "./VisualSide/Tables/Tables";

function VisualSide() {
    return (
        <div className={styles.visualSideWrapper}>
            <AddressesInfo></AddressesInfo>
            <Tables></Tables>
        </div>
    );
}

export default VisualSide;
