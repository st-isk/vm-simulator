import { useState, useEffect } from "react";
import styles from "./VisualSide2.module.css";
import ProccessCode from "./VisualSide2/ProccessCode/ProccessCode";
import Tables2 from "./VisualSide2/Tables2/Tables2";

function VisualSide2() {
    const [highlightIndex, setHighlightIndex] = useState(0);
    const [currentProcess, setCurrentProcess] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [randomDigits, setRandomDigits] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (
                highlightIndex === 7 &&
                currentPage === 2 &&
                currentProcess === 0
            ) {
                setCurrentProcess(1);
                setCurrentPage(0);
                setHighlightIndex(0);
                return;
            }
            if (
                highlightIndex === 7 &&
                currentPage === 1 &&
                currentProcess === 1
            ) {
                setCurrentProcess(0);
                setCurrentPage(0);
                setHighlightIndex(0);
                return;
            }
            if (highlightIndex === 7) {
                setCurrentPage(currentPage + 1);
                setHighlightIndex(0);
                return;
            }
            setHighlightIndex(highlightIndex + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, [highlightIndex, currentPage, currentProcess]);

    useEffect(() => {
        setRandomDigits(getRandomDigits());
    }, [currentPage]);

    function getRandomDigits() {
        const result = [];
        while (result.length < 3) {
            const randomDigit = Math.floor(Math.random() * 4);
            if (!result.includes(randomDigit)) {
                result.push(randomDigit);
            }
        }
        return result;
    }

    return (
        <div className={styles.visualSide2Wrapper}>
            <ProccessCode
                highlightIndex={highlightIndex}
                currentProcess={currentProcess}
                currentPage={currentPage}
            ></ProccessCode>
            <Tables2
                isInTLB={!randomDigits.includes(highlightIndex)}
                highlightIndex={highlightIndex}
            ></Tables2>
        </div>
    );
}

export default VisualSide2;
