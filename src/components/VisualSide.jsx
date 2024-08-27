import { forwardRef } from "react";
import { ArcherElement } from "react-archer";
import { useContext } from "react";
import styles from "./VisualSide.module.css";
import AddressesInfo from "./VisualSide/AddressesInfo/AddressesInfo";
import Tables from "./VisualSide/Tables/Tables";
import { AppContext } from "../context";

const AddressesInfoWithRef = forwardRef((props, ref) => (
    <div ref={ref}>
        <AddressesInfo {...props} />
    </div>
));
AddressesInfoWithRef.displayName = "AddressesInfoWithRef";

const TablesWithRef = forwardRef((props, ref) => (
    <div ref={ref}>
        <Tables {...props} />
    </div>
));
TablesWithRef.displayName = "TablesWithRef";

function VisualSide() {
    const { variant, taskNumber } = useContext(AppContext);

    return (
        <div className={styles.visualSideWrapper}>
            {variant && taskNumber && (
                <ArcherElement
                    id="addresses"
                    relations={[
                        {
                            targetId: "tables",
                            targetAnchor: "left",
                            sourceAnchor: "bottom",
                            label: <div>Label</div>,
                            style: {
                                strokeColor: "blue",
                                strokeWidth: 2,
                            },
                        },
                    ]}
                >
                    <AddressesInfoWithRef />
                </ArcherElement>
            )}

            {variant && taskNumber && (
                <ArcherElement id="tables1">
                    <TablesWithRef />
                </ArcherElement>
            )}
        </div>
    );
}

export default VisualSide;
