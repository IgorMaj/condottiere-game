import {
  BISHOP_CLASS,
  MERCENARY_TYPE,
  SPRING_CLASS,
  WINTER_CLASS,
} from '../../../utils/constants';
import { GameContext, GameState, ICardModel } from '../../entity';
import { findStrongestMercenaryCard } from '../utils';

export const pass = (G: GameState, ctx: GameContext) => {
  const playerState = G.players[ctx.currentPlayer];
  playerState.passed = true;
};

export const playCard = (G: GameState, ctx: GameContext, cardId: string) => {
  const playerState = G.players[ctx.currentPlayer];
  // remove the card from hand
  const card = playerState.hand.filter(
    (elem: ICardModel) => elem.id === cardId
  )?.[0];
  if (!card) {
    return;
  }
  playerState.hand = playerState.hand.filter(
    (elem: ICardModel) => elem.id !== card.id
  );

  // add it to battle line
  playerState.battleLine.push(card);

  // Bishop effect:
  // find the strongest mercenary card in battle
  // then discard all mercenary cards of that power
  if (card.class === BISHOP_CLASS) {
    bishopEffect(G);
  }

  // Winter effect:
  // Discard all spring cards in play
  // all mercenary cards are considered to have a value of 1
  // although drummer or similar may still apply
  if (card.class === WINTER_CLASS) {
    winterEffect(G);
  }

  // Spring effect:
  // Discard all winter cards in play
  // Strongest mercenary cards gain additional three points
  if (card.class === SPRING_CLASS) {
    springEffect(G);
  }
};

// Discard all winter cards
function springEffect(G: GameState) {
  const states = Object.values(G.players);
  states.forEach((state) => {
    state.battleLine = state.battleLine.filter(
      (card) => !(card.class === WINTER_CLASS)
    );
  });
}

// Discard all spring cards
function winterEffect(G: GameState) {
  const states = Object.values(G.players);
  states.forEach((state) => {
    state.battleLine = state.battleLine.filter(
      (card) => !(card.class === SPRING_CLASS)
    );
  });
}

// No score calculation here(just base card strength) because all the other score altering effects
// take effect at the end of the battle
function bishopEffect(G: GameState) {
  const states = Object.values(G.players);
  const strongestMercenary = findStrongestMercenaryCard(states);
  if (!strongestMercenary) {
    return;
  }
  for (let state of states) {
    state.battleLine = state.battleLine.filter(
      (card) =>
        !(
          card.type === MERCENARY_TYPE &&
          card.value === strongestMercenary.value
        )
    );
  }
}
