import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const BibleVerse: React.FC = () => {
  const { t } = useTranslation();
  const verses = t("bibleVerses", { returnObjects: true }) as {
    title: string;
    text: string;
    reference: string;
  }[];

  // Pick a verse index only once to avoid changing on re-renders
  const [verseIndex, setVerseIndex] = useState<number | null>(null);

  useEffect(() => {
    if (verses && verses.length > 0 && verseIndex === null) {
      const randomIndex = Math.floor(Math.random() * verses.length);
      setVerseIndex(randomIndex);
    }
  }, [verses, verseIndex]);

  if (!verses || verses.length === 0 || verseIndex === null) return null;

  const verse = verses[verseIndex];

  return (
    <section
    id="bible-verse"
    className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 relative overflow-hidden"
    >
    <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>    
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-100 to-transparent"></div>
    </div>

    <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <h4 className="font-semibold text-indigo-700 mb-4">{verse.title}</h4>
        <p className="italic text-gray-700 text-lg mb-3">“{verse.text}”</p>
        <p className="text-sm text-indigo-600 font-medium">{verse.reference}</p>
    </div>
    </section>
  );
};
