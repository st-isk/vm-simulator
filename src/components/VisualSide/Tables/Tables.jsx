import Table from "./Table";
import styles from "./Tables.module.css";
import { AppContext } from "../../../context";
import { useContext } from "react";
import { forwardRef } from "react";
import { ArcherElement } from "react-archer";
import classNames from "classnames";

const TablesWithRef = forwardRef((props, ref) => {
    const {
        currentTask,
        highlightRowTLB,
        highlightRowPD,
        highlightRowPT,
        processNum,
    } = useContext(AppContext);

    return (
        <div ref={ref} className={styles.tablesWrapper}>
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
                <div className={styles.mainTableWrapper}>
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
                                className={classNames(styles.bottomTable1)}
                                caption=""
                                data={
                                    Object.keys(currentTask).length === 0
                                        ? []
                                        : currentTask[
                                              "PageDirectory" + processNum
                                          ]
                                }
                                headers={["Index", "P", "№ phys. page"]}
                            />
                        )}
                    {Object.keys(currentTask).length !== 0 &&
                        currentTask.TLB.length === 10 && (
                            <Table
                                className={classNames(styles.bottomTable2)}
                                caption=""
                                data={
                                    Object.keys(currentTask).length === 0
                                        ? []
                                        : currentTask[
                                              "PageDirectory" + processNum
                                          ]
                                }
                                headers={["Index", "P", "№ phys. page"]}
                            />
                        )}
                </div>
            </div>
            {Object.keys(currentTask).length !== 0 && (
                <div className={styles.extMemory}>Внешняя память</div>
            )}
        </div>
    );
});
TablesWithRef.displayName = "TablesWithRef";

export default TablesWithRef;
