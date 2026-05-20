import type { FC, SVGProps } from "react";

export default function ItemButton({
  quantity,
  disabled,
  onClick,
  iconComponent,
}: {
  quantity: number;
  disabled: boolean;
  onClick: () => void;
  iconComponent: FC<SVGProps<SVGSVGElement>>;
}) {
  const Icon = iconComponent;
  return (
    <button
      className={[
        "w-14 h-8 border border-border bg-secondary-800 mr-2 flex justify-center items-center relative disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer",
        disabled ? "opacity-30 " : "cursor-pointer",
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {quantity > 0 ? (
        <>
          <Icon width="24" height="24" />
          <div className="absolute top-0 right-2 rounded-full bg-orange-600 text-sm w-4 h-4 inline-flex justify-center items-center">
            {quantity}
          </div>
        </>
      ) : null}
    </button>
  );
}
