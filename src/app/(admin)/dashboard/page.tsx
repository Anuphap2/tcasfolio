"use client";

import Link from "next/link";
import { Info, useStudentStore } from "@/store/useStudentStore";
import { useState, useEffect } from "react";
import {
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const { students, setStudents } = useStudentStore();
  const [sortedStudents, setSortedStudents] = useState<Info[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "gpa" | null>(null);
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  useEffect(() => {
    setSortedStudents(students);
    setMounted(true);
  }, [students]);

  useEffect(() => {
    const filtered = students.filter((s) =>
      `${s.fnameTH} ${s.lnameTH}`.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name") {
        const nameA = a.fnameTH + a.lnameTH;
        const nameB = b.fnameTH + b.lnameTH;
        return asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else {
        return asc ? (a.gpa ?? 0) - (b.gpa ?? 0) : (b.gpa ?? 0) - (a.gpa ?? 0);
      }
    });
    setSortedStudents(sorted);
  }, [students, search, sortBy, asc]);

  const handleShowDeleteModal = (id: string) => {
    setStudentToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      const filtered = students.filter((s) => s.id !== studentToDelete);
      setStudents(filtered);
      setIsModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleSort = (key: "name" | "gpa") => {
    if (sortBy === key) {
      setAsc(!asc);
    } else {
      setSortBy(key);
      setAsc(true);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 mt-4 text-center tracking-wide animate-fadeInDown">
          Admin Dashboard
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-bold mb-10 text-center animate-fadeInDown delay-100">
          ข้อมูลผู้สมัคร TCAS 69
        </p>

        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center border border-gray-200 animate-fadeInUp">
          <input
            type="text"
            placeholder="ค้นหาชื่อนักเรียน..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-3 border-2 border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
          />
          <div className="flex items-center gap-4">
            <span className="text-gray-500 font-medium whitespace-nowrap">
              เรียงตาม:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort("name")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  sortBy === "name"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ชื่อ
                {sortBy !== "name" && <FaSort />}
                {sortBy === "name" && asc && <FaSortAlphaDown />}
                {sortBy === "name" && !asc && <FaSortAlphaUp />}
              </button>
              <button
                onClick={() => handleSort("gpa")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  sortBy === "gpa"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                GPA
                {sortBy !== "gpa" && <FaSort />}
                {sortBy === "gpa" && asc && <FaSortNumericDown />}
                {sortBy === "gpa" && !asc && <FaSortNumericUp />}
              </button>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-700">
            <span className="text-blue-600 font-bold text-2xl">
              {sortedStudents.length}
            </span>{" "}
            รายการ
          </p>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 animate-fadeInUp delay-200">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    ชื่อ
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
                    onClick={() => handleSort("gpa")}
                  >
                    GPA
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">คณะ</th>
                  <th className="px-6 py-4 text-left font-semibold">สาขา</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    มหาวิทยาลัย
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-gray-500">
                      ไม่พบข้อมูลนักเรียน
                    </td>
                  </tr>
                ) : (
                  sortedStudents.map((s, idx) => (
                    <tr
                      key={s.id}
                      className={
                        idx % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      }
                    >
                      <td className="px-6 py-4 border-b border-gray-200">
                        <div className="font-medium text-gray-900">
                          {s.fnameTH} {s.lnameTH}
                        </div>
                        <div className="text-sm text-gray-500">
                          {s.fnameEN} {s.lnameEN}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {s.gpa}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                        {s.faculty}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                        {s.department}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                        {s.university}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-center">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/students/${s.id}`}
                            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                            title="ดูรายละเอียด"
                          >
                            <FaEye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleShowDeleteModal(s.id)}
                            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                            title="ลบข้อมูล"
                          >
                            <FaTrashAlt className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl ring-1 ring-black/5 animate-scaleIn">
            <h3 className="text-2xl font-bold text-red-700 mb-4 text-center">
              ยืนยันการลบข้อมูล
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              คุณต้องการลบข้อมูลนักเรียนคนนี้ใช่ไหม
              <br />
              การกระทำนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="cursor-pointer px-6 py-2 bg-red-700 text-white rounded-full font-medium hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 shadow"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
