// src/app/page.tsx
"use client";
import { useForm, FieldErrors } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { useStudentStore } from "@/store/useStudentStore";
import { infoSchema } from "@/schema/personal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Import icons
import {
  FaUser,
  FaIdCard,
  FaBirthdayCake,
  FaPhone,
  FaRulerVertical,
  FaWeight,
  FaMapMarkerAlt,
  FaSchool,
  FaStar,
  FaLightbulb,
  FaEnvelope, // เพิ่ม FaEnvelope
} from "react-icons/fa";
// Import Components
import { InputField } from "@/components/form/InputField";
import { ImageUploader } from "@/components/form/ImageUploader";
import { SectionHeader } from "@/components/form/SectionHeader";

type InfoFormData = z.infer<typeof infoSchema>;

export default function Home() {
  const { addStudent } = useStudentStore();
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      fnameTH: "",
      lnameTH: "",
      fnameEN: "",
      lnameEN: "",
      idCard: "",
      birthDate: "",
      tel: "",
      email: "", // เพิ่ม default value
      weight: null,
      height: null,
      gpa: null,
      gender: "",
      address: "",
      oldSchool: "",
      skill: "",
      reason: "",
      imgSrc: [],
      imgActivity: [],
      imgAward: [],
    },
  });

  const onSubmit = (data: InfoFormData) => {
    // โค้ดส่วนนี้จะทำงานเมื่อฟอร์มถูกต้องแล้ว
    const studentData = {
      ...data,
      id: Date.now().toString(),
      imgSrc: data.imgSrc || [],
      imgActivity: data.imgActivity || [],
      imgAward: data.imgAward || [],
      // แปลงค่า null/undefined ให้เป็น 0 ก่อนส่ง
      weight: data.weight || 0,
      height: data.height || 0,
      gpa: data.gpa || 0,
    };
    addStudent(studentData);
    setToast("บันทึกข้อมูลเรียบร้อย!");
    setTimeout(() => setToast(null), 3000); // ซ่อน toast หลัง 3 วินาที
    reset();
  };
  const onInvalid = (errors: FieldErrors<InfoFormData>) => {
    // โค้ดส่วนนี้จะทำงานเมื่อฟอร์มมีข้อผิดพลาด
    console.log("ข้อผิดพลาดในฟอร์ม:", errors);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-gray-100 to-gray-200 p-6 md:p-12 font-sans">
      {/* Toast - แจ้งเตือนความสำเร็จ */}
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

      {/* Hero Section with Logo */}
      <div className="flex flex-col items-center mb-10 text-center">
        <Image
          src="/assets/logo.png"
          alt="TCAS Logo"
          width={250}
          height={100}
          className="animate-fadeIn"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mt-4 tracking-wide animate-fadeInDown">
          TCAS Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-blue-600 font-bold animate-fadeInDown delay-100">
          ลงทะเบียนรับโอกาสสำหรับทุกคน
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-10 animate-fadeInUp"
      >
        {/* === ข้อมูลส่วนตัว === */}
        <section>
          <SectionHeader number={1} title="ข้อมูลส่วนตัว" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InputField
              id="fnameTH"
              label="ชื่อ (ไทย)"
              placeholder="ชื่อ"
              icon={FaUser}
              register={register}
              errors={errors}
            />
            <InputField
              id="lnameTH"
              label="นามสกุล (ไทย)"
              placeholder="นามสกุล"
              icon={FaUser}
              register={register}
              errors={errors}
            />
            <InputField
              id="fnameEN"
              label="ชื่อ (อังกฤษ)"
              placeholder="ชื่อ"
              icon={FaUser}
              register={register}
              errors={errors}
            />
            <InputField
              id="lnameEN"
              label="นามสกุล (อังกฤษ)"
              placeholder="นามสกุล"
              icon={FaUser}
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InputField
              id="idCard"
              label="เลขบัตรประชาชน"
              placeholder="1234567890123"
              icon={FaIdCard}
              register={register}
              errors={errors}
            />
            <InputField
              id="birthDate"
              label="วันเกิด"
              type="date"
              icon={FaBirthdayCake}
              register={register}
              errors={errors}
            />
            <InputField
              id="tel"
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              icon={FaPhone}
              register={register}
              errors={errors}
            />
          </div>
          <div className="mt-8"> {/* เพิ่ม div เพื่อจัดระเบียบ */}
              <InputField
                id="email"
                label="อีเมล"
                placeholder="your.email@example.com"
                icon={FaEnvelope} // ใช้ FaEnvelope
                register={register}
                errors={errors}
              />
          </div>
        </section>

        {/* === ข้อมูลร่างกายและที่อยู่ === */}
        <section>
          <SectionHeader number={2} title="ข้อมูลเพิ่มเติม" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <InputField
              id="weight"
              label="น้ำหนัก (kg)"
              type="number"
              placeholder="60"
              icon={FaWeight}
              register={register}
              errors={errors}
            />
            <InputField
              id="height"
              label="ส่วนสูง (cm)"
              type="number"
              placeholder="175"
              icon={FaRulerVertical}
              register={register}
              errors={errors}
            />
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="font-semibold text-gray-700 mb-2 flex items-center gap-2"
              >
                เพศ
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="input-base"
              >
                <option value="">เลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่น ๆ">อื่น ๆ</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="font-semibold text-gray-700 mb-2 flex items-center gap-2"
            >
              <FaMapMarkerAlt className="text-blue-500" /> ที่อยู่
            </label>
            <textarea
              id="address"
              placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด"
              rows={3}
              className="input-base"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </section>

        {/* === ข้อมูลการศึกษาและทักษะ === */}
        <section>
          <SectionHeader number={3} title="ข้อมูลการศึกษา" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InputField
              id="oldSchool"
              label="โรงเรียนเดิม"
              placeholder="โรงเรียน..."
              icon={FaSchool}
              register={register}
              errors={errors}
            />
            <InputField
              id="gpa"
              label="GPA"
              placeholder="เช่น 3.50"
              type="number"
              step="0.01"
              icon={FaStar}
              register={register}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <label
                htmlFor="faculty"
                className="font-semibold text-gray-700 mb-2 flex items-center gap-2"
              >
                คณะ
              </label>
              <select
                id="faculty"
                {...register("faculty")}
                className="input-base"
              >
                <option value="">เลือกคณะ</option>
                <option value="วิศวกรรมศาสตร์">วิศวกรรมศาสตร์</option>
                <option value="วิทยาศาสตร์">วิทยาศาสตร์</option>
                <option value="ศิลปศาสตร์">ศิลปศาสตร์</option>
              </select>
              {errors.faculty && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.faculty.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="font-semibold text-gray-700 mb-2 flex items-center gap-2"
              >
                สาขา
              </label>
              <select
                id="department"
                {...register("department")}
                className="input-base"
              >
                <option value="">เลือกสาขา</option>
                <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
                <option value="เคมี">เคมี</option>
                <option value="ฟิสิกส์">ฟิสิกส์</option>
                <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="university"
                className="font-semibold text-gray-700 mb-2 flex items-center gap-2"
              >
                มหาวิทยาลัย
              </label>
              <select
                id="university"
                {...register("university")}
                className="input-base"
              >
                <option value="">เลือกมหาวิทยาลัย</option>
                <option value="จุฬา">จุฬา</option>
                <option value="มหิดล">มหิดล</option>
                <option value="มหาสารคาม">มหาสารคาม</option>
              </select>
              {errors.university && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.university.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* === ความสามารถและเหตุผล === */}
        <section>
          <SectionHeader number={4} title="ความสามารถและแรงบันดาลใจ" />
          <div className="space-y-8">
            <InputField
              id="skill"
              label="ความสามารถพิเศษ"
              placeholder="เช่น วาดรูป, เล่นดนตรี, เขียนโค้ด"
              icon={FaLightbulb}
              register={register}
              errors={errors}
            />
            <InputField
              id="reason"
              label="เหตุผลในการสมัคร"
              placeholder="เหตุผล..."
              type="textarea"
              register={register}
              errors={errors}
            />
          </div>
        </section>

        {/* === การอัปโหลดรูปภาพ === */}
        <section>
          <SectionHeader number={5} title="อัปโหลดรูปภาพ" />
          <div className="space-y-8">
            <ImageUploader
              id="imgSrc"
              label="รูปโปรไฟล์"
              setValue={setValue}
              errors={errors}
            />
            <ImageUploader
              id="imgActivity"
              label="รูปกิจกรรม"
              multiple
              setValue={setValue}
              errors={errors}
            />
            <ImageUploader
              id="imgAward"
              label="รูปรางวัล / ผลงาน"
              multiple
              setValue={setValue}
              errors={errors}
            />
          </div>
        </section>

        {/* ปุ่มส่งฟอร์ม */}
        <button
          type="submit"
          className="cursor-pointer w-full py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          บันทึกข้อมูล
        </button>
      </form>
    </main>
  );
}