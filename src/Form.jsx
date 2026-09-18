export default function Form() {
  const ingredients = ["Chicken", "Oregano", "Tomatoes"];
  const ingredientsItems = ingredients.map((ing) => <li key={ing}>{ing}</li>);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIng = formData.get("ingredient");
    ingredients.push(newIng);
    console.log(ingredients);
  }
  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
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
