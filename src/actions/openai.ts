'use server';

import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Ensure this is set in .env.local
});

export const generateCreativePrompt = async (userPrompt: string) => {
    const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of at least 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic.
    Return the output in the following JSON format:

    {
        "outlines": [
            "point 1",
            "point 2",
            "point 3",
            "point 4",
            "point 5",
            "point 6"
        ]
    }
    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
  `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system", content: 'You are a helpful AI that generates outlines for presentation.'
                },
                { role: "user", content: finalPrompt }
            ],
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: false, // Set to true if you want streaming responses
        });

        const response = chatCompletion.choices[0]?.message?.content;

        if (response) {
            try {
                const jsonResponse = JSON.parse(response)
                return {status: 200, data: jsonResponse}
            } catch (error) {
                console.error("Invalid JSON received:", error);
                return {status: 500, error: "Invalid JSON received"}
            }
        }

        return {status: 400, error: "No Content generated."}

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
};
