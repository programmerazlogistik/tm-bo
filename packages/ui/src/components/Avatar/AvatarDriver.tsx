import { cn } from "@muatmuat/lib/utils";

import { IconComponent } from "../IconComponent";
import { ImageComponent } from "../ImageComponent";

interface AvatarDriverAppearance {
  containerClassName?: string;
  photoClassName?: string;
  nameClassName?: string;
  licensePlateClassName?: string;
}

interface AvatarDriverProps {
  name: string;
  image: string;
  licensePlate: string;
  className?: string;
  appearance?: AvatarDriverAppearance;
  withIcon?: boolean;
}

export const AvatarDriver: React.FC<AvatarDriverProps> = ({
  name,
  image,
  licensePlate,
  className,
  appearance = {
    containerClassName: "",
    photoClassName: "",
    nameClassName: "",
    licensePlateClassName: "",
  },
  withIcon = true,
}) => {
  return (
    <div
      className={cn("flex h-10 items-center gap-2 text-neutral-900", className)}
    >
      <ImageComponent
        src={image}
        alt={name}
        width={40}
        height={40}
        className={cn("rounded-full object-cover", appearance.photoClassName)}
        unoptimized
      />

      <div
        className={cn(
          "flex h-full flex-1 flex-col justify-between",
          appearance.containerClassName
        )}
      >
        <p
          className={cn(
            "text-base font-semibold md:text-sm md:font-bold",
            appearance.nameClassName
          )}
        >
          {name}
        </p>

        <div className="flex items-center gap-[2.5px]">
          {withIcon && (
            <IconComponent
              src="/icons/transporter16.svg"
              className="mb-[2px] text-muat-trans-secondary-900"
              width={12}
              height={12}
            />
          )}

          <span
            className={cn(
              "text-xs font-medium md:text-xxs",
              appearance.licensePlateClassName
            )}
          >
            {licensePlate}
          </span>
        </div>
      </div>
    </div>
  );
};
