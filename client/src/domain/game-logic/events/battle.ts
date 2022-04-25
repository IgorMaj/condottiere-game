import { TerritoryStatus } from '../../../utils/constants';
import { popMultiple } from '../../../utils/methods';
import { GameState, GameContext } from '../../entity';
import { calculateScores } from '../score';
import { battleEnded, getCurrentBattleTerritory, isDraw } from '../utils';
import _ from 'lodash';

export const endIf = (G: GameState, ctx: GameContext) => {
  const playerStates = Object.values(G.players);
  if (!battleEnded(playerStates)) {
    return;
  }

  const scoreObjs = calculateScores(playerStates);
  if (isDraw(scoreObjs)) {
    return { draw: true };
  }

  const maxScore = scoreObjs
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  // find the winner and assign the territory to them
  const winnerId = scoreObjs.find((obj) => obj.score === maxScore)?.playerId;
  return { winner: winnerId };
};

// this method modifies the state after the battle has concluded
// so more battles and rounds can be played
export const afterBattle = (G: GameState, ctx: GameContext): GameState => {
  // update logic (redraw and token)
  G = _.cloneDeep(G);
  G.condottiereTokenOwnerId = '0';
  const players = Object.values(G.players);
  players.forEach((player) => {
    player.battleLine = [];
    player.passed = false;
    if (player.hand.length < 10) {
      const toPop = 10 - player.hand.length;
      player.hand.push(...popMultiple(G.deck, toPop));
    }
  });

  // transfer territory into the right hands
  const battleTerritory = getCurrentBattleTerritory(G.territories);
  if (ctx?.gameover?.draw) {
    battleTerritory.status = TerritoryStatus.FREE;
  } else if (ctx?.gameover?.winner) {
    battleTerritory.status = TerritoryStatus.TAKEN;
    battleTerritory.owner = ctx?.gameover?.winner;
  }

  return G;
};
