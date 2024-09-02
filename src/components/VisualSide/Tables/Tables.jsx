import TableWithRef from "./Table";
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
        curStep,
        correctAnswers,
    } = useContext(AppContext);

    const getRelationsPD = () => {
        const relations = [];

        if (
            currentTask.TLB.length === 10 &&
            curStep > 8 &&
            correctAnswers[6] === true
        ) {
            relations.push({
                targetId: "PT",
                targetAnchor: "left",
                sourceAnchor: "right",
                label: (
                    <div
                        style={{
                            marginTop: 125,
                            marginLeft: 20,
                        }}
                    >
                        Поиск в таблице страниц 1-го уровня
                    </div>
                ),
                style: {
                    strokeColor: "lightblue",
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                },
                className:
                    curStep > 8 && correctAnswers[6] === true
                        ? styles.animateArrow
                        : "",
            });
        }

        if (
            currentTask.TLB.length === 10 &&
            curStep > 13 &&
            correctAnswers[13] === true
        ) {
            relations.push({
                targetId: "TLB",
                targetAnchor: "right",
                sourceAnchor: "left",
                label: (
                    <div style={{ marginRight: 15, marginBottom: 80 }}>
                        Занесение данных в TLB
                    </div>
                ),
                style: {
                    strokeColor: "lightblue",
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                },
                className: styles.animateArrow,
            });
        }

        return relations;
    };

    const getRelationsPT = () => {
        const relations = [];

        if (curStep > 9 && correctAnswers[9] === true) {
            relations.push({
                targetId: "extMemory",
                targetAnchor: "right",
                sourceAnchor: "bottom",
                label: (
                    <div
                        style={{
                            marginTop: 80,
                            marginLeft: 150,
                        }}
                    >
                        Обращение за данными к внешней памяти
                    </div>
                ),
                style: {
                    strokeColor: "lightblue",
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                },
                className:
                    curStep > 9 && correctAnswers[9] === true
                        ? styles.animateArrow
                        : "",
            });
        }

        if (
            currentTask.TLB.length !== 10 &&
            curStep > 13 &&
            correctAnswers[13] === true
        ) {
            relations.push({
                targetId: "TLB",
                targetAnchor: "right",
                sourceAnchor: "left",
                label: (
                    <div style={{ marginRight: 15, marginBottom: 80 }}>
                        Занесение данных в TLB
                    </div>
                ),
                style: {
                    strokeColor: "lightblue",
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                },
                className: styles.animateArrow,
            });
        }

        return relations;
    };

    return (
        <div ref={ref} className={styles.tablesWrapper}>
            {Object.keys(currentTask).length !== 0 && (
                <ArcherElement
                    id="TLB"
                    relations={
                        (curStep > 5 && correctAnswers[3] === true) ||
                        (curStep > 8 && correctAnswers[6] === true)
                            ? [
                                  {
                                      targetId:
                                          currentTask.TLB.length === 10
                                              ? "PD"
                                              : "PT",
                                      targetAnchor: "left",
                                      sourceAnchor: "right",
                                      label:
                                          currentTask.TLB.length === 10 ? (
                                              <div
                                                  style={{
                                                      marginTop: 110,
                                                      marginLeft: 20,
                                                  }}
                                              >
                                                  Поиск в таблице страниц 2-го
                                                  уровня
                                              </div>
                                          ) : (
                                              <div
                                                  style={{
                                                      marginTop: 110,
                                                      marginLeft: 20,
                                                  }}
                                              >
                                                  Поиск в таблице страниц 1-го
                                                  уровня
                                              </div>
                                          ),
                                      style: {
                                          strokeColor: "lightblue",
                                          strokeWidth: 2,
                                          strokeDasharray: "5,5",
                                      },
                                      className:
                                          (curStep > 5 &&
                                              correctAnswers[3] === true) ||
                                          (curStep > 8 &&
                                              correctAnswers[6] === true)
                                              ? styles.animateArrow
                                              : "",
                                  },
                              ]
                            : []
                    }
                >
                    <TableWithRef
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
                        ref={ref}
                    />
                </ArcherElement>
            )}
            {Object.keys(currentTask).length !== 0 &&
                currentTask.TLB.length === 10 && (
                    <ArcherElement id="PD" relations={getRelationsPD()}>
                        <TableWithRef
                            highlightRow={highlightRowPD}
                            caption="Таблица страниц 2-го уровня"
                            data={
                                Object.keys(currentTask).length === 0
                                    ? []
                                    : currentTask["PageDirectory" + processNum]
                            }
                            headers={["Index", "P", "PT#1 address"]}
                        />
                    </ArcherElement>
                )}
            <div className={styles.PTsWrapper}>
                <div className={styles.mainTableWrapper}>
                    {Object.keys(currentTask).length !== 0 && (
                        <ArcherElement id="PT" relations={getRelationsPT()}>
                            <TableWithRef
                                highlightRow={highlightRowPT}
                                caption="Таблица страниц 1-го уровня"
                                data={
                                    Object.keys(currentTask).length === 0
                                        ? []
                                        : currentTask["PageTable" + processNum]
                                }
                                headers={["Index", "P", "№ phys. page"]}
                            />
                        </ArcherElement>
                    )}

                    {Object.keys(currentTask).length !== 0 &&
                        currentTask.TLB.length === 10 && (
                            <TableWithRef
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
                            <TableWithRef
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
                <ArcherElement
                    id="extMemory"
                    relations={
                        curStep > 11 && correctAnswers[11] === true
                            ? [
                                  {
                                      targetId: "PT",
                                      targetAnchor: "bottom",
                                      sourceAnchor: "top",
                                      label: (
                                          <div
                                              style={{
                                                  marginBottom: 30,
                                                  marginRight: 60,
                                              }}
                                          >
                                              Заведение трансляции в таблице
                                              страниц 1-го уровня
                                          </div>
                                      ),
                                      style: {
                                          strokeColor: "lightblue",
                                          strokeWidth: 2,
                                          strokeDasharray: "5,5",
                                      },
                                      className:
                                          curStep > 11 &&
                                          correctAnswers[11] === true
                                              ? styles.animateArrow
                                              : "",
                                  },
                              ]
                            : []
                    }
                >
                    <div ref={ref} className={styles.extMemory}>
                        Внешняя память
                    </div>
                </ArcherElement>
            )}
        </div>
    );
});
TablesWithRef.displayName = "TablesWithRef";

export default TablesWithRef;
