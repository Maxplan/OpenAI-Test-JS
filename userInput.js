import OpenAI from "openai";
import readline from "readline";

const key = "YOUR_API_KEY"
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
            temperature: 0.2, // Change temerature depending on what kind of answers you want. Lower temperature means more conservative answers and higher temperature means more creative answers
            max_tokens: 75, // Change max tokens depending on how long you want the answers to be
            top_p: 1, // Change top p depending on how creative you want the answers to be. Lower top p means more conservative answers and higher top p means more creative answers
            frequency_penalty: 0.5, // Change frequency penalty to penalize the model from repeating the same answer
            presence_penalty: 0.5, // Change presence penalty to penalize the model from talking about new topics
        });

        var response = completion.choices[0].message.content;

        console.log("AI: " + response)

        conversationHistory.push({ role: "assistant", content: response});
        
    }
}

main();
