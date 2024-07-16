interface Props {
    size: string
};

const AddButton: React.FC<Props> = ({ size }) => {
  return (
    <button style={{fontSize: size, lineHeight: 1}} aria-label='Create todo item' className='flex font-black bg-yellow-400 shadow-md drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.6)] px-3 aspect-square rounded-full'>
        <span className='text-gray-800'>+</span>
    </button>
  )
};

export default AddButton;