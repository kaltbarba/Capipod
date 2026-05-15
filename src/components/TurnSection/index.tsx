import DieIcon from "../../assets/die.svg?react";

import { usePlayersStore, useGameStore } from "../../store";

export default function TurnSection() {
  const { revealPods, currentPlayerIndex } = useGameStore();
  const { players, rollDieForPlayer, finishPlayerTurn } = usePlayersStore();

  return (
    <section className="border-2 border-border bg-surface flex flex-col justify-center items-center p-8">
      <DieIcon className="w-30 mb-8" />
      <button
        className={[
          "text-xl bg-button-primary font-semibold border-border px-8 py-4 rounded w-full mb-4",
          players[currentPlayerIndex]?.die ||
          players[currentPlayerIndex]?.stepsRemaining
            ? "disabled:opacity-50 disabled:cursor-not-allowed"
            : "cursor-pointer ",
        ].join(" ")}
        disabled={
          !!(
            players[currentPlayerIndex]?.die ||
            players[currentPlayerIndex]?.stepsRemaining
          )
        }
        onClick={() =>
          !players[currentPlayerIndex]?.stepsRemaining &&
          rollDieForPlayer(players[currentPlayerIndex])
        }
      >
        Roll die
      </button>

      <button
        className={[
          "text-xl bg-button-danger font-semibold border-border px-8 py-4 rounded cursor-pointer w-full",
          !players[currentPlayerIndex]?.die ||
          !!players[currentPlayerIndex]?.stepsRemaining
            ? "disabled:opacity-50 disabled:cursor-not-allowed"
            : "cursor-pointer ",
        ].join(" ")}
        onClick={() => finishPlayerTurn(players[currentPlayerIndex])}
        disabled={
          !players[currentPlayerIndex]?.die ||
          !!players[currentPlayerIndex]?.stepsRemaining
        }
      >
        Finish turn
      </button>

      <button
        className="text-xl bg-gray-50 font-semibold border-border px-8 py-4 rounded cursor-pointer w-full"
        onClick={revealPods}
      >
        Reveal all pods
      </button>
    </section>
  );
}
