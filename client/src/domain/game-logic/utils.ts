import {
  DRUMMER_CLASS,
  MERCENARY_TYPE,
  SCARECROW_CLASS,
  SINGLE_PLAYER_ID,
  SURRENDER_CLASS,
  TerritoryStatus,
} from "../../utils/constants";
import {
  GameContext,
  GameState,
  ICardModel,
  PlayerState,
  Territory,
} from "../entity";
import { State } from "boardgame.io";
import { calculateScores } from "./score";

// if the count of max scores is higher
// than 1 then it means that two or more players are tied for the same score
export function isDraw(scores: { playerId: string; score: number }[]): boolean {
  const maxScore = Math.max(...scores.map((s) => s.score));
  return scores.filter((score) => score.score === maxScore).length > 1;
}

export function handsEmpty(states: PlayerState[]): boolean {
  return states.map((state) => state.hand).flat().length === 0;
}

// discard hand condition
export function hasOnlyNonMercenaryCards(state: PlayerState) {
  return (
    state?.hand?.length > 0 &&
    state.hand.filter((c) => c.type === MERCENARY_TYPE).length === 0
  );
}

export function surrenderPlayed(states: PlayerState[]): boolean {
  return states
    .map((state) => state.battleLine)
    .flat()
    .map((card) => card.class)
    .includes(SURRENDER_CLASS);
}

export function allPlayersPassed(states: PlayerState[]): boolean {
  return states.filter((state) => !state?.passed).length === 0;
}

// no scarecrows in any battle line (all scarecrow effects resolved)
export function noScarecrows(states: PlayerState[]): boolean {
  return (
    states
      .map((state) => state.battleLine)
      .flat()
      .filter((card) => card.class === SCARECROW_CLASS).length === 0
  );
}

export function battleEnded(states: PlayerState[]): boolean {
  return (
    (handsEmpty(states) ||
      surrenderPlayed(states) ||
      allPlayersPassed(states)) &&
    noScarecrows(states)
  );
}

// Note: This method finds the strongest card by type and base value, to avoid
// recursion errors that could be introduced with calculateCardValue method
// Since the battle line strength effects only matter at the end of the battle
// i.e score is just preview so the players can see what it would look like
// The rules seem to make this okay, because all effects are calculated at the battle end
// i.e winter, spring, drummer,with the exception being bishop which does its effect immediately
export function findStrongestMercenaryCard(
  states: PlayerState[]
): ICardModel | null {
  const allMercenaryCards = states
    .map((state) => state.battleLine)
    .flat()
    .filter((card) => card.type === MERCENARY_TYPE);
  if (!allMercenaryCards?.length) {
    return null;
  }
  let maxCard = allMercenaryCards[0];
  for (let i = 1; i < allMercenaryCards.length; i++) {
    if (maxCard.value <= allMercenaryCards[i].value) {
      maxCard = allMercenaryCards[i];
    }
  }
  return maxCard;
}

// if there is scarecrow in the battleline, it has just been played
export function scarecrowPlayed(state: PlayerState): boolean {
  return (
    state.battleLine.filter((card) => card.class === SCARECROW_CLASS).length > 0
  );
}

export function getScarecrow(state: PlayerState): ICardModel {
  return state.battleLine.filter((card) => card.class === SCARECROW_CLASS)[0];
}

export function getCurrentBattleTerritory(territories: Territory[]): Territory {
  return territories.filter(
    (territory: Territory) => territory.status === TerritoryStatus.BATTLE
  )[0];
}

export function getCurrentPopeTerritory(territories: Territory[]): Territory {
  return territories.filter(
    (territory: Territory) => territory.status === TerritoryStatus.POPE
  )[0];
}

export function getPlayerTerritoryCount(
  territories: Territory[],
  playedId: string
): number {
  return territories.filter((t) => t.owner === playedId).length;
}

export function playerWhoStillHaveCardsCount(states: PlayerState[]): number {
  return states.map((state) => state.hand.length).filter((num) => num > 0)
    .length;
}

