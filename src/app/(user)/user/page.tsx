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
  FaEnvelope,
} from "react-icons/fa";
// Import Components
import { InputField } from "@/components/form/InputField";
import { ImageUploader } from "@/components/form/ImageUploader";
import { SectionHeader } from "@/components/form/SectionHeader";

type InfoFormData = z.infer<typeof infoSchema>;

export default function Home() {
  const { addStudent } = useStudentStore();
  const [toast, setToast] = useState<string | null>(null);

  // สร้าง state สำหรับ previews ของรูปภาพแต่ละชนิด
  const [profilePreviews, setProfilePreviews] = useState<string[]>([]);
  const [activityPreviews, setActivityPreviews] = useState<string[]>([]);
  const [awardPreviews, setAwardPreviews] = useState<string[]>([]);

  // สร้าง state สำหรับเก็บค่าคณะที่เลือก เพื่อควบคุม Dropdown ของสาขา
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  const facultyDepartments: Record<string, string[]> = {
    วิศวกรรมศาสตร์: [
      "วิศวกรรมคอมพิวเตอร์",
      "วิศวกรรมโยธา",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมเคมี",
      "วิศวกรรมสิ่งแวดล้อม",
    ],
    วิทยาศาสตร์: [
      "วิทยาการคอมพิวเตอร์",
      "ฟิสิกส์",
      "เคมี",
      "ชีววิทยา",
      "คณิตศาสตร์",
      "สถิติ",
      "เทคโนโลยีชีวภาพ",
    ],
    สถาปัตยกรรมศาสตร์: [
      "สถาปัตยกรรม",
      "สถาปัตยกรรมภายใน",
      "ภูมิสถาปัตยกรรม",
      "การออกแบบอุตสาหกรรม",
    ],
    เกษตรศาสตร์: ["พืชสวน", "สัตวบาล", "ส่งเสริมและนิเทศศาสตร์เกษตร"],
    แพทยศาสตร์: ["แพทยศาสตร์"],
    ทันตแพทยศาสตร์: ["ทันตแพทยศาสตร์"],
    เภสัชศาสตร์: ["เภสัชศาสตร์"],
    พยาบาลศาสตร์: ["พยาบาลศาสตร์"],
    สหเวชศาสตร์: ["กายภาพบำบัด", "เทคนิคการแพทย์"],
    สัตวแพทยศาสตร์: ["สัตวแพทยศาสตร์"],
    "อักษรศาสตร์/ศิลปศาสตร์/มนุษยศาสตร์": [
      "ภาษาอังกฤษ",
      "ภาษาจีน",
      "ภาษาญี่ปุ่น",
      "ประวัติศาสตร์",
      "ปรัชญา",
    ],
    นิติศาสตร์: ["นิติศาสตร์"],
    รัฐศาสตร์: ["รัฐประศาสนศาสตร์", "การระหว่างประเทศ"],
    เศรษฐศาสตร์: ["เศรษฐศาสตร์"],
    "บริหารธุรกิจ/พาณิชยศาสตร์และการบัญชี": [
      "การบัญชี",
      "การเงิน",
      "การตลาด",
      "การจัดการ",
    ],
    นิเทศศาสตร์: ["การโฆษณา", "ภาพยนตร์และวิดีโอ", "วารสารศาสตร์"],
    "ครุศาสตร์/ศึกษาศาสตร์": ["การศึกษาปฐมวัย", "มัธยมศึกษา"],
    ศิลปกรรมศาสตร์: ["ทัศนศิลป์", "ดนตรี", "นาฏศิลป์"],
  };

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
      email: "",
      weight: null,
      height: null,
      gpa: null,
      gender: "",
      address: "",
      oldSchool: "",
      skill: "",
      reason: "",
      faculty: "",
      department: "",
      university: "",
      imgSrc: [],
      imgActivity: [],
      imgAward: [],
    },
  });

  const onSubmit = (data: InfoFormData) => {
    const studentData = {
      ...data,
      id: Date.now().toString(),
      imgSrc: data.imgSrc || [],
      imgActivity: data.imgActivity || [],
      imgAward: data.imgAward || [],
      weight: data.weight || 0,
      height: data.height || 0,
      gpa: data.gpa || 0,
    };
    addStudent(studentData);
    setToast("บันทึกข้อมูลเรียบร้อย!");
    setTimeout(() => setToast(null), 3000);

    // ล้างค่าใน react-hook-form
    reset();

    // ล้างค่า previews ใน state ของแต่ละ component ด้วย
    setProfilePreviews([]);
    setActivityPreviews([]);
    setAwardPreviews([]);
  };

  const onInvalid = (errors: FieldErrors<InfoFormData>) => {
    console.log("ข้อผิดพลาดในฟอร์ม:", errors);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-gray-100 to-gray-200 p-6 md:p-12 font-sans">
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
          <div className="mt-8">
            <InputField
              id="email"
              label="อีเมล"
              placeholder="your.email@example.com"
              icon={FaEnvelope}
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
                <option disabled value="">
                  เลือกเพศ
                </option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
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
                // เพิ่ม onChange เพื่อจัดการกับค่าที่เลือก
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  // อัปเดตค่าใน react-hook-form และ state
                  setValue("faculty", selectedValue, { shouldValidate: true });
                  setSelectedFaculty(selectedValue);
                  // ล้างค่าสาขาเมื่อมีการเปลี่ยนคณะ
                  setValue("department", "");
                }}
              >
                <option disabled value="">
                  เลือกคณะ
                </option>
                {Object.keys(facultyDepartments).map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
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
                className={
                  !selectedFaculty
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed input-base"
                    : "input-base"
                }
                disabled={!selectedFaculty}
              >
                <option disabled value="">
                  เลือกสาขา
                </option>
                {/* แสดงเฉพาะสาขาที่เกี่ยวข้องกับคณะที่เลือก */}
                {selectedFaculty &&
                  facultyDepartments[selectedFaculty]?.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
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
                <option disabled value="">
                  เลือกมหาวิทยาลัย
                </option>
                <option value="มหาวิทยาลัยเชียงใหม่">
                  มหาวิทยาลัยเชียงใหม่
                </option>
                <option value="มหาวิทยาลัยแม่โจ้">มหาวิทยาลัยแม่โจ้</option>
                <option value="มหาวิทยาลัยนเรศวร">มหาวิทยาลัยนเรศวร</option>
                <option value="มหาวิทยาลัยพะเยา">มหาวิทยาลัยพะเยา</option>
                <option value="มหาวิทยาลัยราชภัฏเชียงใหม่">
                  มหาวิทยาลัยราชภัฏเชียงใหม่
                </option>
                <option value="มหาวิทยาลัยราชภัฏลำปาง">
                  มหาวิทยาลัยราชภัฏลำปาง
                </option>
                <option value="มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา">
                  มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
                </option>
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
              // ส่ง state และ set state เข้าไป
              previews={profilePreviews}
              setPreviews={setProfilePreviews}
            />
            <ImageUploader
              id="imgActivity"
              label="รูปกิจกรรม"
              multiple
              setValue={setValue}
              errors={errors}
              // ส่ง state และ set state เข้าไป
              previews={activityPreviews}
              setPreviews={setActivityPreviews}
            />
            <ImageUploader
              id="imgAward"
              label="รูปรางวัล / ผลงาน"
              multiple
              setValue={setValue}
              errors={errors}
              // ส่ง state และ set state เข้าไป
              previews={awardPreviews}
              setPreviews={setAwardPreviews}
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
