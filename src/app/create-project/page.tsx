'use client';

import Header from '@/components/header';
import Home from '../page';
import { SessionProviderProps, useSession } from 'next-auth/react';

export default function CreateProject({ session }: SessionProviderProps) {
  return <div>Create Project</div>;
}
