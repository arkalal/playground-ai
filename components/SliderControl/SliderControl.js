import React from "react";
import styles from "../Chat.module.scss";

const SliderControl = ({ label, value, setValue, min, max, step = 1 }) => {
  return (
    <div className={styles.sliderControl}>
      <div className={styles.sliderControlHead}>
        <label>{label}</label>
        <span>{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default SliderControl;
