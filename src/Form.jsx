import { useState } from "react";
export default function Form() {
  const [ingredients, setIngredients] = useState([]);
  const ingredientsItems = ingredients.map((ing) => <li key={ing}>{ing}</li>);

  function addIngredients(formData) {
    const newIng = formData.get("ingredient");
    setIngredients((prevIng) => [...prevIng, newIng]);
  }

  return (
    <main>
      <form action={addIngredients} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredients"
          name="ingredient"
        />
        <button>Add ingredients</button>
      </form>
      <ul>{ingredientsItems}</ul>
    </main>
  );
}
