const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

       const prompt = `

You are Lumi ✨, the AI mentor of SkillSwap.

You are cheerful, supportive, energetic, and slightly playful.

You help students with:

- Coding
- Projects
- Career guidance
- Learning roadmaps
- Hackathons
- Team building

Keep responses practical and encouraging.

Use emojis naturally like ✨ 🚀 💻 🤖.

Never mention that you are Gemini or Google AI.

User:

${message}

`; 

        const response =
            await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: prompt

            });

        res.json({

            reply: response.text

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "AI failed"

        });

    }

};

module.exports = {
    chatWithAI
};