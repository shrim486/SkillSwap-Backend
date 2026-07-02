const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;

        const prompt = `

You are SkillSwap AI Mentor.

You help students with:

- Project ideas
- Career advice
- Learning roadmaps
- Hackathons
- Resume projects
- Programming doubts
- Team building advice

Keep responses friendly, practical, and concise.

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