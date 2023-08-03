import { useTranslation } from "react-i18next";
import Dialog from "../ui/dialog/Dialog";
import styles from "./KeepCardsDialog.module.scss";
import Button from "../ui/button/Button";
import { useCallback, useState } from "react";
import { ICardModel, Moves } from "../../domain/entity";
import { Card } from "../cards/Card";

interface IKeepCardsDialogProps {
  cards: ICardModel[];
  moves: Moves;
}

const MAX_CARDS = 2;

const KeepCardsDialog = (props: IKeepCardsDialogProps) => {
  const { cards, moves } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const selectCard = useCallback(
    (id: string) => {
      // limits selection to two cards
      setSelectedCards((prev) => [id, ...prev].slice(0, MAX_CARDS));
    },
    [setSelectedCards]
  );

  return (
    <Dialog isOpen={open}>
      <div className={styles.Container}>
        <div className={styles.ExplanationContainer}>
          <p>{t("KeepCards.explanation")}</p>
        </div>
        <div className={styles.CardListContainer}>
          {cards.map((c) => {
            return (
              <div
                className={`${styles.CardContainer} ${
                  selectedCards.includes(c.id) ? styles.CardSelected : ""
                }`}
                onClick={() => selectCard(c.id)}
                key={c.id}
              >
                <Card model={c} />
              </div>
            );
          })}
        </div>
        <div className={styles.ActionContainer}>
          <div className={styles.ClearContainer}>
            <Button
              onClick={() => setSelectedCards([])}
              label={t("Common.clear")}
            />
          </div>
          <div className={styles.ContinueContainer}>
            <Button
              onClick={() => {
                moves?.keepCards?.(selectedCards);
                setOpen(false);
              }}
              label={t("Common.continue")}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default KeepCardsDialog;
