import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import ProjectCard from '../project-card';
import ProjectDetailModal from '../project-details/project-detail-modal';

export default function ProjectList({
  userProject,
}: {
  userProject: DocumentData[];
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-10 mb-10">
      {userProject ? (
        <div className="columns-2 md:columns-3 lg:columns-4 mx-auto space-y-3 lg:space-y-4">
          {userProject.map((item, index) => (
            <div onClick={() => setShowModal(true)} key={index}>
              <ProjectCard project={item} />
            </div>
          ))}
        </div>
      ) : null}

      {showModal ? <ProjectDetailModal setShowModal={setShowModal} /> : null}
    </div>
  );
}
