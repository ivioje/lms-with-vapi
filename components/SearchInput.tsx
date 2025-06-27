'use client'

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const query = searchParams.get('topic');
    
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery
                });
                router.push(newUrl, {scroll: false});
            } else {
                if(pathname === '/companions'){
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });
                    router.push(newUrl, {scroll: false});
                }
            }
        }, 300)
    }, [searchQuery, router, searchParams, pathname])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-1 px-2 h-fit'>
        <Image src="/icons/search.svg" alt="search" width={15} height={15} />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search companions..."
          className='outline-none border-none w-[250px]'
        />
    </div>
  )
}

export default SearchInput