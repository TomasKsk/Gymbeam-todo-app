const AddButton = () => {
  return (
    <button aria-label='Create todo item' 
      className='flex font-black bg-yellow-400 md:text-5xl text-6xl shadow-md drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.6)] md:px-2 px-3 aspect-square rounded-full'
    >
        <span className='text-gray-800'>+</span>
    </button>
  )
};

export default AddButton;