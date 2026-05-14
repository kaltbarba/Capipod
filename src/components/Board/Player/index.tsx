import type { Player as PlayerType } from "../../../types";

export default function Player({
  color = "red",
  player,
}: {
  color?: string;
  player: PlayerType;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="80%"
      height="80%"
      className={[player.stepsRemaining > 0 ? "animate-pulse" : ""].join(" ")}
    >
      <circle cx="12" cy="6" r="4" fill={color} />
      <rect x="8" y="11" width="8" height="7" rx="2" fill={color} />
      <rect x="4" y="11" width="4" height="2.5" rx="1.25" fill={color} />
      <rect x="16" y="11" width="4" height="2.5" rx="1.25" fill={color} />
      <rect x="8" y="18" width="3" height="5" rx="1.5" fill={color} />
      <rect x="13" y="18" width="3" height="5" rx="1.5" fill={color} />
    </svg>
  );
}
