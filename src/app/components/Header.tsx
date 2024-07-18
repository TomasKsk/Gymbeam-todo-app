import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface Props {
    list: string[];
    page: string;
}

const Header: React.FC<Props> = ({ page, list }) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    const date = new Date();
    const [pageMenu, setPageMenu] = useState<boolean>(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === 'dark') {
            setDarkMode(true)
        } setDarkMode(false)
    },[])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode]);

    return (
        <div className="fixed w-full top-0 flex flex-col px-2 pb-2 z-10 items-center dark:text-gray-100 dark:bg-gray-700 bg-gray-100 shadow-lg">
            <h1 className="text-2xl font-bold pb-2">
                Your Todos
            </h1>
            <div className="flex flex-row gap-4 absolute top-2 left-2 w-full text-left">
                {`${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })}`}
            </div>

            {/* theme toggler */}
            <div onClick={() => setDarkMode(!darkMode)} className="flex flex-row gap-2 items-center absolute md:left-20 right-4 top-6 md:top-2">
                <ThemeToggle darkMode={darkMode} />
                <div className="max-[768px]:hidden">{!darkMode ? 'dark' : 'light'}</div>
            </div>

            <div className="relative flex w-full text-lg md:text-2xl">
                <span>On list:</span>
                <span className="md:relative absolute flex max-[768px]:w-full gap-4 items-center justify-center pl-4 font-bold">
                    {list.length > 1 ? (
                        <>
                            <label htmlFor="list-menu" className="text-2xl">
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </label>
                            <div className="md:hidden relative">
                                <button
                                    id="list-menu"
                                    style={{ transform: pageMenu ? 'rotate(0deg)' : 'rotate(90deg)' }}
                                    onClick={() => setPageMenu(prev => !prev)}
                                >
                                    v
                                </button>
                                <div
                                    style={{
                                        maxHeight: pageMenu ? '200px' : '0px',
                                        border: pageMenu ? '1px solid rgba(0,0,0,0.8)' : '0px solid rgba(0,0,0,0)'
                                    }}
                                    className="overflow-y-scroll text-2xl duration-300 right-0 absolute px-4 dark:bg-gray-600 bg-gray-100"
                                >
                                    <ul>
                                        {list.map((obj, idx) => (
                                            <Link key={`page-select-${idx}`} href={`${obj}`}>
                                                <li className="py-4">{obj}</li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {list.length > 0 && list[0].charAt(0).toUpperCase() + list[0].slice(1)}
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;