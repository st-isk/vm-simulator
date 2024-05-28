import CustomCheckbox from "../../UI/CustomCheckbox/CustomCheckbox";
import { AppContext } from "../../../context";
import { useContext } from "react";
import steps from "../../../Tasks/Steps.json";
import styles from "./ChooseSteps.module.css";

function ChooseSteps() {
    const { userAnswers, setUserAnswers, correctAnswers } =
        useContext(AppContext);

    return (
        <div className={styles.chooseStepsWrapper}>
            {steps.map((step, index) => (
                <div key={index}>
                    <CustomCheckbox
                        style={(() => {
                            if (correctAnswers[index] === userAnswers[index]) {
                                return { border: "2px solid rgb(0, 205, 0)" };
                            }
                            if (
                                correctAnswers[index] !== userAnswers[index] &&
                                correctAnswers[index] !== null
                            ) {
                                return { border: "2px solid red" };
                            }
                        })()}
                        isChecked={userAnswers[index]}
                        onChange={() => {
                            const newAnswers = [...userAnswers];
                            newAnswers[index] = !newAnswers[index];
                            setUserAnswers(newAnswers);
                        }}
                    >
                        {step}
                    </CustomCheckbox>
                </div>
            ))}
        </div>
    );
}

export default ChooseSteps;
