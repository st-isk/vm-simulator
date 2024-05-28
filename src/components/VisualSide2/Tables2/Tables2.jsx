import Table from "../../VisualSide/Tables/Table";
import styles from "./Tables2.module.css";

function Tables2() {
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
                />
                <span>Кэш-память</span>
            </div>
            <div className={styles.paging}>
                <div>
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
