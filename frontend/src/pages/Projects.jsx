import CallToAction from '../components/CallToAction'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Text recognition without software installation or download. This converter allows you to convert to the Microsoft Word formats DOC and DOCX.</p>
      <CallToAction/>
    </div>
  )
}

export default Projects