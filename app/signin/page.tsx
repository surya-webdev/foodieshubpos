"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Signin() {
  //
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<string>("vicky@gmail.com");
  const [password, setPassword] = useState<string>("mypassword");

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user && !password) return;

    try {
      setIsLoading(true);

      const res = await axios.post("/api/auth", {
        userName: user,
        password,
      });

      if (res.data.authorized === false) {
        return toast.error(
          "User is not exist , please check the email and password",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          },
        );
      }

      if (res.data.message === "failed") {
        return toast.error("Server Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }

      if (res.data.message === "success") {
        toast.success("You've Logged in Sucessfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return router.push("food/starters");
      } else {
        return;
      }
    } catch (error) {
  console.error("AUTH ERROR:", error); // ← this shows in Vercel logs
  return Response.json({ message: "failed", error: String(error) }, { status: 500 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center py-[10%]">
      <div className="flex w-[30rem] flex-col items-center justify-center py-4"></div>
      <div className="w-[20rem]">
        <form onSubmit={(e) => handler(e)} className="flex w-full flex-col">
          <label className="py-2 text-lg font-semibold" htmlFor="name">
            Email
          </label>
          <input
            disabled={isLoading}
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
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md border-2 border-black px-2 py-1"
            id="name"
            placeholder="password"
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className="my-4 rounded-md bg-[#d6651f] py-1 text-lg font-semibold text-white"
          >
            {isLoading ? "processing" : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
