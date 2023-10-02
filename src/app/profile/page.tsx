'use client';
import ProjectList from '@/components/profile/project-list';
import UserInfo from '@/components/profile/user-info';
import {
  DocumentData,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { app } from '../../shared/firebaseConfig';

export default function Profile() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [userProject, setUserProject] = useState<DocumentData[]>([]);

  useEffect(() => {
    getUserProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getUserProject = async () => {
    setUserProject([]);
    if (session && session.user && session.user.email) {
      const q = query(
        collection(db, 'Projects'),
        where('email', '==', session.user?.email),
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot) {
        const newData: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          newData.push(data);
        });
        setUserProject((prevUserProject) => [...prevUserProject, ...newData]);
      }
    }
  };

  return (
    <div className="px-10">
      <UserInfo />

      <ProjectList userProject={userProject} />
    </div>
  );
}
