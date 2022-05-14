import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameConfig } from '../../utils/game-config';

export interface MenuEntry {
  entries?: MenuEntry[];
  name: string;
  disabled?: boolean;
  onClick?: (name?: string) => void;
}

const PLAYER_ENTRIES = [2, 3, 4, 5, 6];

export function useMainMenu(props?: any) {
  const navigation = useNavigate();
  const [rootMenuEntry] = React.useState<MenuEntry>({
    entries: [
      {
        name: 'Singleplayer (bots)',
        onClick: () => {
          const entry = rootMenuEntry?.entries?.[0];
          if (entry) {
            setMenu(entry);
          }
        },
        entries: [
          ...PLAYER_ENTRIES.map((num) => {
            return {
              name: `${num} players`,
              onClick: () => {
                GameConfig.setConfig({
                  numPlayers: num,
                });
                navigation('/map', { replace: true });
                setMenu(rootMenuEntry);
              },
            };
          }),
          {
            name: 'Back',
            onClick: () => {
              setMenu(rootMenuEntry);
            },
          },
        ],
      },
      {
        name: 'Multiplayer',
        disabled: true,
      },
    ],
    name: 'Main',
    disabled: false,
  });
  const [menu, setMenu] = React.useState<MenuEntry>(rootMenuEntry);

  return { menu };
}
