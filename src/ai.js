export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch("http://localhost:3000/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    console.log("Backend response:", data);

    return data.recipe;
  } catch (err) {
    console.error("Error generating recipe:", err);
    return "Sorry, I couldn't generate a recipe right now.";
  }
}
