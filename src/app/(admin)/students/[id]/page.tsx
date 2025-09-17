"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useStudentStore, Info } from "@/store/useStudentStore";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUniversity,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaWeight,
  FaRulerVertical,
  FaHome,
  FaSchool,
  FaStar,
  FaPenNib,
} from "react-icons/fa";

export default function StudentDetail() {
  const { id } = useParams();
  const { students } = useStudentStore();

  const student: Info | undefined = id
    ? students.find((s) => s.id === id)
    : undefined;

  if (!student)
    return (
      <div className="p-16 text-center text-gray-500 font-medium animate-fadeIn">
        ไม่พบข้อมูลนักเรียน
      </div>
    );

  const renderImages = (images: string[] | undefined, label: string) => {
    if (!images || images.length === 0) return null;
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-500 animate-fadeInUp">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">{label}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md border-2 border-white hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <Image
                src={src}
                alt={`${label} ${idx}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Button */}
        <div className="mb-8 animate-fadeInLeft">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <FaArrowLeft className="h-5 w-5" />
            กลับหน้าหลัก
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Info */}
          <div className="lg:col-span-1 space-y-8 animate-fadeInDown">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center">
              <div className="flex flex-col items-center">
                {student.imgSrc[0] && (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-blue-200 hover:shadow-xl transition-shadow duration-300 mb-6">
                    <Image
                      src={student.imgSrc[0]}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">
                  {student.fnameTH} {student.lnameTH}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {student.fnameEN} {student.lnameEN}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Badge text={`GPA: ${student.gpa}`} color="blue" />
                </div>
              </div>
            </div>

            {/* Education & Personal Info */}
            <div className="space-y-4 animate-fadeInUp delay-200">
              <InfoCard
                icon={<FaGraduationCap />}
                label="คณะ/สาขา"
                value={`${student.faculty} / ${student.department}`}
              />
              <InfoCard
                icon={<FaUniversity />}
                label="มหาวิทยาลัยที่ต้องการเข้า"
                value={student.university}
              />
              <InfoCard
                icon={<FaSchool />}
                label="โรงเรียนเดิม"
                value={student.oldSchool}
              />
              <InfoCard
                icon={<FaHome />}
                label="ที่อยู่"
                value={student.address}
              />
            </div>
          </div>

          {/* Right Column - Skills, Reason & Images */}
          <div className="lg:col-span-2 space-y-12 animate-fadeInUp">
            {/* Skills & Motivation */}
            <Section title="ทักษะพิเศษ / เหตุผลในการสมัคร">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoCard
                  icon={<FaPenNib />}
                  label="ทักษะพิเศษ"
                  value={student.skill}
                />
                <InfoCard
                  icon={<FaStar />}
                  label="เหตุผลในการสมัคร"
                  value={student.reason}
                />
              </div>
            </Section>

            {/* Contact Info */}
            <Section title="ข้อมูลติดต่อ">
              <InfoGrid
                data={[
                  {
                    icon: <FaBirthdayCake />,
                    label: "วันเกิด",
                    value: student.birthDate,
                  },
                  {
                    icon: <FaWeight />,
                    label: "น้ำหนัก",
                    value: `${student.weight} kg`,
                  },
                  {
                    icon: <FaRulerVertical />,
                    label: "ส่วนสูง",
                    value: `${student.height} cm`,
                  },
                  {
                    icon: <FaPhone />,
                    label: "เบอร์โทร",
                    value: student.tel,
                  },
                  {
                    icon: <FaEnvelope />,
                    label: "Email",
                    value: student.email,
                  },
                ]}
              />
            </Section>

            {/* Activity Images */}
            {renderImages(student.imgActivity, "กิจกรรม")}

            {/* Awards / Projects */}
            {renderImages(student.imgAward, "รางวัล / ผลงาน")}
          </div>
        </div>
      </div>
    </main>
  );
}

// Reusable Components
const Badge = ({
  text,
  color,
}: {
  text: string | number;
  color: "blue" | "green" | "purple";
}) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${colors[color]}`}
    >
      {text}
    </span>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 animate-fadeInUp">
    <h2 className="text-3xl font-bold mb-6 text-blue-700">{title}</h2>
    {children}
  </div>
);

const InfoGrid = ({
  data,
}: {
  data: { icon?: React.ReactNode; label: string; value: string | number }[];
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {data.map((item, idx) => (
      <InfoCard
        key={idx}
        icon={item.icon}
        label={item.label}
        value={item.value}
      />
    ))}
  </div>
);

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 transition-shadow duration-300 hover:shadow-lg">
    <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
      {icon}
      {label}
    </p>
    <p className="font-medium text-gray-800 text-lg">{value}</p>
  </div>
);
