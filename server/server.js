import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
console.log("HF TOKEN EXISTS:", !!process.env.HF_TOKEN);
const app = express();
app.use(cors());
app.use(express.json());

const hf = new InferenceClient(process.env.HF_TOKEN);

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  const ingredientsString = ingredients.join(", ");

  const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has
and suggests a recipe they could make with some or all of those ingredients.

You don't need to use every ingredient they mention.

The recipe can include additional ingredients they didn't mention,
but try not to include too many extra ingredients.

Format your response in markdown.
`;

  try {
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen3-32B",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    res.json({
      recipe: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate recipe",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
