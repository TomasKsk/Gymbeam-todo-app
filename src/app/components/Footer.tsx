import { SelectSwitch } from '../types/todo';
import AddButton from './AddButton';

interface Props {
    selectSwitch: SelectSwitch;
    setSelectSwitch: React.Dispatch<React.SetStateAction<SelectSwitch>>;
    setCreateWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<Props> = ({ selectSwitch, setSelectSwitch, setCreateWin }) => {
    const handleClick = (key: keyof SelectSwitch) => {

        const selectArray = key === 'multi' && selectSwitch.multi ? [] : selectSwitch.multiSelectItems

        setSelectSwitch(prev => ({
            ...prev,
            multiSelectItems: selectArray,
            [key]: !prev[key]
        }))
    }

    return (
        <div className='fixed z-10 bottom-0 left-0 p-2 flex w-full items-center justify-around shadow-[0_10px_15px_3px_rgba(0,0,0,0.1),0_4px_6px_4px_rgba(0,0,0,0.1)]  bg-white drop-shadow-[0_-1.5px_1.5px_rgba(0,0,0,0.3)]'>
            
            <div onClick={() => handleClick('multi')} className='outline outline-gray-500 border-2 border-gray-300 bg-gray-100 p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)]'>
                <div className='border-2 border-dashed border-gray-500 p-1'>
                    Sel
                </div>
            </div>

            <div onClick={() => handleClick('all')} className='outline outline-gray-500 border-2 border-gray-300 bg-gray-100 p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)]'>
                <div className='border-2 border-dashed border-gray-500 p-1'>
                    All
                </div>
            </div>
            
            <span onClick={() => setCreateWin(true)}>
                <AddButton size={'3.75rem'} />
            </span>
        </div>
    )
}

export default Footer;