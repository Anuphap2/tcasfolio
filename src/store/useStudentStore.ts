import { create } from "zustand";

export type Info = {
  id: string;
  fnameTH: string;
  lnameTH: string;
  fnameEN: string;
  lnameEN: string;
  idCard: string;
  birthDate: string;
  email: string;
  tel: string;
  weight: number | null; // เปลี่ยนให้ยอมรับค่า null ได้
  height: number | null; // เปลี่ยนให้ยอมรับค่า null ได้
  gpa: number | null;   // เปลี่ยนให้ยอมรับค่า null ได้
  gender: string;
  address: string;
  oldSchool: string;
  skill: string;
  reason: string;
  faculty: string;
  department: string;
  university: string;
  imgSrc: string[];
  imgActivity?: string[];
  imgAward?: string[];
};

type NewStudent = Omit<Info, "id">;

type StudentStore = {
  students: Info[];
  addStudent: (student: NewStudent) => void;
  updateStudent: (id: string, newInfo: Partial<Info>) => void;
  setStudents: (students: Info[]) => void;
};

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  addStudent: (student) =>
    set((state) => {
      const newStudent: Info = { ...student, id: crypto.randomUUID() };
      const newStudents = [...state.students, newStudent];
      return { students: newStudents }; // ไม่ใช้ localStorage
    }),
  updateStudent: (id, newInfo) =>
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id ? { ...s, ...newInfo } : s
      ),
    })),
  setStudents: (students) => set({ students }),
}));