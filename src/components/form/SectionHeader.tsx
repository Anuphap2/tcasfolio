// src/components/form/SectionHeader.tsx

interface SectionHeaderProps {
  number: number;
  title: string;
}

export const SectionHeader = ({ number, title }: SectionHeaderProps) => (
  <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-200 pb-2 mb-6">
    <span className="text-blue-600">{number}.</span> {title}
  </h2>
);