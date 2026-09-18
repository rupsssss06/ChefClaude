export default function Form() {
  return (
    <main>
      <form className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredients"
        />
        <button>Add ingredients</button>
      </form>
    </main>
  );
}
