// src/components/form/ImageUploader.tsx

import Image from "next/image";
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { InfoFormData } from "@/types";

// กำหนด Type ของ id ให้ชัดเจนว่าเป็นเพียงแค่ key ที่มีค่าเป็น string[]
type ImageFieldKeys = 'imgSrc' | 'imgActivity' | 'imgAward';

interface ImageUploaderProps {
  id: ImageFieldKeys;
  label: string;
  multiple?: boolean;
  setValue: UseFormSetValue<InfoFormData>;
  errors: FieldErrors<InfoFormData>;
  // เพิ่มพร็อพ setPreviews เข้ามา
  previews: string[];
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

const readFileAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const ImageUploader = ({ id, label, multiple = false, setValue, errors, previews, setPreviews }: ImageUploaderProps) => {
  const error = errors[id];
  const isProfile = id === "imgSrc";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = await Promise.all(
      Array.from(files).map(readFileAsDataURL)
    );
    setPreviews(urls);
    setValue(id, urls, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col">
      <label className="font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="file-input-base"
      />
      {previews.length > 0 && (
        <div className={`flex flex-wrap gap-4 mt-4 animate-fadeIn ${isProfile ? "rounded-full" : ""}`}>
          {previews.map((src, idx) => (
            <div
              key={idx}
              className={`relative ${isProfile ? "w-32 h-32 rounded-full" : "w-28 h-28 rounded-xl"} border-4 border-white shadow-lg overflow-hidden`}
            >
              <Image
                src={src}
                alt={`${label} Preview ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
};