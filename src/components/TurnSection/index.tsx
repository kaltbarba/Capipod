import DieIcon from "../../assets/die.svg?react";

import { usePlayersStore, useGameStore } from "../../store";

export default function TurnSection() {
  const { currentPlayerIndex, winner } = useGameStore();
  const { players, rollDieForPlayer, finishPlayerTurn } = usePlayersStore();

  return (
    <section className="border-2 border-border bg-surface flex flex-col justify-center items-center p-8">
      <h2 className="text-content font-medium text-lg text-left w-full mb-4">
        {players[currentPlayerIndex]?.name}'s turn -{" "}
        {players[currentPlayerIndex]?.die
          ? `${players[currentPlayerIndex]?.stepsRemaining} steps remainig`
          : "CLICK ON DIE!"}
      </h2>

      <button
        className={[
          "text-xl rounded mb-4",
          players[currentPlayerIndex]?.die ||
          players[currentPlayerIndex]?.stepsRemaining
            ? "disabled:opacity-30 disabled:cursor-not-allowed"
            : "cursor-pointer ",
        ].join(" ")}
        disabled={
          !!winner ||
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
        <DieIcon
          className={[
            "w-30",
            players[currentPlayerIndex]?.die ? "opacity-50" : "",
          ].join(" ")}
        />
      </button>

      <button
        className={[
          "text-xl bg-button-danger font-semibold border-border px-8 py-4 rounded cursor-pointer w-full",
          !players[currentPlayerIndex]?.die ||
          !!players[currentPlayerIndex]?.stepsRemaining
            ? "disabled:opacity-30 disabled:cursor-not-allowed"
            : "cursor-pointer ",
        ].join(" ")}
        onClick={() => finishPlayerTurn(players[currentPlayerIndex])}
        disabled={
          !!winner ||
          !players[currentPlayerIndex]?.die ||
          !!players[currentPlayerIndex]?.stepsRemaining
        }
      >
        Finish turn
      </button>
    </section>
  );
}
