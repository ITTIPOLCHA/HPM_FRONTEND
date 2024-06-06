import styles from "./CardContainer.module.css";

function CardContainer({ children = null, width = "780px", color = ""}) {
  const hightAndwidth = {
    width: width,
    backgroundColor: color,
  };

  return (
    <div className={styles.customStyle} style={hightAndwidth}>
      {children}
    </div>
  );
}

export default CardContainer;
