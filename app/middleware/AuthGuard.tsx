'use client'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function AuthGuard({ authorised }: { authorised: boolean }) {
  useEffect(() => {
    if (!authorised) {
      toast.error('Please log in to view this page');
      redirect('/sign-in');
    }
  }, [authorised]);

  return null;
}