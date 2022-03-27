import { BISHOP_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { GameContext, GameState, ICardModel, PlayerState } from '../../entity';
import { calculateCardValue } from '../score';

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
};

function bishopEffect(G: GameState) {
  const states = Object.values(G.players);
  const strongestMercenary = findStrongestMercenaryCard(states);
  if (!strongestMercenary) {
    return;
  }
  const strongestMercenaryValue = calculateCardValue(
    states,
    strongestMercenary
  );
  for (let state of states) {
    state.battleLine = state.battleLine.filter(
      (card) =>
        !(
          card.type === MERCENARY_TYPE &&
          calculateCardValue(states, card) === strongestMercenaryValue
        )
    );
  }
}

function findStrongestMercenaryCard(states: PlayerState[]): ICardModel | null {
  const allMercenaryCards = states
    .map((state) => state.battleLine)
    .flat()
    .filter((card) => card.type === MERCENARY_TYPE);
  if (!allMercenaryCards?.length) {
    return null;
  }
  let maxCard = allMercenaryCards[0];
  for (let i = 1; i < allMercenaryCards.length; i++) {
    if (
      calculateCardValue(states, maxCard) <=
      calculateCardValue(states, allMercenaryCards[i])
    ) {
      maxCard = allMercenaryCards[i];
    }
  }
  return maxCard;
}
