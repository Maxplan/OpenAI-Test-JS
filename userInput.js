import OpenAI from "openai";
import readline from "readline";

const key = "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"
const openai = new OpenAI({apiKey: key});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getMessage(query){
    var message = await new Promise((resolve) => {
        rl.question(query, (input) => {
            resolve(input);
        });
    });
    return message;
}

let conversationHistory = [];

async function main()
{
    while (true){

        var message = await getMessage("Enter your question: ").then((message) => {
            return message;
        });

        await conversationHistory.push({role: "user", content: message});

        const completion = await openai.chat.completions.create({
            messages: conversationHistory,
            model: "gpt-4-1106-preview", // Change this to the model you want to use e.g "gpt-3.5-turbo" for gpt 3.5 and "gpt-4-1106-preview" for gpt 4
            temperature: 0.9 // Change temerature depending on what kind of answers you want. Lower temperature means more conservative answers and higher temperature means more creative answers
        });

        var response = completion.choices[0].message.content;

        console.log("AI: " + response)

        conversationHistory.push({ role: "assistant", content: response});
        
    }
}

main();