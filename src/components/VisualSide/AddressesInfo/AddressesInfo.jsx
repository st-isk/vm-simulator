import { useContext } from "react";
import { AppContext } from "../../../context";
import styles from "./AddressesInfo.module.css";

function AddressesInfo() {
    const { currentTask, curStep, processNum } = useContext(AppContext);

    return (
        <div className={styles.addressesInfoWrapper}>
            {Object.keys(currentTask).length !== 0 && processNum && (
                <div className={styles.processDescription}>
                    Процесс №{processNum}
                </div>
            )}
            {Object.keys(currentTask).length !== 0 && (
                <div className={styles.addressesDescription}>
                    <div className={styles.addressesBlock}>
                        <div style={{ alignSelf: "center" }}>
                            Виртуальный адрес:{" "}
                            {currentTask["virtualAddress" + processNum]}
                        </div>
                        <div>
                            Номер виртуальной страницы:{" "}
                            {currentTask.TLB.length === 10
                                ? currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(0, 6)
                                : currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(0, 3)}
                        </div>
                        {currentTask.TLB.length === 10 && (
                            <div>
                                Указатель на запись в таблице страниц 2-го
                                уровня:{" "}
                                {currentTask[
                                    "virtualAddress" + processNum
                                ]?.slice(0, 3)}
                            </div>
                        )}
                        <div>
                            Указатель на запись в таблице страниц 1-го уровня:{" "}
                            {currentTask.TLB.length === 10
                                ? currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(3, 6)
                                : currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(0, 3)}
                        </div>
                        <div>
                            Смещение на странице:{" "}
                            {currentTask.TLB.length === 10
                                ? currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(6, 9)
                                : currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(3, 9)}
                        </div>
                    </div>
                    <div className={styles.addressesBlock}>
                        <div style={{ alignSelf: "center" }}>
                            Физический адрес:{" "}
                            {curStep === 15
                                ? currentTask["physicalAddress" + processNum]
                                : ""}
                        </div>
                        <div>
                            Номер физической страницы:{" "}
                            {curStep === 15
                                ? currentTask.TLB.length === 10
                                    ? currentTask[
                                          "physicalAddress" + processNum
                                      ]?.slice(0, 6)
                                    : currentTask[
                                          "physicalAddress" + processNum
                                      ]?.slice(0, 3)
                                : ""}
                        </div>
                        <div>
                            Смещение на странице:{" "}
                            {currentTask.TLB.length === 10
                                ? currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(6, 9)
                                : currentTask[
                                      "virtualAddress" + processNum
                                  ]?.slice(3, 9)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressesInfo;
