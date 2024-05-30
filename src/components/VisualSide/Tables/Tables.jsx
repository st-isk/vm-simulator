import Table from "./Table";
import styles from "./Tables.module.css";
import { AppContext } from "../../../context";
import { useContext } from "react";

function Tables() {
    const { taskNumber, currentTask, highlightRowTLB, highlightRowPD, highlightRowPT } =
        useContext(AppContext);

    return (
        <div className={styles.tablesWrapper}>
            {Object.keys(currentTask).length !== 0 && (
                <Table
                    highlightRow={highlightRowTLB}
                    caption="TLB"
                    data={
                        Object.keys(currentTask).length === 0
                            ? []
                            : currentTask["TLB"]
                    }
                    headers={["P", "№ virt. page", "№ phys. page"]}
                />
            )}
            {Object.keys(currentTask).length !== 0 && taskNumber % 2 !== 0 && (
                <Table
                    highlightRow={highlightRowPD}
                    caption="Таблица страниц 2-го уровня"
                    data={
                        Object.keys(currentTask).length === 0
                            ? []
                            : currentTask["PageDirectory"]
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
                                : currentTask["PageTable"]
                        }
                        headers={["Index", "P", "№ phys. page"]}
                    />
                )}
                {Object.keys(currentTask).length !== 0 && taskNumber % 2 !== 0 && (
                    <Table
                        style={{
                            zIndex: "-1",
                            position: "absolute",
                            bottom: "23px",
                            right: "5px",
                            left: "5px",
                        }}
                        caption=""
                        data={
                            Object.keys(currentTask).length === 0
                                ? []
                                : currentTask["PageDirectory"]
                        }
                        headers={["Index", "P", "№ phys. page"]}
                    />
                )}
                {Object.keys(currentTask).length !== 0 && taskNumber % 2 !== 0 && (
                    <Table
                        style={{
                            zIndex: "-2",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            left: "10px",
                        }}
                        caption=""
                        data={
                            Object.keys(currentTask).length === 0
                                ? []
                                : currentTask["PageDirectory"]
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
