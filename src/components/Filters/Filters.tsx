import { useState } from "react";
import css from "./Filters.module.css";

interface FiltersProps {
  onChange: (filters: {
    type?: string;
    maxReadyTime?: number;
    diet?: string;
    sort?: string;
  }) => void;
}

const Filters = ({ onChange }: FiltersProps) => {
  const [type, setType] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");
  const [diet, setDiet] = useState("");
  const [sort, setSort] = useState("");

  const handleApply = () => {
    onChange({
      type: type || undefined,
      maxReadyTime: maxReadyTime ? Number(maxReadyTime) : undefined,
      diet: diet || undefined,
      sort: sort || undefined,
    });
    setType("");
    setMaxReadyTime("");
    setDiet("");
    setSort("");
  };

  return (
    <form className={css.form}>
      <select
        className={css.field}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="main course">Main course</option>
        <option value="dessert">Dessert</option>
        <option value="side dish">Side dish</option>
        <option value="appetizer">Appetizer</option>
        <option value="salad">Salad</option>
        <option value="bread">Bread</option>
        <option value="breakfast">Breakfast</option>
        <option value="soup">Soup</option>
        <option value="beverage">Beverage</option>
        <option value="sauce">Sauce</option>
        <option value="marinade">Marinade</option>
        <option value="fingerfood">Fingerfood</option>
        <option value="snack">Snack</option>
        <option value="drink">Drink</option>
      </select>
      <input
        className={css.field}
        type="number"
        value={maxReadyTime}
        onChange={(e) => setMaxReadyTime(e.target.value)}
        placeholder="Max ready time (min)"
      />
      <select
        className={css.field}
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
      >
        <option value="">All diets</option>
        <option value="gluten free">Gluten Free</option>
        <option value="keto">Keto</option>
        <option value="vegan">Vegan</option>
      </select>
      <select
        className={css.field}
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="popularity">Most popular</option>
        <option value="time">Fastest</option>
        <option value="healthiness">Healthiness</option>
        <option value="calories">Calories</option>
      </select>
      <button type="button" onClick={handleApply} className={css.button}>
        Apply
      </button>
    </form>
  );
};

export default Filters;
