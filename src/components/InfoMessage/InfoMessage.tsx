import css from "./InfoMessage.module.css";

const InfoMessage = () => {
  return (
    <div className={css.box}>
      <p className={css.text}>There are no recipes yet 🙂</p>
    </div>
  );
};

export default InfoMessage;
