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
    const { variant, taskNumber, curStep, correctAnswers } =
        useContext(AppContext);

    return (
        <div className={styles.visualSideWrapper}>
            {variant && taskNumber && (
                <ArcherElement
                    id="addresses"
                    relations={
                        curStep > 0 && correctAnswers[0] === true
                            ? [
                                  {
                                      targetId: "TLB",
                                      targetAnchor: "top",
                                      sourceAnchor: "bottom",
                                      label: (
                                          <div style={{ marginTop: 40 }}>
                                              Поиск в TLB
                                          </div>
                                      ),
                                      style: {
                                          strokeColor: "lightblue",
                                          strokeWidth: 2,
                                          strokeDasharray: "5,5",
                                      },
                                      className:
                                          curStep > 0 &&
                                          correctAnswers[0] === true
                                              ? styles.animateArrow
                                              : "",
                                  },
                              ]
                            : []
                    }
                >
                    <AddressesInfoWithRef />
                </ArcherElement>
            )}

            {variant && taskNumber && (
                <ArcherElement id="tables">
                    <TablesWithRef />
                </ArcherElement>
            )}
        </div>
    );
}

export default VisualSide;
