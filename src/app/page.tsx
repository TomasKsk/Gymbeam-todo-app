import Image from "next/image";
import Link from "next/link";

/*
For now, this section is very simple, but the idea was to have a landing/ greeting page
where the user can choose to go to the todos section or statistics - thats ofcourse if I will make it in time
*/

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/todo-list">
        <button className="px-3 py-5 rounded-xl cursor-pointer bg-white">
          Enter your todoList
        </button>
      </Link>
    </main>
  );
}
