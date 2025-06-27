'use client'

import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { subjects } from '@/constants';
import { Loader2 } from 'lucide-react';

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get('subject') || '';
    const [subject, setSubject] = useState(query);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Show spinner immediately
        setIsSearching(true);

        const timer = setTimeout(() => {
            let newUrl = '';
            if (subject === 'all' || subject === '') {
                newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['subject'],
                });
            } else {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'subject',
                    value: subject,
                });
            }
            router.push(newUrl, { scroll: false });

            // hide spinner after navigation
            const idleTimer = setTimeout(() => setIsSearching(false), 400);
            return () => clearTimeout(idleTimer);
        }, 300);

        return () => clearTimeout(timer);
    }, [subject, router, searchParams]);

    return (
        <div className="relative flex items-center">
            {isSearching && (
                <Loader2 size={18} className="absolute left-2 animate-spin text-black" />
            )}
            <Select onValueChange={setSubject} value={subject}>
                <SelectTrigger className="input capitalize pl-8">
                    <SelectValue placeholder="subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className='capitalize'>
                        {subject}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilter