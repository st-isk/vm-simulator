import { useContext } from "react";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import { AppContext } from "../../../context";
//import variants from "../../../Tasks/Tasks.json";
import styles from "./ChooseTask.module.css";

function ChooseTask() {
    const {
        variants,
        variant,
        setVariant,
        taskNumber,
        setTaskNumber,
        setCurrentTask,
        setProcessNum,
    } = useContext(AppContext);

    const findCurrentTask = (newTaskNumber) => {
        const curVar = variants.find((vrnt) => vrnt.variant === variant);
        return curVar.tasks.find((tsk) => tsk.taskNumber === newTaskNumber);
    };

    const chooseTaskHandler = (newTaskNumber) => {
        setTaskNumber(newTaskNumber);
        const curTask = findCurrentTask(newTaskNumber);
        if (curTask["virtualAddress1"] && curTask["virtualAddress2"])
            setProcessNum("1");
        else setProcessNum("");
        setCurrentTask(curTask);
    };

    return (
        <div className={styles.chooseTaskWrapper}>
            <div>Выберите вариант и задание:</div>
            <div>
                <span>Вариант: </span>
                <CustomSelect
                    options={variants.map((variant) => ({
                        value: variant.variant,
                        name: variant.variant,
                    }))}
                    defaultValue="--Выберите вариант--"
                    value={variant}
                    onChange={setVariant}
                />
            </div>
            <div>
                <span>Задание: </span>
                <CustomSelect
                    options={
                        variant
                            ? variants[parseInt(variant) - 1].tasks.map(
                                  (task) => ({
                                      value: task.taskNumber,
                                      name: task.taskNumber,
                                  })
                              )
                            : []
                    }
                    defaultValue="--Выберите задание--"
                    value={taskNumber}
                    onChange={chooseTaskHandler}
                />
            </div>
        </div>
    );
}

export default ChooseTask;
