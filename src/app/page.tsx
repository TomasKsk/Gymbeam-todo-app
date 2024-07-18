import Image from "next/image";
import Link from "next/link";

/*
For now, this section is very simple, but the idea was to have a landing/ greeting page
where the user can choose to go to the todos section or statistics - thats ofcourse if I will make it in time
*/

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="text-6xl">
        Welcome to your advanced Todo List
      </div>
      <Link href="/todo-list/main">
        <button className="px-3 py-5 rounded-xl cursor-pointer bg-white text-xl font-bold drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.6)]">
          Click to enter
        </button>
      </Link>
      <div className="text-right text-4xl tracking-widest font-black">
        Where you can create, read, edit, delete your todos and share them between your lists and devices
      </div>
    </main>
  );
}
