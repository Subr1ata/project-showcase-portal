'use client';

import Header from '@/components/header';
import Home from '../page';
import { SessionProviderProps, useSession } from 'next-auth/react';
import Form from '@/components/create-project/form';

export default function CreateProject({ session }: SessionProviderProps) {
  return (
    <div>
      <Form />
    </div>
  );
}
