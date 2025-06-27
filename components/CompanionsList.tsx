import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";

import { Companion } from "@/types/index"
import Image from "next/image";
import Link from "next/link";

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
  slice?: number;
}
const CompanionsList = ({ title, companions, classNames, slice }: CompanionsListProps) => {
  return (
    <article className={cn(classNames, "companion-list")}>
        <h2 className="font-bold text-2xl">{title}</h2>

        {companions?.length ? (
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-lg w-2/3">Lessons</TableHead>
                    <TableHead className="text-lg">Subject</TableHead>
                    <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
            </TableHeader>
            <TableBody >
                {companions?.slice(0, slice).map(({ id, subject, name, topic, duration }, index) => (
                    <TableRow key={id+index}>
                        <TableCell>
                        <Link className="cursor-pointer" href={`/companions/${id}`}>
                        {subject}
                        <div className="flex items-center gap-2">
                            <div className="size-[60px] flex items-center justify-center rounded-lg max-md:hidden"
                            style={{ backgroundColor : getSubjectColor(subject) }}>
                                <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={32}
                                height={32}
                            />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-xl">
                                    {name}
                                </p>
                                <p className="text-base">
                                    {topic}
                                </p>
                            </div>
                        </div>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <div className="subject-badge w-fit max-md:hidden">
                            {subject}
                        </div>
                        <div className="flex items-center justify-center rounded-lg p-2 md:hidden" style={{  backgroundColor: getSubjectColor(subject)}}>
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={18}
                                height={18}
                            />
                            <span className="ml-2">{subject}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2 w-full">
                            <p className="text-xl">
                                {duration}
                                <span className="max-md:hidden">{duration <= 1 ? ' min' : ' mins'}</span>
                            </p>
                            <Image
                                src="/icons/clock.svg"
                                alt="duration"
                                width={14}
                                height={14}
                            />
                        </div>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        ) : (<p className="py-5">No {title} found</p>)
        }
        
    </article>
  )
}

export default CompanionsList