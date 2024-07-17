import { SelectSwitch, Todo } from '../types/todo';
import AddButton from './AddButton';

interface Props {
    selectSwitch: SelectSwitch;
    setSelectSwitch: React.Dispatch<React.SetStateAction<SelectSwitch>>;
    setCreateWin: React.Dispatch<React.SetStateAction<boolean>>;
    todoList: Todo[];
}

const Footer: React.FC<Props> = ({ selectSwitch, setSelectSwitch, setCreateWin, todoList }) => {
    const handleClick = () => {
        if (selectSwitch.all) {
            setSelectSwitch(prev => ({
                ...prev,
                multi: true,
                all: false,
                multiSelectItems: [],
            }));  
        } else {
            setSelectSwitch(prev => ({
                ...prev,
                multi: !prev.multi,
                multiSelectItems: [],
            }));  
        }
    };

    const handleClickAll = () => {
        if (!selectSwitch.all) {
            setSelectSwitch(prev => ({
                ...prev,
                all: true,
                multi: false,
                multiSelectItems: todoList.map(a => a.id)
            }));
        } else {
            setSelectSwitch(prev => ({
                ...prev,
                all: false,
                multi: false,
                multiSelectItems: []
            }));
        }
    };

    const handleDeleteSelection = () => {
        setSelectSwitch(prev => ({
            ...prev,
            del: true
        }));
    };

    const handleEditSelection = () => {
        setSelectSwitch(prev => ({
            ...prev,
            edit: true
        }))
    }

    return (
        <div className='fixed z-10 md:top-2 md:max-w-[310px] md:right-0 max-[768px]:bottom-0 max-[768px]:left-0 p-2 flex w-full items-center justify-around max-[768px]:shadow-[0_10px_15px_3px_rgba(0,0,0,0.1),0_4px_6px_4px_rgba(0,0,0,0.1)] md:bg-transparent bg-gray-100 max-[768px]:drop-shadow-[0_-1.5px_1.5px_rgba(0,0,0,0.3)]'>
            {/* selection tools */}
            <div className='flex flex-row flex-1 items-center justify-around'>
                <div onClick={handleClick}
                    style={{backgroundColor: selectSwitch.multi ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}}
                    className='outline duration-500 outline-gray-500 border-2 border-gray-300 max-[768px]:p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)] active:bg-yellow-400 cursor-pointer'
                >
                    <div className='border-2 border-dashed border-gray-500 p-1'>
                        Sel
                    </div>
                </div>
                <div onClick={handleClickAll}
                    style={{backgroundColor: selectSwitch.all ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}}
                    className='outline outline-gray-500 border-2 border-gray-300 bg-gray-100 max-[768px]:p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)] cursor-pointer'
                >
                    <div className='border-2 border-dashed border-gray-500 p-1'>
                        All
                    </div>
                </div>
            </div>
            {/* create new todo item */}
            <span onClick={() => setCreateWin(true)}>
                <AddButton />
            </span>
            {/* editing multiple tools */}
            <div className='flex flex-row flex-1 items-center justify-around'>
                {/* delete multiple items */}
                <div onClick={handleDeleteSelection}
                    className='outline outline-gray-500 border-2 border-gray-300 bg-gray-100 max-[768px]:p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)] cursor-pointer'
                >
                    <div className='border-2 border-dashed border-gray-500 p-1'>
                        Del
                    </div>
                </div>

                {/* edit multiple items */}
                {/* <div onClick={handleEditSelection}
                    className='outline outline-gray-500 border-2 border-gray-300 bg-gray-100 p-2 shadow-md drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)]'
                    style={{backgroundColor: selectSwitch.edit ? 'rgb(250 204 21)' : 'rgb(243 244 246)'}}
                >
                    <div className='border-2 border-dashed border-gray-500 p-1'>
                        Edit
                    </div>
                </div> */}
                
            </div>
        </div>
    );
};

export default Footer;