export function generateBots(
  bot: any,
  numPlayers: number
): Record<string, any> {
  const retVal: Record<string, any> = {};
  Array.from(Array(numPlayers).keys()).forEach((elem) => {
    const indexStr = `${elem + 1}`;
    retVal[indexStr] = bot;
  });
  return retVal;
}

// territory needs to be taken in order to be considered (hence the !! check)
export function isEnemyTerritory(
  territoryName: string,
  territories: Territory[],
  playerID: string
): boolean {
  const ownerId = territories.find((t) => t.name === territoryName)?.owner;
  return !!ownerId && ownerId !== playerID;
}

export function isPlayerTerritory(
  territoryName: string,
  territories: Territory[],
  playerID: string
): boolean {
  return territories.find((t) => t.name === territoryName)?.owner === playerID;
}

export function isPopeState(state: State) {
  const gameState = state.G as GameState;
  return (
    !!gameState.territories.find((t) => t.status === TerritoryStatus.POPE) &&
    !gameState.territories.find((t) => t.status === TerritoryStatus.BATTLE)
  );
}

export function getLastCondottiereOwnerPos(G: GameState): number {
  return Number(
    G.condottiereTokenOwnerHistory[G.condottiereTokenOwnerHistory.length - 1]
  );
}

/**
 *
 * @param G Game State
 * @returns boolean indicating whether the player (id "0") playing against the AI passed
 */
export function singleplayerPassed(G: GameState): boolean {
  return G.players[SINGLE_PLAYER_ID].passed;
}

export function botScoresHigherThanPlayer(G: GameState) {
  const scores = calculateScores(Object.values(G.players));
  const maxBotScore = scores
    .filter((sc) => sc.playerId !== SINGLE_PLAYER_ID)
    .map((sc) => sc.score)
    .reduce((a, b) => Math.max(a, b));
  const playerScore =
    scores.find((sc) => sc.playerId === SINGLE_PLAYER_ID)?.score ?? 0;
  return maxBotScore > playerScore;
}

export function gameStateIsNotDraw(G: GameState) {
  const scores = calculateScores(Object.values(G.players));
  return !isDraw(scores);
}

/**
 *
 * @param G GameState
 * @returns boolean indicating whether the bots should work together to defeat the player and save their resources,
 * by not playing cards and passing instead
 */
export function battleTeamwork(G: GameState) {
  return (
    singleplayerPassed(G) &&
    botScoresHigherThanPlayer(G) &&
    gameStateIsNotDraw(G)
  );
}

/**
 *
 * @param card
 * @param ctx
 * @returns true if the card is of type surrender AND the turn number is equal to 1.
 */
export function surrenderOnFirstMove(card: ICardModel, ctx: GameContext) {
  return card.class === SURRENDER_CLASS && ctx.turn === 1;
}

/**
 *
 * @param card card to be played
 * @param G Game State
 * @param ctx game context
 * @returns true if the card is of class drummer AND drummer is already in the battle line
 */
export function alreadyHasDrummerInLine(
  card: ICardModel,
  G: GameState,
  ctx: GameContext
) {
  return (
    card.class === DRUMMER_CLASS &&
    Boolean(
      G.players[ctx.currentPlayer].battleLine.find(
        (c) => c.class === DRUMMER_CLASS
      )
    )
  );
}

// TODO tests
/**
 *
 * @param card card to be played
 * @param G game state
 * @param seasonClass winter or summer
 * @returns true if there is already a season card active on the battlefield
 */
export function seasonAlreadyActive(
  card: ICardModel,
  G: GameState,
  seasonClass: "winter" | "spring"
) {
  const allCardsInBattle = [
    ...Object.values(G.players).map((p) => p.battleLine),
  ].flat();
  return (
    card.class === seasonClass &&
    Boolean(allCardsInBattle.find((c) => c.class === seasonClass))
  );
}
