import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface VerseProps {
  id: string;
  verse: string;
  loc: string;
  text: string;
}

interface StoryProps {
  id: string;
  storyName: string;
  story: string;
}

export const BibleVerse = () => {
  const [verse, setVerse] = useState<VerseProps | null>(null);
  const [biblestory, setBibleStory] = useState<StoryProps | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      const response = await fetch(`${BACKEND_URL}/api/bible/verse`);
      const result = await response.json();
      console.log(result);
      setVerse(result.lastVerse);
    };

    const fetchStory = async () => {
      const response = await fetch(`${BACKEND_URL}/api/bible/story`);
      const result = await response.json();
      console.log(result);
      setBibleStory(result.lastStory);
    };

    fetchVerse();
    fetchStory();
  }, []);

  return (
    <div>
      <div className="bg-slate-100">
        <h1 className="text-2xl md:text-5xl text-center p-8 font-bold">
          Give 2 Minutes of your time to God
        </h1>
      </div>
      <div className="flex justify-center mt-6 md:mt-12">
        <div className="bg-purple-700 w-[400px] md:w-[700px] min-h-fit p-8 md:p-6">
          <p className="text-white font-bold text-xl md:text-3xl">
            {verse?.text || verse?.verse}
          </p>
          <p className="w-full text-right mt-4 text-white font-bold italic">
            {verse?.loc}
          </p>
        </div>
      </div>
      <div className="mt-10 w-full h-full bg-slate-100 p-8 md:p-20">
        <p className="text-2xl md:text-3xl font-bold">
          {biblestory?.storyName}{" "}
        </p>
        <p className="font-medium text-sm md:text-lg mt-3">
          {biblestory?.story}
        </p>
      </div>
    </div>
  );
};
