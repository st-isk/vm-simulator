import "./Table.module.css";

function Table({ caption, headers, data, highlightRow, ...props }) {
    return (
        <div {...props}>
            <table>
                <caption>{caption}</caption>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            style={
                                index === highlightRow ? { color: "red" } : {}
                            }
                        >
                            {(() => {
                                const res = [];
                                for (const key in row) {
                                    res.push(<td key={key}>{row[key]}</td>);
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

export default Table;
