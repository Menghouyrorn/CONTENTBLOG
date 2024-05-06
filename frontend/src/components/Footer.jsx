import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs'

const FooterCom = () => {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:gird-col-1">
                    <div className="mt-5">
                        <Link to={'/'} className='self-center text-lg sm:text-xl font-semibold dark:text-white whitespace-nowrap'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white to-pink-500'>MENGHOUY</span>
                            CONTENT
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link target="_blank" rel="noopener noreferrer" href="https://pdf-convert-to-editable-text-that-support-khmer-language.vercel.app/">
                                    PDF Converter
                                </Footer.Link>
                                <Footer.Link
                                    href="https://github.com/Menghouyrorn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Menghouy Rorn
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Foller us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://github.com/Menghouyrorn">
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href="https://discord.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Discord
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="#"
                                >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link
                                    href="#"
                                >
                                    Terms &amp; Conditions
                                </Footer.Link>

                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Menghouy Rorn Content blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="" icon={BsFacebook} />
                        <Footer.Icon href="" icon={BsInstagram} />
                        <Footer.Icon href="" icon={BsTwitterX} />
                        <Footer.Icon href="" icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterCom