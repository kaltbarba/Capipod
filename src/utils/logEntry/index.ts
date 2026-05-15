import type { Coordinate, LogEntry } from "../../types";

function createLogEntry(message: string): LogEntry {
  return { timestamp: new Date(), message };
}

export function playerMoved({
  playerName,
  coordinate,
  direction,
}: {
  playerName: string;
  coordinate: Coordinate;
  direction: string;
}): LogEntry {
  return createLogEntry(
    `${playerName} moved ${direction} to [${coordinate.x}, ${coordinate.y}]`,
  );
}

export function podDamagedPlayer({
  playerName,
  podName,
  podDamage,
}: {
  playerName: string;
  podName: string;
  podDamage: number;
}): LogEntry {
  return createLogEntry(`${podName} dealt ${podDamage} to ${playerName}`);
}

export function itemPickedUp({
  playerName,
  itemName,
}: {
  playerName: string;
  itemName: string;
}): LogEntry {
  return createLogEntry(`${playerName} picked up ${itemName}`);
}

export function podActivated(playerName: string, podName: string): LogEntry {
  return createLogEntry(`${playerName} activated ${podName}`);
}

export function playerRolledDie({
  playerName,
  dieValue,
}: {
  playerName: string;
  dieValue: number;
}): LogEntry {
  return createLogEntry(`${playerName} rolled a ${dieValue}`);
}

export function playerReachedShelter({
  playerName,
}: {
  playerName: string;
}): LogEntry {
  return createLogEntry(`${playerName} reached the shelter. Game ended.`);
}

export function allPodsRevealed(): LogEntry {
  return createLogEntry(`All pods are now visible`);
}

export function playerHealed({
  playerName,
  amount,
}: {
  playerName: string;
  amount: number;
}): LogEntry {
  return createLogEntry(`${playerName} healed for ${amount} HP`);
}

export function playerUsedItem({
  playerName,
  itemName,
}: {
  playerName: string;
  itemName: string;
}): LogEntry {
  return createLogEntry(`${playerName} used ${itemName}`);
}
