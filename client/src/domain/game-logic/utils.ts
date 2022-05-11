import {
  MERCENARY_TYPE,
  SCARECROW_CLASS,
  SURRENDER_CLASS,
  TerritoryStatus,
} from '../../utils/constants';
import {
  GameContext,
  GameState,
  ICardModel,
  PlayerState,
  Territory,
} from '../entity';
import i18n from '../../i18n';

// if the number of unique scores is less than the number of
// player scores then it means that two or more players are tied for the same score
export function isDraw(scores: { playerId: string; score: number }[]): boolean {
  return new Set(scores.map((score) => score.score)).size < scores.length;
}

export function handsEmpty(states: PlayerState[]): boolean {
  return states.map((state) => state.hand).flat().length === 0;
}

export function hasNoMercenaryCards(state: PlayerState) {
  return state.hand.filter((c) => c.type === MERCENARY_TYPE).length === 0;
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

export function battleEnded(states: PlayerState[]): boolean {
  return (
    handsEmpty(states) || surrenderPlayed(states) || allPlayersPassed(states)
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

export function historyState(): GameState {
  return window?.history?.state?.usr;
}

export function battleEndMessage(ctx: GameContext) {
  if (ctx?.gameover?.draw) {
    return i18n.t('Battle.draw');
  } else if (ctx?.gameover?.winner) {
    return `${i18n.t('Battle.wonBy')} P${ctx?.gameover?.winner}`;
  }
  return '';
}

export function gameEndMessage(ctx: GameContext) {
  if (ctx?.gameover?.draw) {
    return i18n.t('Game.draw');
  } else if (ctx?.gameover?.winner) {
    return `${i18n.t('Game.wonBy')} P${ctx?.gameover?.winner}`;
  }
  return '';
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
