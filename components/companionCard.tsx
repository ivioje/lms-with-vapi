'use client';

import { useState } from "react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { Loader2, X } from "lucide-react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject?: string;
  duration: number;
  color: string;
}

const CompanionCard = ({ id, name, topic, duration, subject, color }: CompanionCardProps) => {
  const path = `/companions/${id}`;
  const [bookmarking, setBookmarking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    setBookmarking(true);
    try {
      await addBookmark(id, path);
      setIsBookmarked(true);
    } catch (e) {
        console.error("Failed to bookmark companion:", e);
    }
    setBookmarking(false);
  };

  const handleRemoveBookmark = async () => {
    setBookmarking(true);
    try {
      await removeBookmark(id, path);
      setIsBookmarked(false);
    } catch (e) {
        console.error("Failed to remove bookmark:", e);
    }
    setBookmarking(false);
  };

  return (
    <article className="companion-card" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        {isBookmarked ? (
          <button className="companion-bookmark" onClick={handleRemoveBookmark} disabled={bookmarking}>
            {bookmarking ? (
              <Loader2 size={17} className="animate-spin text-white" />
            ) : (
              <X size={17} className="text-white" />
            )}
          </button>
        ) : (
          <button className="companion-bookmark" onClick={handleBookmark} disabled={bookmarking}>
            {bookmarking ? (
              <Loader2 size={17} className="animate-spin text-white" />
            ) : (
              <Image
                src="/icons/bookmark.svg"
                alt="Bookmark"
                width={12.5}
                height={5}
              />
            )}
        </button>
    )}
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} {duration === 1 ? "minute" : "minutes"}</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;