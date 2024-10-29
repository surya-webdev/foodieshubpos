"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();

  const [user, setUser] = useState<string>("vicky@gmail.com");
  const [password, setPassword] = useState<string>("mypassword");

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user && !password) return;

    const res = await axios.post("/api/auth", {
      userName: user,
      password,
    });

    console.log(res);

    if (res.data.message === "success") return router.push("food/starters");
  }
  return (
    <section className="flex flex-col items-center justify-center py-[10%]">
      <div className="flex w-[30rem] flex-col items-center justify-center py-4">
        {/* <h1 className="py-2 text-2xl font-bold">Login into your account</h1>
        <p>
          Don&apos;t have an account?
          <Link className="font-semibold underline" href="/signup">
            Login
          </Link>
        </p> */}
      </div>
      <div className="w-[20rem]">
        <form onSubmit={(e) => handler(e)} className="flex w-full flex-col">
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Email
          </label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="email"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="Enter your email"
            required
          />
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="my-4 rounded-md bg-black py-1 text-lg font-semibold text-white"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
