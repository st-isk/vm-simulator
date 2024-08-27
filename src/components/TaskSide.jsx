import ChooseSteps from "./TaskSide/ChooseSteps/ChooseSteps";
import ChooseTask from "./TaskSide/ChooseTask/ChooseTask";
import CustomButton from "./UI/CustomButton/CustomButton";
import styles from "./TaskSide.module.css";
import TaskDescription from "./TaskSide/TaskDescription/TaskDescription";
import variants from "../Tasks/Tasks.json";

function TaskSide({
    solver,
    setUserAnswers,
    setCorrectAnswers,
    setCurStep,
    setHighlightRowTLB,
    setHighlightRowPD,
    setHighlightRowPT,
    variant,
    taskNumber,
    setCurrentTask,
    currentTask,
    processNum,
    TLBtmpForProcess2,
}) {
    function resetHandler() {
        const findCurrentTask = () => {
            const curVar = variants.find((vrnt) => vrnt.variant === variant);
            return curVar.tasks.find((tsk) => tsk.taskNumber === taskNumber);
        };

        setUserAnswers(new Array(15).fill(false));
        setCorrectAnswers(new Array(15).fill(null));
        setCurStep(0);
        setHighlightRowTLB(-1);
        setHighlightRowPD(-1);
        setHighlightRowPT(-1);
        if (processNum === "2")
            setCurrentTask({ ...findCurrentTask(), TLB: TLBtmpForProcess2 });
        else setCurrentTask(findCurrentTask());
    }

    return (
        <div className={styles.taskSideWrapper}>
            <ChooseTask></ChooseTask>

            <hr className={styles.divider} />
            <TaskDescription>
                Отметьте правильную последовательность алгоритма формирования
                физического адреса при указанном виртуальном адресе:
            </TaskDescription>
            <ChooseSteps></ChooseSteps>
            <div className={styles.buttonsWrapper}>
                <CustomButton onClick={resetHandler}>Сброс</CustomButton>
                <CustomButton onClick={solver}>Следующий шаг</CustomButton>
            </div>
        </div>
    );
}

export default TaskSide;
