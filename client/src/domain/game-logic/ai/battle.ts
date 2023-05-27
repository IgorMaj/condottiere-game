import {
  MERCENARY_TYPE,
  SPRING_CLASS,
  WINTER_CLASS,
} from "../../../utils/constants";
import { GameContext, GameState, ICardModel, PlayerState } from "../../entity";
import {
  alreadyHasDrummerInLine,
  battleTeamwork,
  getScarecrow,
  hasOnlyNonMercenaryCards,
  scarecrowPlayed,
  seasonAlreadyActive,
  surrenderOnFirstMove,
} from "../utils";

interface BotMove {
  move: string;
  args?: string[];
}

const nonsensicalMove = (card: ICardModel, G: GameState, ctx: GameContext) =>
  surrenderOnFirstMove(card, ctx) ||
  alreadyHasDrummerInLine(card, G, ctx) ||
  seasonAlreadyActive(card, G, WINTER_CLASS) ||
  seasonAlreadyActive(card, G, SPRING_CLASS);

export const BATTLE_AI = {
  enumerate: (G: GameState, ctx: GameContext) => {
    const botHand = G.players[ctx.currentPlayer].hand;
    const moves: BotMove[] = [];

    if (G.players[ctx.currentPlayer].passed) {
      return moves;
    }

    // if scarecrow is played only the 'scarecrow' move is available
    if (scarecrowPlayed(G.players[ctx.currentPlayer])) {
      generateScarecrowMoves(G.players[ctx.currentPlayer], moves);
    } else {
      if (!battleTeamwork(G)) {
        for (let i = 0; i < botHand.length; i++) {
          if (!nonsensicalMove(botHand[i], G, ctx))
            moves.push({ move: "playCard", args: [botHand[i].id] });
        }
      }
      moves.push({ move: "pass" });
      if (hasOnlyNonMercenaryCards(G.players[ctx.currentPlayer])) {
        moves.push({ move: "discardHand" });
      }
    }
    return moves;
  },
};

function generateScarecrowMoves(state: PlayerState, moves: any[]) {
  const botBattleLine = state.battleLine;
  const scarecrow = getScarecrow(state);
  moves.push({ move: "scarecrow", args: [scarecrow.id] });
  botBattleLine
    .filter((card) => card.type === MERCENARY_TYPE)
    .forEach((mercenary) => {
      moves.push({ move: "scarecrow", args: [scarecrow.id, mercenary.id] });
    });
}
