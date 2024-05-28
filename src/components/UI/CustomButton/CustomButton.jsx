import styles from "./CustomButton.module.css";

function CustomButton({ children, ...props }) {
    return (
        <button {...props} className={styles.customButton}>
            {children}
        </button>
    );
}

export default CustomButton;
