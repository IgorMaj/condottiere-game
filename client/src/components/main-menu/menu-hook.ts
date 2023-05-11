import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GameConfig } from "../../utils/game-config";

export interface MenuEntry {
  entries?: MenuEntry[];
  name: string;
  disabled?: boolean;
  onClick?: (name?: string) => void;
}

const PLAYER_ENTRIES = [2, 3, 4, 5, 6];

export function useMainMenu(props?: any) {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const [rootMenuEntry] = React.useState<MenuEntry>({
    entries: [
      {
        name: t("Menu.singleplayer"),
        onClick: () => {
          const entry = rootMenuEntry?.entries?.[0];
          if (entry) {
            setMenu(entry);
          }
        },
        entries: [
          ...PLAYER_ENTRIES.map((num) => {
            return {
              name: `${num} ${t("Menu.players")}`,
              onClick: () => {
                GameConfig.setConfig({
                  numPlayers: num,
                });
                navigation("/map", { replace: true });
                setMenu(rootMenuEntry);
              },
            };
          }),
          {
            name: t("Menu.back"),
            onClick: () => {
              setMenu(rootMenuEntry);
            },
          },
        ],
      },
      {
        name: t("Menu.multiplayer"),
        onClick: () => {
          navigation("/multiplayer", { replace: true });
          setMenu(rootMenuEntry);
        },
      },
    ],
    name: "Main",
    disabled: false,
  });
  const [menu, setMenu] = React.useState<MenuEntry>(rootMenuEntry);

  return { menu };
}
