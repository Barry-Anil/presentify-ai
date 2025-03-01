import { containerVariants } from '@/lib/constants'
import { Project } from '@prisma/client'
import { motion } from 'framer-motion'
import React from 'react'
import ProjectCard from '../project-card'
// import projectImg from '../../../../public/images/project.jpg'

type Props = {
    projects: Project[]
}

const Projects = ({projects}: Props) => {
    return (
        <motion.div 
            className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3'
            variants={containerVariants}
            initial='hidden'
            animate="visible"
        >
            {projects.map((project, id) => (
                <ProjectCard 
                    key={id} 
                    projectId={project?.id}
                    title={project?.title}
                    createdAt={project?.createdAt.toString()}
                    isDeleted={project?.isDeleted}
                    slideData={project?.slides} 
                    // src={project?.thumbnail || ''}
                    themeName={project?.themeName}

                />
            ))}
        </motion.div>
    )
}

export default Projects