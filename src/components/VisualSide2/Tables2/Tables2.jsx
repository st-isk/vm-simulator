import { useState, useEffect } from "react";
import Table from "../../VisualSide/Tables/Table";
import styles from "./Tables2.module.css";

function Tables2({ isInTLB, highlightIndex }) {
    const [tableBorder, setTableBorder] = useState("");
    const [pagingBorder, setPagingBorder] = useState("");

    useEffect(() => {
        if (isInTLB) {
            setTableBorder("green");
            setTimeout(() => {
                setTableBorder("");
            }, 2000);
        } else {
            setTableBorder("red");
            setTimeout(() => {
                setTableBorder("");
                setPagingBorder("green");
                setTimeout(() => {
                    setPagingBorder("");
                }, 1000);
            }, 1000);
        }
    }, [isInTLB, highlightIndex]);

    return (
        <div className={styles.tables2Wrapper}>
            <div className={styles.tlb}>
                <Table
                    caption="TLB"
                    data={new Array(10).fill({
                        P: "...",
                        virtualNum: "...",
                        physNum: "...",
                    })}
                    headers={["P", "№ virt. page", "№ phys. page"]}
                    style={{
                        border: tableBorder
                            ? `2px solid ${tableBorder}`
                            : "none",
                        borderRadius: "4px",
                    }}
                />
                <span>Кэш-память</span>
            </div>
            <div className={styles.paging}>
                <div
                    style={{
                        border: pagingBorder
                            ? `2px solid ${pagingBorder}`
                            : "none",
                        borderRadius: "4px",
                    }}
                >
                    <div style={{ margin: "10px", textAlign: "center" }}>
                        Paging
                    </div>
                    <div className={styles.pagingTable}></div>
                </div>
                <span>ОП</span>
            </div>
        </div>
    );
}

export default Tables2;
