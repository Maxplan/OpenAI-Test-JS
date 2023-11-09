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
            model: "gpt-3.5-turbo"
        });

        var response = completion.choices[0].message.content;

        console.log("AI: " + response)

        conversationHistory.push({ role: "assistant", content: response });
        
    }
}

main();