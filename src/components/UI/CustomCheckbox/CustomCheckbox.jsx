import styles from "./CustomCheckbox.module.css";

function CustomCheckbox({ isChecked, onChange, children, ...props }) {
    return (
        <label className={styles.checkboxWrapper}>
            <input
                {...props}
                type="checkbox"
                checked={isChecked}
                onChange={() => onChange()}
                className={styles.checkboxElement}
            ></input>
            <span>{children}</span>
        </label>
    );
}

export default CustomCheckbox;
