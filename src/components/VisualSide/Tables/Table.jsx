import { forwardRef } from "react";
import styles from "./Table.module.css";

const TableWithRef = forwardRef(
    (
        { caption, headers, data, highlightRow, highlightProcess, ...props },
        ref
    ) => {
        return (
            <div ref={ref} {...props}>
                <table className={styles.table}>
                    <caption className={styles.caption}>{caption}</caption>
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header} className={styles.th}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={styles.tr}
                                style={(() => {
                                    if (highlightProcess) {
                                        if (
                                            (highlightProcess === "1" &&
                                                row.PCID === "10") ||
                                            (highlightProcess === "2" &&
                                                row.PCID === "01")
                                        )
                                            return { color: "grey" };
                                    }
                                    if (index === highlightRow)
                                        return { color: "red" };
                                })()}
                            >
                                {(() => {
                                    const res = [];
                                    for (const key in row) {
                                        res.push(
                                            <td key={key} className={styles.td}>
                                                {row[key]}
                                            </td>
                                        );
                                    }
                                    return res;
                                })()}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
);
TableWithRef.displayName = "TableWithRef";

export default TableWithRef;
