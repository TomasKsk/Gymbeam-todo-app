import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import Link from "next/link";

interface Props {
    list: string[];
    page: string;
}

const Header: React.FC<Props> = ({ page, list }) => {
    const date = new Date();
    const [pageMenu, setPageMenu] = useState<boolean>(false)



    return (
        <div className="fixed w-full top-0 flex flex-col px-2 pb-2 z-10 items-center bg-gray-100 shadow-lg">
            <h1 className="text-3xl text-gray-900 font-bold pb-2">
                Your Todos
            </h1>
            <div className="absolute top-2 left-2 w-full text-left">
                {`${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })}`}
            </div>
            <div className="relative flex w-full text-lg">

            <span className="">
                On list: 
            </span>

            <span className="absolute flex w-full gap-4 items-center justify-center center pl-4 font-bold">
                {
                    list.length > 1 ?
                        <>
                            <div>
                                {page.toUpperCase()}
                            </div>
                            <div className="relative">
                                <button style={{transform: pageMenu ? 'rotate(0deg)' : 'rotate(90deg'}} className="" onClick={() => setPageMenu(prev => !prev)}>
                                    v
                                </button>

                                <div style={{maxHeight: pageMenu ? '100px' : '0px', border: `1px solid ${pageMenu ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)'}`}} className="overflow-hidden duration-300 absolute px-4 bg-gray-100">
                                    <ul>
                                        {
                                            list.map((obj,idx) => {
                                                return(
                                                    <Link key={`page-select-${idx}`} href={`${obj}`}>
                                                        <li>
                                                            {obj}
                                                        </li>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </>
                    :
                        <>
                            {list && list[0]?.toUpperCase()}
                        </>
                }
            </span>
            </div>
        </div>
    )
}

export default Header;