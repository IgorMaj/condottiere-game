import { useTranslation } from "react-i18next";
import { GameContext, Moves, PlayerState } from "../../../domain/entity";
import {
  hasOnlyNonMercenaryCards,
  scarecrowPlayed,
} from "../../../domain/game-logic/utils";
import { isMapPhase } from "../../../utils/client";
import Button from "../../ui/button/Button";

export const DiscardHand = (props: {
  moves: Moves;
  ctx: GameContext;
  state: PlayerState;
}): JSX.Element => {
  const { t } = useTranslation();
  const { moves, ctx, state } = props;
  const isEnabled =
    state.id === ctx.currentPlayer &&
    !scarecrowPlayed(state) &&
    hasOnlyNonMercenaryCards(state) &&
    !isMapPhase(ctx);
  return (
    <Button
      label={t("Battle.discard")}
      onDoubleClick={() => moves?.discardHand()}
      disabled={!isEnabled}
    />
  );
};
