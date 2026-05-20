import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { PlayerConfig } from "../../types";

export default function PlayerSetupDialog({
  isOpen,
  onOpenChange,
  title,
  colors,
  onSubmit,
}: {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title: string;
  colors: `#${string}`[];
  onSubmit: (config: PlayerConfig) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<`#${string}`>(colors[0]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), color });
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content
          aria-describedby={undefined}
          className="w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-element border border-border rounded p-6 focus:outline-none"
        >
          <Dialog.Title className="text-content font-bold text-lg mb-4">
            {title}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="player-name" className="text-content text-sm">
                Name
              </label>
              <input
                id="player-name"
                type="text"
                maxLength={16}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border border-border rounded px-3 py-2 text-content placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-content text-sm mb-2">Color</legend>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <label
                    key={c}
                    className={[
                      "w-8 h-8 rounded-full border-2 transition-transform block cursor-pointer hover:scale-105",
                      color === c
                        ? "border-white scale-110"
                        : "border-transparent",
                    ].join(" ")}
                    style={{ backgroundColor: c }}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={c}
                      checked={color === c}
                      onChange={() => setColor(c)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={!name.trim()}
              className="py-2 bg-amber-300 text-black font-bold rounded uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-amber-200 transition-colors"
            >
              Confirm
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
