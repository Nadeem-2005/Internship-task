import express from "express";
import bodyParser from "body-parser";
import Groq from "groq-sdk";
import dotenv from 'dotenv';
import { marked } from "marked";
import { db } from './firebaseAdmin.js'


dotenv.config();
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(userPrompt) {
    const chatCompletion = await getGroqChatCompletion(userPrompt);
    return (chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(userPrompt) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "llama3-8b-8192",  
    });
}

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/query", async (req,res) => {
    const userPrompt = req.body.prompt;
    let response = marked.parse(await main(userPrompt));

    // Store the userPrompt and apiResponse in Firestore as a pair under the collection
    // named conversations within which the pair is stored 
    try {
        await db.collection('conversations').doc(userPrompt).set({
            userPrompt: userPrompt,
            apiResponse: response,
            // timestamp: new Date() // Add a timestamp for when the entry was created
        });
        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error storing data: ', error);
    }

    res.render("index.ejs", {
        user_prompt : userPrompt,
        llmResponse : response
    }) 
});

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});
