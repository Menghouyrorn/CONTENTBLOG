import { Button } from "flowbite-react"


function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">Want to learn more about React js?</h2>
        <p className="text-gray-500 my-2">Checkout these resourse with React js project</p>
        <Button gradientDuoTone={'purpleToPink'} className="rounded-tl-xl rounded-bl-none">
            <a href="https://pdf-convert-to-editable-text-that-support-khmer-language.vercel.app/" target="_blank" rel="onopener noreferrer">Learn More</a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://media.licdn.com/dms/image/D5612AQFSPUPv4Gcv_A/article-cover_image-shrink_720_1280/0/1690548047583?e=2147483647&v=beta&t=Mx7u9dxwvUM_PjIzw0GfD9Tkzl4yC2Xoh6xZdO3SRXM" alt="React js"/>
      </div>
    </div>
  )
}

export default CallToAction
