'use client';
import React, { useEffect, useState } from 'react';
import { Technology } from './../../data';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import InputTemplate from '@/ui/input-template';
import { app } from './../../shared/firebaseConfig';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Loader from '../loader';

function Form() {
  const [inputs, setInputs] = useState({});
  const [techList, setTechList] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [submit, setSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [docId, setDocId] = useState(Date.now().toString());
  const db = getFirestore(app);
  const storage = getStorage();

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setInputs((values) => ({
        ...values,
        userName: session.user?.name,
      }));
      setInputs((values) => ({
        ...values,
        userImage: session.user?.image,
      }));
      setInputs((values) => ({
        ...values,
        email: session.user?.email,
      }));
      setInputs((values) => ({
        ...values,
        id: docId,
      }));
    }
  }, [docId, session]);
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    console.log('handleChange', name, value);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  useEffect(() => {
    setInputs((values) => ({
      ...values,
      ['techList']: techList,
    }));
    console.log(techList);
  }, [techList]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const storageRef = ref(storage, 'ninja-projects/' + file?.name);
    uploadBytes(storageRef, file as Blob)
      .then((snapshot) => {
        console.log('Uploaded a blob or file !');
      })
      .then((resp) => {
        getDownloadURL(storageRef).then((url) => {
          setInputs((values) => ({ ...values, image: url }));
        });
        setSubmit(true);
      });
  };

  useEffect(() => {
    if (submit == true && inputs['image' as keyof object]) {
      saveDoc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit, inputs]);

  const saveDoc = async () => {
    await setDoc(doc(db, 'Projects', docId), inputs);
    setLoader(false);
    router.push('/profile');
  };

  const onTechSelect = (
    name: string,
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const ischecked = (event.target as HTMLInputElement).checked;
    if (ischecked) {
      setTechList((techList) => [...techList, name]);
    } else {
      let techListItem = techList.filter((item) => item !== name);
      setTechList(techListItem);
    }
  };

  return (
    <div
      className="flex justify-center mt-10
  shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md"
    >
      {loader ? (
        <div className="absolute">
          <Loader />
        </div>
      ) : null}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2
          className="text-[30px]
    font-extrabold text-blue-500"
        >
          ADD PROJECT
        </h2>
        <h2 className="mb-6">Create New Project and Explore with Community</h2>
        <InputTemplate
          required
          type="text"
          name="title"
          placeholder="Title"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <textarea
          name="desc"
          className="w-full mb-4 
      outline-blue-400 border-[1px] 
      p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Write Description here"
        />
        <h2 className="mb-3 font-bold">Select Technology</h2>
        <div className="grid grid-cols-2 mb-4 md:grid-cols-3  ">
          {Technology.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                onClick={(e) => onTechSelect(item.name, e)}
                id="technology"
                type="checkbox"
                className="w-4 h-4"
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
        <InputTemplate
          type="text"
          name="app-demo-url"
          placeholder="App Demo Url"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <InputTemplate
          type="text"
          name="ui-ux-design-url"
          placeholder="UI/UX Design Url(Figma)"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <InputTemplate
          type="text"
          name="yt-url"
          placeholder="Youtube Tutorial Url"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <InputTemplate
          type="text"
          name="github-url"
          placeholder="Github Source Code Url"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <InputTemplate
          type="text"
          name="instagram"
          placeholder="Instagram Profile"
          handleChange={handleChange}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <InputTemplate
          handleChange={(e) =>
            setFile(e && e.target && e.target.files && e.target.files[0])
          }
          type="file"
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 
rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
