import { useRouter } from "next/navigation";

import { IconComponent } from "@muatmuat/ui/IconComponent";

const BackButton = ({ title, onClick }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/cms-homepage/section-promo");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <IconComponent
        className="cursor-pointer text-primary-700"
        onClick={handleBack}
        src="/icons/arrow-left24.svg"
        width={24}
        height={24}
      />
      <h1 className="text-[24px] font-bold text-primary-700">{title}</h1>
    </div>
  );
};

export default BackButton;
