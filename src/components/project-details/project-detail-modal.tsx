import React, { useContext } from 'react';
import ProjectInfo from './project-info';
import TechList from './tech-list';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../../shared/firebaseConfig';
import { SelectedProjectContext } from '../profile/project-list';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function ProjectDetailModal({
  setShowModal,
}: {
  setShowModal: (e: boolean) => void;
}) {
  const db = getFirestore(app);
  console.log(db);
  const { project, setProject } = useContext(SelectedProjectContext);
  const { data: session } = useSession();
  const router = useRouter();
  const deleteProject = async () => {
    console.log('id => ', project);
    await deleteDoc(doc(db, 'Projects', project.id))
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            className="border-0 rounded-lg 
              shadow-lg relative flex flex-col 
              w-full bg-white outline-none 
              focus:outline-none"
          >
            <div
              className="grid grid-cols-1 
                md:grid-cols-2 p-8"
            >
              <div className="">
                <ProjectInfo />
              </div>
              <TechList />
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-2 rounded-b">
              {session &&
              session.user &&
              session?.user.email == project.email ? (
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={async () => deleteProject()}
                >
                  Delete
                </button>
              ) : null}
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ProjectDetailModal;
