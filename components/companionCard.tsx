'use client';

import { useState } from "react";
import { addBookmark, removeBookmark, archiveCompanion, unarchiveCompanion, deleteCompanionPermanently } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { ArchiveIcon, ArchiveRestore, Loader2, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject?: string;
  duration: number;
  color: string;
  initialBookmarked?: boolean;
  isArchived?: boolean;
}

const CompanionCard = ({ id, name, topic, duration, subject, color, initialBookmarked, isArchived = false }: CompanionCardProps) => {
  const path = `/companions/${id}`;
  const [bookmarking, setBookmarking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked || false);
  const [archiving, setArchiving] = useState(false);
  const router = useRouter();

  const handleBookmark = async () => {
    setBookmarking(true);
    try {
      await addBookmark(id, path);
      toast.success('Companion added to bookmarks');
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
      toast.success('Companion removed from bookmarks');
      setIsBookmarked(false);
    } catch (e) {
        console.error("Failed to remove bookmark:", e);
    }
    setBookmarking(false);
  };

  const handleArchive = async () => {
    if(archiving) return;
    setArchiving(true);
    try {
      await archiveCompanion(id);
      toast.success('Companion archived');
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error('Failed to archive');
    }
    setArchiving(false);
  };

  const handleRestore = async () => {
    if(archiving) return;
    setArchiving(true);
    try {
      await unarchiveCompanion(id);
      toast.success('Companion restored');
      router.refresh();
    } catch(e) {
      console.error(e);
      toast.error('Failed to restore');
    }
    setArchiving(false);
  };

  const handleDelete = async () => {
    if(archiving) return;
    setArchiving(true);
    try {
      await deleteCompanionPermanently(id);
      toast.success('Companion deleted');
      router.refresh();
    } catch(e){
      console.error(e);
      toast.error('Failed to delete');
    }
    setArchiving(false);
  };

  return (
    <article className="companion-card" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <div className="flex gap-2 justify-end">
        {isArchived ? (
            <div className="flex gap-2">
              <button disabled={archiving} className="companion-bookmark" onClick={handleRestore}>
                <ArchiveRestore size={15} className="text-white" />
              </button>
              <button disabled={archiving} className="companion-bookmark" onClick={handleDelete}>
                <Trash size={15} className="text-white" />
              </button>
            </div>
          ) : (
            <button disabled={archiving} className="companion-bookmark" onClick={handleArchive}>
              <ArchiveIcon size={15} className="text-white" />
            </button>
          )
        }
        {isBookmarked ? (
          <button className="companion-bookmark" onClick={handleRemoveBookmark} disabled={bookmarking}>
            {bookmarking ? (
              <Loader2 size={15} className="animate-spin text-white" />
            ) : (
              <X size={15} className="text-white" />
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