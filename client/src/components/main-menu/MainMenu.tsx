import styles from './MainMenu.module.scss';
import { MenuEntry, useMainMenu } from './menu-hook';

export const MainMenu = (): JSX.Element => {
  const { menu } = useMainMenu();
  return (
    <div className={styles.Container}>
      {menu?.entries?.map((entry: MenuEntry, index: number) => {
        return (
          <div
            key={index}
            className={entry.disabled ? styles.EntryDisabled : styles.Entry}
            onClick={() => {
              if (!entry.disabled) {
                entry?.onClick?.(entry.name);
              }
            }}
          >
            <div className={styles.Text}>{entry.name}</div>
          </div>
        );
      })}
    </div>
  );
};
