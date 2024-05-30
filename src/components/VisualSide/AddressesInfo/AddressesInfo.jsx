import { useContext } from "react";
import { AppContext } from "../../../context";
import styles from "./AddressesInfo.module.css";

function AddressesInfo() {
    const { taskNumber, currentTask, curStep } = useContext(AppContext);

    return (
        <div className={styles.addressesInfoWrapper}>
            {Object.keys(currentTask).length !== 0 && taskNumber > 2 && (
                <div className={styles.processDescription}>Процесс №1</div>
            )}
            {Object.keys(currentTask).length !== 0 && (
                <div className={styles.addressesDescription}>
                    <div className={styles.addressesBlock}>
                        <div style={{ alignSelf: "center" }}>
                            Виртуальный адрес: {currentTask.virtualAddress}
                        </div>
                        <div>
                            Номер виртуальной страницы:{" "}
                            {taskNumber % 2 !== 0
                                ? currentTask.virtualAddress?.slice(0, 6)
                                : currentTask.virtualAddress?.slice(0, 3)}
                        </div>
                        {taskNumber % 2 !== 0 && (
                            <div>
                                Указатель на запись в таблице страниц 2-го
                                уровня:{" "}
                                {currentTask.virtualAddress?.slice(0, 3)}
                            </div>
                        )}
                        <div>
                            Указатель на запись в таблице страниц 1-го уровня:{" "}
                            {taskNumber % 2 !== 0
                                ? currentTask.virtualAddress?.slice(3, 6)
                                : currentTask.virtualAddress?.slice(0, 3)}
                        </div>
                        <div>
                            Смещение на странице:{" "}
                            {taskNumber % 2 !== 0
                                ? currentTask.virtualAddress?.slice(6, 9)
                                : currentTask.virtualAddress?.slice(3, 9)}
                        </div>
                    </div>
                    <div className={styles.addressesBlock}>
                        <div style={{ alignSelf: "center" }}>
                            Физический адрес:{" "}
                            {curStep > 14 ? currentTask.physicalAddress : ""}
                        </div>
                        <div>
                            Номер физической страницы:{" "}
                            {curStep > 14
                                ? taskNumber % 2 !== 0
                                    ? currentTask.physicalAddress?.slice(0, 6)
                                    : currentTask.physicalAddress?.slice(0, 3)
                                : ""}
                        </div>
                        <div>
                            Смещение на странице:{" "}
                            {taskNumber % 2 !== 0
                                ? currentTask.virtualAddress?.slice(6, 9)
                                : currentTask.virtualAddress?.slice(3, 9)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressesInfo;
