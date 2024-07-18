"use client";

import { useState, useEffect } from 'react';

interface Props {
    darkMode: boolean;
}

const ThemeToggle: React.FC<Props> = ({ darkMode }) => {
    return (
        <div
            className='transition-all duration-500 relative w-14 h-7 items-center dark:bg-gray-900 bg-white cursor-pointer rounded-full p-1 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]'

        >
            <div
                className={`transition-transform duration-300 absolute top-0 bg-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] dark:bg-gray-600 size-7 rounded-full shadow-md transform ${
                    darkMode ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
            </div>
        </div>
    );
}

export default ThemeToggle