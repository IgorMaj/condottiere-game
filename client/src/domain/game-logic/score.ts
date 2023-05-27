import {
  COURTESAN_CLASS,
  DRUMMER_CLASS,
  MERCENARY_TYPE,
  SPRING_CLASS,
  WINTER_CLASS,
} from "../../utils/constants";
import { GameState, ICardModel, PlayerState, Territory } from "../entity";
import { findStrongestMercenaryCard, getPlayerTerritoryCount } from "./utils";

export const calculateScores = (
  states: PlayerState[]
): { playerId: string; score: number }[] => {
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push(calculateScore(state, states));
  }

  return retVal;
};
export function calculateScore(
  state: PlayerState,
  states: PlayerState[]
): { playerId: string; score: number } {
  return {
    playerId: state.id,
    score: state.battleLine
      .map((card: ICardModel) => calculateCardValue(states, card))
      .reduce((partialSum, a) => partialSum + a, 0),
  };
}

// Calculates whole card value with all the possible effects
function calculateCardValue(states: PlayerState[], card: ICardModel): number {
  if (card.type !== MERCENARY_TYPE) {
    return card.value;
  }
  const drummerEffect = calculateDrummerEffect(states, card);
  const allCards = states.map((state) => state.battleLine).flat();

  const isWinter = !!allCards.filter((card) => card.class === WINTER_CLASS)
    .length;
  if (isWinter && card.type === MERCENARY_TYPE) {
    return 1 * drummerEffect;
  }

  const isSpring = !!allCards.filter((card) => card.class === SPRING_CLASS)
    .length;
  const strongestMercenary = findStrongestMercenaryCard(states);
  if (isSpring && card.value === strongestMercenary?.value) {
    return card.value * drummerEffect + 3;
  }

  return card.value * drummerEffect;
}

// if there is drummer in the battle line double the card score at the end of the battle
function calculateDrummerEffect(
  states: PlayerState[],
  card: ICardModel
): number {
  const battleLines = states.map((state) => state.battleLine);
  for (let i = 0; i < battleLines.length; i++) {
    const isCardBattleLine = !!battleLines[i].filter(
      (elem) => card.id === elem.id
    ).length;
    const containsDrummer = !!battleLines[i].filter(
      (elem) => elem.class === DRUMMER_CLASS
    ).length;
    if (isCardBattleLine && containsDrummer) {
      // drummer effect
      return 2;
    }
  }
  // no drummer effect
  return 1;
}

export const calculateAdjacentTerritoryCounts = (
  G: GameState
): { playerId: string; score: number }[] => {
  const states = Object.values(G.players);
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push({
      playerId: state.id,
      score: getMaxAdjacentTerritoryCount(G, state.id),
    });
  }

  return retVal;
};

export const calculateTotalTerritoryCounts = (
  G: GameState
): { playerId: string; score: number }[] => {
  const states = Object.values(G.players);
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push({
      playerId: state.id,
      score: getPlayerTerritoryCount(G.territories, state.id),
    });
  }

  return retVal;
};

export const calculateCourtesanCounts = (
  states: PlayerState[]
): { playerId: string; score: number }[] => {
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push({
      playerId: state.id,
      score: state.battleLine.filter((c) => c.class === COURTESAN_CLASS).length,
    });
  }

  return retVal;
};

function getMaxAdjacentTerritoryCount(G: GameState, id: string): number {
  const playerTerritories = G.territories.filter((t) => t.owner === id);
  // we form groups of adjacent territories
  let adjacentGroups: Territory[][] = [];
  for (let territory of playerTerritories) {
    // a territory is a part of the group if any of the territories
    // in the group borders it
    const groups = adjacentGroups.filter((group) =>
      group
        .map((t) => t.adjacentTo)
        .flat()
        .includes(territory.name)
    );
    if (groups.length === 1) {
      groups[0].push(territory);
    } else if (groups.length > 1) {
      // if the territory is a part of two or more groups
      // remove the old groups from the array and
      // add the merged group instead
      const unionGroup = groups.flat();
      unionGroup.push(territory);

      // removal via reference and filter
      adjacentGroups = adjacentGroups.filter(
        (group) => !groups.includes(group)
      );

      adjacentGroups.push(unionGroup);
    } else {
      // otherwise it is a part of its own group
      // which can nonetheless be expanded later
      adjacentGroups.push([territory]);
    }
  }
  // we return the territory count of largest territory group
  return Math.max(...adjacentGroups.map((group) => group.length));
}
