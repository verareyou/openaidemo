import express from "express";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";

config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);
const app = express();

app.use(cors());

app.get("/:id", async (req, res) => {

  const prompt = req.params.id || "can you help me?";
  console.log(prompt);

  const reso = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(reso.data.choices[0].message.content);
  res.json(reso.data.choices[0].message);

});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
