import { useEffect, useState } from "react";
import { ArcherContainer } from "react-archer";
import "./App.css";
import TaskSide from "./components/TaskSide";
import VisualSide from "./components/VisualSide";
import { AppContext } from "./context";
import VisualSide2 from "./components/VisualSide2";

function App() {
    const [variant, setVariant] = useState("");
    const [taskNumber, setTaskNumber] = useState("");
    const [currentTask, setCurrentTask] = useState({});
    const [userAnswers, setUserAnswers] = useState(new Array(15).fill(false));
    const [correctAnswers, setCorrectAnswers] = useState(
        new Array(15).fill(null)
    );
    const [curStep, setCurStep] = useState(0);
    const [highlightRowTLB, setHighlightRowTLB] = useState(-1);
    const [highlightRowPD, setHighlightRowPD] = useState(-1);
    const [highlightRowPT, setHighlightRowPT] = useState(-1);
    const [processNum, setProcessNum] = useState("");
    const [variants, setVariants] = useState([]);
    const [TLBtmpForProcess2, setTLBtmpForProcess2] = useState([]);

    useEffect(() => {
        setUserAnswers(new Array(15).fill(false));
        setCorrectAnswers(new Array(15).fill(null));
        setCurStep(0);
        setHighlightRowTLB(-1);
        setHighlightRowPD(-1);
        setHighlightRowPT(-1);
    }, [variant, taskNumber]);

    useEffect(() => {
        fetch("./temp.txt")
            .then((response) => response.text())
            .then((encryptedData) => {
                const decryptedData = decryptJSON(encryptedData, "***");
                setVariants(decryptedData);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    function decryptJSON(encryptedData, secretKey) {
        let decryptedData = "";

        for (let i = 0; i < encryptedData.length; i++) {
            decryptedData += String.fromCharCode(
                encryptedData.charCodeAt(i) ^
                    secretKey.charCodeAt(i % secretKey.length)
            );
        }

        return JSON.parse(decryptedData);
    }

    function alertChecker() {
        if (!(variant && taskNumber)) {
            alert("Предварительно выберите вариант и задание!");
            return true;
        }
        if ((processNum === "" || processNum === "2") && curStep > 14) {
            alert("Все шаги выполнены!");
            return true;
        }
        return false;
    }

    function changeCorrectAnswers(ans) {
        const res = [...correctAnswers];
        for (let i = 0; i < ans.length; i++) {
            res[ans[i].index] = ans[i].value;
        }
        setCorrectAnswers(res);
    }

    function solverType1() {
        if (alertChecker()) return;

        switch (curStep) {
            case 0:
                stepZero();
                break;
            case 3:
                stepThree();
                break;
            case 6:
                stepSix();
                break;
            case 9:
                stepNine();
                break;
            case 10:
                stepTen();
                break;
            case 11:
                stepEleven();
                break;
            case 12:
                stepTwelve();
                break;
            case 14:
                stepFourteen();
                break;
            case 15:
                stepFifteen();
                break;
        }

        function stepZero() {
            const virtPage = currentTask["virtualAddress" + processNum].slice(
                0,
                6
            );
            const PTE = parseInt(
                currentTask["virtualAddress" + processNum].slice(3, 6),
                2
            );
            const ans = [];
            const res = currentTask["TLB"].findIndex(
                (row) => row.virtualNum === virtPage
            );
            const resPT = currentTask["PageTable" + processNum].find(
                (row) => parseInt(row.Index) === PTE
            );
            ans.push({ index: 0, value: true });
            if (res !== -1) {
                if (resPT?.P === "0") {
                    alert("Ошибка! Данные есть в TLB и отсутствуют в PT");
                    return;
                }
                ans.push({ index: 1, value: true });
                for (let i = 2; i < 14; i++) {
                    ans.push({ index: i, value: false });
                }
                setCurStep(curStep + 14);
                setHighlightRowTLB(res);
            } else {
                ans.push({ index: 2, value: true });
                ans.push({ index: 1, value: false });
                setCurStep(curStep + 3);
            }
            changeCorrectAnswers(ans);
        }

        function stepThree() {
            const PDE = parseInt(
                currentTask["virtualAddress" + processNum].slice(0, 3),
                2
            );
            const ans = [];
            const res = currentTask["PageDirectory" + processNum].find(
                (row) => parseInt(row.Index) === PDE
            );
            ans.push({ index: 3, value: true });
            if (res?.P === "1") {
                ans.push({ index: 4, value: true });
                ans.push({ index: 5, value: false });
                setHighlightRowPD(parseInt(res.Index));
                setCurStep(curStep + 3);
            } else {
                ans.push({ index: 5, value: true });
                ans.push({ index: 4, value: false });
                ans.push({ index: 6, value: false });
                ans.push({ index: 7, value: false });
                ans.push({ index: 8, value: false });
                setCurStep(curStep + 6);
            }
            changeCorrectAnswers(ans);
        }

        function stepSix() {
            const PTE = parseInt(
                currentTask["virtualAddress" + processNum].slice(3, 6),
                2
            );
            const ans = [];
            const res = currentTask["PageTable" + processNum].find(
                (row) => parseInt(row.Index) === PTE
            );
            if (res?.P === "1") {
                alert("Ошибка! Данных нет в TLB, но есть в PT");
                return;
            } else {
                ans.push({ index: 6, value: true });
                ans.push({ index: 8, value: true });
                ans.push({ index: 7, value: false });
                setCurStep(curStep + 3);
            }
            changeCorrectAnswers(ans);
        }

        function stepNine() {
            const ans = [];
            ans.push({ index: 9, value: true });
            if (correctAnswers[4] === true) {
                setCurStep(curStep + 2);
                ans.push({ index: 10, value: false });
            } else {
                setCurStep(curStep + 1);
            }
            changeCorrectAnswers(ans);
        }

        function stepTen() {
            const ans = [];
            const PDE = parseInt(
                currentTask["virtualAddress" + processNum].slice(0, 3),
                2
            );
            const res = currentTask["PageDirectory" + processNum].findIndex(
                (row) => parseInt(row.Index) === PDE
            );
            const taskClone = JSON.parse(JSON.stringify(currentTask));
            taskClone["PageDirectory" + processNum][res] = {
                Index: res.toString(),
                P: "1",
                PTAddress: "...",
            };
            setCurrentTask(taskClone);
            setHighlightRowPD(res);
            ans.push({ index: 10, value: true });
            setCurStep(curStep + 1);
            changeCorrectAnswers(ans);
        }

        function stepEleven() {
            const ans = [];
            const PTE = parseInt(
                currentTask["virtualAddress" + processNum].slice(3, 6),
                2
            );
            const res = currentTask["PageTable" + processNum].findIndex(
                (row) => parseInt(row.Index) === PTE
            );
            const taskClone = JSON.parse(JSON.stringify(currentTask));
            taskClone["PageTable" + processNum][res] = {
                Index: res.toString(),
                P: "1",
                physNum: currentTask["physicalAddress" + processNum].slice(
                    0,
                    6
                ),
            };
            setCurrentTask(taskClone);
            setHighlightRowPT(res);
            ans.push({ index: 11, value: true });
            setCurStep(curStep + 1);
            changeCorrectAnswers(ans);
        }

        function stepTwelve() {
            const ans = [];
            let cntP = 0;
            currentTask["TLB"].forEach((row) => {
                if (row.P === "1") cntP++;
            });
            const taskClone = JSON.parse(JSON.stringify(currentTask));
            if (cntP === 10) taskClone["TLB"].shift();
            taskClone["TLB"][cntP === 10 ? 9 : cntP] = processNum
                ? {
                      P: "1",
                      PCID: processNum === "1" ? "01" : "10",
                      virtualNum: currentTask[
                          "virtualAddress" + processNum
                      ]?.slice(0, 6),
                      physNum: currentTask[
                          "physicalAddress" + processNum
                      ]?.slice(0, 6),
                  }
                : {
                      P: "1",
                      virtualNum: currentTask[
                          "virtualAddress" + processNum
                      ]?.slice(0, 6),
                      physNum: currentTask[
                          "physicalAddress" + processNum
                      ]?.slice(0, 6),
                  };
            setCurrentTask(taskClone);
            setHighlightRowTLB(cntP === 10 ? 9 : cntP);
            ans.push({ index: 12, value: cntP === 10 ? true : false });
            ans.push({ index: 13, value: true });
            setCurStep(curStep + 2);
            changeCorrectAnswers(ans);
        }

        function stepFourteen() {
            const ans = [];
            ans.push({ index: 14, value: true });
            setCurStep(curStep + 1);
            changeCorrectAnswers(ans);
        }

        function stepFifteen() {
            alert(
                "Работа с процессом №1 завершена!\n" +
                    "Пожалуйста, выполните задание для процесса №2\n" +
                    "и нажмите на кнопку 'Следующий шаг'!"
            );
            setTLBtmpForProcess2(
                JSON.parse(JSON.stringify(currentTask["TLB"]))
            );
            setUserAnswers(new Array(15).fill(false));
            setCorrectAnswers(new Array(15).fill(null));
            setHighlightRowTLB(-1);
            setHighlightRowPD(-1);
            setHighlightRowPT(-1);
            setProcessNum("2");
            setCurStep(0);
        }
    }

    function solverType2() {
        if (alertChecker()) return;

        switch (curStep) {
            case 0:
                stepZero();
                break;
            case 3:
                stepThree();
                break;
            case 9:
                stepNine();
                break;
            case 11:
                stepEleven();
                break;
            case 12:
                stepTwelve();
                break;
            case 14:
                stepFourteen();
                break;
            case 15:
                stepFifteen();
                break;
        }

        function stepZero() {
            const virtPage = currentTask["virtualAddress" + processNum].slice(
                0,
                3
            );
            const PTE = parseInt(virtPage, 2);
            const ans = [];
            const res = currentTask["TLB"].findIndex(
                (row) => row.virtualNum === virtPage
            );
            const resPT = currentTask["PageTable" + processNum].find(
                (row) => parseInt(row.Index) === PTE
            );
            ans.push({ index: 0, value: true });
            if (res !== -1) {
                if (resPT?.P === "0") {
                    alert("Ошибка! Данные есть в TLB и отсутствуют в PT");
                    return;
                }
                ans.push({ index: 1, value: true });
                for (let i = 2; i < 14; i++) {
                    ans.push({ index: i, value: false });
                }
                setCurStep(curStep + 14);
                setHighlightRowTLB(res);
            } else {
                ans.push({ index: 2, value: true });
                ans.push({ index: 1, value: false });
                setCurStep(curStep + 3);
            }
            changeCorrectAnswers(ans);
        }

        function stepThree() {
            const PTE = parseInt(
                currentTask["virtualAddress" + processNum].slice(0, 3),
                2
            );
            const ans = [];
            ans.push({ index: 3, value: false });
            ans.push({ index: 4, value: false });
            ans.push({ index: 5, value: false });
            const res = currentTask["PageTable" + processNum].find(
                (row) => parseInt(row.Index) === PTE
            );
            if (res?.P === "1") {
                alert("Ошибка! Данных нет в TLB, но есть в PT");
                return;
            } else {
                ans.push({ index: 6, value: true });
                ans.push({ index: 8, value: true });
                ans.push({ index: 7, value: false });
                setCurStep(curStep + 6);
            }
            changeCorrectAnswers(ans);
        }

        function stepNine() {
            const ans = [];
            ans.push({ index: 9, value: true });
            ans.push({ index: 10, value: false });
            setCurStep(curStep + 2);
            changeCorrectAnswers(ans);
        }

        function stepEleven() {
            const ans = [];
            const PTE = parseInt(
                currentTask["virtualAddress" + processNum].slice(0, 3),
                2
            );
            const res = currentTask["PageTable" + processNum].findIndex(
                (row) => parseInt(row.Index) === PTE
            );
            const taskClone = JSON.parse(JSON.stringify(currentTask));
            taskClone["PageTable" + processNum][res] = {
                Index: res.toString(),
                P: "1",
                physNum: currentTask["physicalAddress" + processNum].slice(
                    0,
                    3
                ),
            };
            setCurrentTask(taskClone);
            setHighlightRowPT(res);
            ans.push({ index: 11, value: true });
            setCurStep(curStep + 1);
            changeCorrectAnswers(ans);
        }

        function stepTwelve() {
            const ans = [];
            let cntP = 0;
            currentTask["TLB"].forEach((row) => {
                if (row.P === "1") cntP++;
            });
            const taskClone = JSON.parse(JSON.stringify(currentTask));
            if (cntP === 6) taskClone["TLB"].shift();
            taskClone["TLB"][cntP === 6 ? 5 : cntP] = processNum
                ? {
                      P: "1",
                      PCID: processNum === "1" ? "01" : "10",
                      virtualNum: currentTask[
                          "virtualAddress" + processNum
                      ]?.slice(0, 3),
                      physNum: currentTask[
                          "physicalAddress" + processNum
                      ]?.slice(0, 3),
                  }
                : {
                      P: "1",
                      virtualNum: currentTask[
                          "virtualAddress" + processNum
                      ]?.slice(0, 3),
                      physNum: currentTask[
                          "physicalAddress" + processNum
                      ]?.slice(0, 3),
                  };
            setCurrentTask(taskClone);
            setHighlightRowTLB(cntP === 6 ? 5 : cntP);
            ans.push({ index: 12, value: cntP === 6 ? true : false });
            ans.push({ index: 13, value: true });
            setCurStep(curStep + 2);
            changeCorrectAnswers(ans);
        }

        function stepFourteen() {
            const ans = [];
            ans.push({ index: 14, value: true });
            setCurStep(curStep + 1);
            changeCorrectAnswers(ans);
        }

        function stepFifteen() {
            alert(
                "Работа с процессом №1 завершена!\n" +
                    "Пожалуйста, выполните задание для процесса №2\n" +
                    "и нажмите на кнопку 'Следующий шаг'!"
            );
            setTLBtmpForProcess2(
                JSON.parse(JSON.stringify(currentTask["TLB"]))
            );
            setUserAnswers(new Array(15).fill(false));
            setCorrectAnswers(new Array(15).fill(null));
            setHighlightRowTLB(-1);
            setHighlightRowPD(-1);
            setHighlightRowPT(-1);
            setProcessNum("2");
            setCurStep(0);
        }
    }

    return (
        <div className="App">
            <AppContext.Provider
                value={{
                    variants,
                    setVariants,
                    variant,
                    setVariant,
                    taskNumber,
                    setTaskNumber,
                    currentTask,
                    setCurrentTask,
                    userAnswers,
                    setUserAnswers,
                    curStep,
                    setCurStep,
                    correctAnswers,
                    setCorrectAnswers,
                    highlightRowTLB,
                    setHighlightRowTLB,
                    highlightRowPD,
                    setHighlightRowPD,
                    highlightRowPT,
                    setHighlightRowPT,
                    processNum,
                    setProcessNum,
                }}
            >
                <TaskSide
                    variants={variants}
                    solver={
                        currentTask?.TLB?.length === 10
                            ? solverType1
                            : solverType2
                    }
                    setUserAnswers={setUserAnswers}
                    setCorrectAnswers={setCorrectAnswers}
                    setCurStep={setCurStep}
                    setHighlightRowTLB={setHighlightRowTLB}
                    setHighlightRowPD={setHighlightRowPD}
                    setHighlightRowPT={setHighlightRowPT}
                    variant={variant}
                    taskNumber={taskNumber}
                    setCurrentTask={setCurrentTask}
                    currentTask={currentTask}
                    processNum={processNum}
                    TLBtmpForProcess2={TLBtmpForProcess2}
                ></TaskSide>
                {variant && !currentTask.isSecondType && (
                    <ArcherContainer>
                        <VisualSide></VisualSide>
                    </ArcherContainer>
                )}
                {variant && currentTask.isSecondType && (
                    <VisualSide2></VisualSide2>
                )}
            </AppContext.Provider>
        </div>
    );
}

export default App;
