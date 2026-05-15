import "@testing-library/jest-dom";
import { beforeEach } from "vitest";
import boardStore from "../store/boardStore";
import playerStore from "../store/playerStore";
import logStore from "../store/logStore";
import gameStore from "../store/gameStore";

beforeEach(() => {
  boardStore.setState(boardStore.getInitialState());
  playerStore.setState(playerStore.getInitialState());
  logStore.setState(logStore.getInitialState());
  gameStore.setState(gameStore.getInitialState());

  console.log(logStore.getInitialState());
});
