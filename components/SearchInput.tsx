'use client'

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { Loader2 } from 'lucide-react';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Debounce user input by 300 ms
        if (searchQuery === '' && pathname === '/companions') {
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ['topic'],
            });
            router.push(newUrl, { scroll: false });
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: searchQuery.trim(),
                });
                router.push(newUrl, { scroll: false });
            }

            // Give the UI a moment to update before hiding spinner
            const idleTimer = setTimeout(() => setIsSearching(false), 400);
            return () => clearTimeout(idleTimer);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-1 px-2 h-fit'>
        {isSearching && <Loader2 size={18} className='animate-spin text-black' />}
        <Image src="/icons/search.svg" alt="search" width={15} height={15} />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search companions..."
          className='outline-none border-none w-[250px] input'
        />
    </div>
  )
}

export default SearchInput