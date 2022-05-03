import {
  BISHOP_CLASS,
  MERCENARY_TYPE,
  SCARECROW_CLASS,
  SPRING_CLASS,
  TerritoryStatus,
  WINTER_CLASS,
} from '../../../utils/constants';
import { GameContext, GameState, ICardModel } from '../../entity';
import {
  findStrongestMercenaryCard,
  getCurrentPopeTerritory,
  hasNoMercenaryCards,
} from '../utils';

export const pass = (G: GameState, ctx: GameContext) => {
  const playerState = G.players[ctx.currentPlayer];
  playerState.passed = true;
  ctx?.events?.endTurn();
};

// if the player doesn't have any mercenary cards
// he has the option to discard his hand
export const discardHand = (G: GameState, ctx: GameContext) => {
  const playerState = G.players[ctx.currentPlayer];
  if (hasNoMercenaryCards(playerState)) {
    // discard hand
    G.discardPile.push(...playerState.hand);
    playerState.hand = [];
    playerState.passed = true;
    ctx?.events?.endTurn();
  }
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
    bishopEffect(G, ctx);
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

  if (!cardHasAdditionalEffects(card)) {
    ctx?.events?.endTurn();
  }
};

// scarecrow has additional effect of taking a mercenary card back to player's hand
function cardHasAdditionalEffects(card: ICardModel): boolean {
  return card.class === SCARECROW_CLASS;
}

// if the player chose to utilize scarecrow
// a mercenary card will end up back in their hand
// It is also possible to just play scarecrow without picking a mercenary card
// which has the effect of discarding the scarecrow card
export const scarecrow = (
  G: GameState,
  ctx: GameContext,
  scarecrowId: string,
  mercenaryId?: string
) => {
  const playerState = G.players[ctx.currentPlayer];

  // if mercenary is chosen, it will go back into hand
  if (mercenaryId) {
    const mercenaryCard = playerState.battleLine.filter(
      (card) => card.id === mercenaryId
    )[0];
    if (mercenaryCard) {
      playerState.battleLine = playerState.battleLine.filter(
        (card) => card.id !== mercenaryId
      );
      playerState.hand.push(mercenaryCard); // mercenary goes back into hand
    }
  }

  // discard the scarecrow from the battleline
  const scarecrowCard = playerState.battleLine.find(
    (c) => c.id === scarecrowId
  );
  if (scarecrowCard) {
    // Update the discard pile
    G.discardPile.push(scarecrowCard);
  }
  playerState.battleLine = playerState.battleLine.filter(
    (card) => card.id !== scarecrowId
  );
  ctx?.events?.endTurn();
};

// Discard all winter cards
function springEffect(G: GameState) {
  const states = Object.values(G.players);
  states.forEach((state) => {
    // Update the discard pile
    G.discardPile.push(
      ...state.battleLine.filter((card) => card.class === WINTER_CLASS)
    );
    state.battleLine = state.battleLine.filter(
      (card) => !(card.class === WINTER_CLASS)
    );
  });
}

// Discard all spring cards
function winterEffect(G: GameState) {
  const states = Object.values(G.players);
  states.forEach((state) => {
    // Update the discard pile
    G.discardPile.push(
      ...state.battleLine.filter((card) => card.class === SPRING_CLASS)
    );
    state.battleLine = state.battleLine.filter(
      (card) => !(card.class === SPRING_CLASS)
    );
  });
}

// No score calculation here(just base card strength)
// because all the other score altering effects
// take effect at the end of the battle
function bishopEffect(G: GameState, ctx: GameContext) {
  const states = Object.values(G.players);
  const strongestMercenary = findStrongestMercenaryCard(states);
  if (!strongestMercenary) {
    return;
  }
  for (let state of states) {
    // Update the discard pile
    G.discardPile.push(
      ...state.battleLine.filter(
        (card) =>
          card.type === MERCENARY_TYPE &&
          card.value === strongestMercenary.value
      )
    );
    state.battleLine = state.battleLine.filter(
      (card) =>
        !(
          card.type === MERCENARY_TYPE &&
          card.value === strongestMercenary.value
        )
    );
  }

  // Award the pope token to the player who played the bishop
  const currentPlayerId = G.players[ctx.currentPlayer].id;
  // remove the pope's protection from the territory if there is one
  const popeTerritory = getCurrentPopeTerritory(G.territories);
  if (popeTerritory) {
    popeTerritory.status = TerritoryStatus.FREE;
  }
  G.popeTokenOwnerId = currentPlayerId;
}
