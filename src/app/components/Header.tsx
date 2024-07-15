export default function Header() {
    const date = new Date()

    return (
        <div className="flex flex-col items-center p-3 bg-gray-100 shadow-lg">
            <h1 className="text-3xl text-gray-900 font-bold">
                Your Todos List
            </h1>
            <div className="w-full text-left">
                {`${date.getDate()}. ${date.toLocaleString('default', { month: 'long' })}`}
            </div>
        </div>
    )
}
