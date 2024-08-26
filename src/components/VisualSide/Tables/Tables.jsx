import Table from "./Table";
import styles from "./Tables.module.css";
import { AppContext } from "../../../context";
import { useContext } from "react";

function Tables() {
    const {
        currentTask,
        highlightRowTLB,
        highlightRowPD,
        highlightRowPT,
        processNum,
    } = useContext(AppContext);

    return (
        <div className={styles.tablesWrapper}>
            {Object.keys(currentTask).length !== 0 && (
                <Table
                    highlightRow={highlightRowTLB}
                    highlightProcess={processNum}
                    caption="TLB"
                    data={
                        Object.keys(currentTask).length === 0
                            ? []
                            : currentTask["TLB"]
                    }
                    headers={
                        processNum
                            ? ["P", "PCID", "№ virt. page", "№ phys. page"]
                            : ["P", "№ virt. page", "№ phys. page"]
                    }
                />
            )}
            {Object.keys(currentTask).length !== 0 &&
                currentTask.TLB.length === 10 && (
                    <Table
                        highlightRow={highlightRowPD}
                        caption="Таблица страниц 2-го уровня"
                        data={
                            Object.keys(currentTask).length === 0
                                ? []
                                : currentTask["PageDirectory" + processNum]
                        }
                        headers={["Index", "P", "PT#1 address"]}
                    />
                )}
            <div className={styles.PTsWrapper}>
                {Object.keys(currentTask).length !== 0 && (
                    <Table
                        highlightRow={highlightRowPT}
                        caption="Таблица страниц 1-го уровня"
                        data={
                            Object.keys(currentTask).length === 0
                                ? []
                                : currentTask["PageTable" + processNum]
                        }
                        headers={["Index", "P", "№ phys. page"]}
                    />
                )}
                {Object.keys(currentTask).length !== 0 &&
                    currentTask.TLB.length === 10 && (
                        <Table
                            style={{
                                zIndex: "-1",
                                position: "absolute",
                                bottom: "28px",
                                right: "5px",
                                left: "5px",
                                borderBottom: "1px solid rgb(0, 0, 0)",
                                borderBottomRightRadius: "10px",
                                borderBottomLeftRadius: "10px",
                            }}
                            caption=""
                            data={
                                Object.keys(currentTask).length === 0
                                    ? []
                                    : currentTask["PageDirectory" + processNum]
                            }
                            headers={["Index", "P", "№ phys. page"]}
                        />
                    )}
                {Object.keys(currentTask).length !== 0 &&
                    currentTask.TLB.length === 10 && (
                        <Table
                            style={{
                                zIndex: "-2",
                                position: "absolute",
                                bottom: "15px",
                                right: "10px",
                                left: "10px",
                                borderBottom: "1px solid rgb(0, 0, 0)",
                                borderBottomRightRadius: "10px",
                                borderBottomLeftRadius: "10px",
                            }}
                            caption=""
                            data={
                                Object.keys(currentTask).length === 0
                                    ? []
                                    : currentTask["PageDirectory" + processNum]
                            }
                            headers={["Index", "P", "№ phys. page"]}
                        />
                    )}
            </div>
            {Object.keys(currentTask).length !== 0 && (
                <div className={styles.extMemory}>Внешняя память</div>
            )}
        </div>
    );
}

export default Tables;
