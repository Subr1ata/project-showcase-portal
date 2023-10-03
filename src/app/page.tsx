'use client'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import { DocumentData, collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../shared/firebaseConfig'
import { useEffect, useState } from 'react'
import ProjectList from '../components/profile/project-list'

export default function Home() {

  const db = getFirestore(app)
  const [projects, setProjects] = useState<DocumentData[]>([]);

  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getAllProjects = async () => {
    const q = query(collection(db, "Projects"),
      orderBy("id", "desc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setProjects(projects => [...projects, doc.data()]);
    });
  }
  return (
    <div className='p-5'>
      <h2 className='text-[25px] mb-[-15px]'>All Latest Projects</h2>
      {projects ?
        <ProjectList userProject={projects} /> : null}

    </div>
  )
}
