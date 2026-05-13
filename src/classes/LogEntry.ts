import type { Coordinate } from "../types";

export default class LogEntry {
  public timestamp: Date;
  public message: string;

  constructor(message: string) {
    this.timestamp = new Date();
    this.message = message;
  }

  static playerMoved({
    playerName,
    coordinate,
    direction,
  }: {
    playerName: string;
    coordinate: Coordinate;
    direction: string;
  }): LogEntry {
    return new LogEntry(
      `${playerName} moved ${direction} to [${coordinate.x}, ${coordinate.y}]`,
    );
  }

  static podDamagedPlayer({
    playerName,
    podName,
    podDamage,
  }: {
    playerName: string;
    podName: string;
    podDamage: number;
  }) {
    return new LogEntry(`${podName} dealt ${podDamage} to ${playerName}`);
  }

  static itemPickedUp({
    playerName,
    itemName,
  }: {
    playerName: string;
    itemName: string;
  }): LogEntry {
    return new LogEntry(`${playerName} picked up ${itemName}`);
  }

  static podActivated(playerName: string, podName: string): LogEntry {
    return new LogEntry(`${playerName} activated ${podName}`);
  }

  static playerRolledDie({
    playerName,
    dieValue,
  }: {
    playerName: string;
    dieValue: number;
  }): LogEntry {
    return new LogEntry(`${playerName} rolled a ${dieValue}`);
  }

  static playerReachedShelter({
    playerName,
  }: {
    playerName: string;
  }): LogEntry {
    return new LogEntry(`${playerName} reached the shelter. Game ended.`);
  }

  static allPodsRevealed(): LogEntry {
    return new LogEntry(`All pods are now visible`);
  }

  static playerHealed({
    playerName,
    amount,
  }: {
    playerName: string;
    amount: number;
  }): LogEntry {
    return new LogEntry(`${playerName} healed for ${amount} HP`);
  }

  static playerUsedItem({
    playerName,
    itemName,
  }: {
    playerName: string;
    itemName: string;
  }): LogEntry {
    return new LogEntry(`${playerName} used ${itemName}`);
  }
}
