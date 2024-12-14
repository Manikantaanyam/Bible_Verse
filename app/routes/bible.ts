import { Hono } from "hono";
import { Context } from "hono";
import { createChatSession, sendMessageToGemini } from "../Gemini";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const bibleRouter = new Hono();

bibleRouter.get("/bible/verse", async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const today = new Date().toISOString().split("T")[0];

    const lastVerse = await prisma.verse.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (lastVerse) {
      const lastVersedDate = lastVerse.createdAt.toISOString().split("T")[0];

      if (lastVersedDate === today) {
        return c.json({ lastVerse });
      }
    }
    const question =
      "Generate a random bible verse  and give it to me in json format. Give the loc and verse individually like this {verse:'', loc:''}. ";

    const chatSession = createChatSession(c);
    const response = await sendMessageToGemini(chatSession, question);
    const jsonString = response.replace(/```json\n|\n```/g, "");
    const bibleVerse = JSON.parse(jsonString);

    const verse = await prisma.verse.create({
      data: {
        verse: bibleVerse.verse,
        loc: bibleVerse.loc,
      },
    });

    c.status(200);
    return c.json(verse);
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({ msg: "internal server error" });
  }
});

bibleRouter.get("/bible/story", async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const today = new Date().toISOString().split("T")[0];

    const lastStory = await prisma.story.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (lastStory) {
      const lastStoryDate = lastStory.createdAt.toISOString().split("T")[0];
      if (today === lastStoryDate) {
        return c.json({ lastStory });
      }
    }

    const story =
      "Please explain a random Bible story , providing a detailed and clear explanation without omitting any key points. Ensure the language is natural, engaging, and easy to understand. Present the story in the following JSON format :{ 'storyName': '', 'story': '' }.";
    const chatSession = createChatSession(c);
    const response = await sendMessageToGemini(chatSession, story);
    const jsonString = response.replace(/```json\n|\n```/g, "");
    const bibleStory = JSON.parse(jsonString);

    const storyFrom = await prisma.story.create({
      data: {
        storyName: bibleStory.storyName,
        story: bibleStory.story,
      },
    });

    return c.json(storyFrom);
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
});

export { bibleRouter };
