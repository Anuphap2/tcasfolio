"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Login data:", data);

    setTimeout(() => {
      setToast("เข้าสู่ระบบสำเร็จ!");
      router.push("/user");
      setIsLoading(false);
      reset();
      setTimeout(() => {
        setToast(null);
      }, 3000);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-12 font-sans">
      {toast && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl border-l-4 border-green-700 animate-slide-in-right z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-semibold text-sm md:text-base">{toast}</span>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 animate-fadeInUp">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="TCAS Icon"
            width={200}
            height={200}
            className="mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 tracking-wide text-center">
            เข้าสู่ระบบ
          </h1>
          <p className="text-lg text-gray-600 mt-2 text-center">
            เพื่อเข้าสู่ TCAS Portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field with Icon */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">อีเมล</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-gray-400">
                <FaEnvelope className="h-5 w-5" />
              </span>
              <input
                {...register("email")}
                type="email"
                placeholder="youremail@example.com"
                className="input-base pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field with Icon */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">รหัสผ่าน</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-gray-400">
                <FaLock className="h-5 w-5" />
              </span>
              <input
                {...register("password")}
                type="password"
                placeholder="รหัสผ่าน"
                className="input-base pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

         

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full py-3 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Links to other pages */}
        <div className="text-center text-gray-600">
       
          <p className="mt-2">
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              หน้าสำหรับอาจารย์ &rarr;
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}