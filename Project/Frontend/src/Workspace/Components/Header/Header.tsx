import type { ReactNode } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  onHomeClick?: () => void;
  onAccountClick?: () => void;
  onSecretKeyChange?: () => void;
  brandIcon?: ReactNode;
};

export default function Header({
  onHomeClick,
  onAccountClick,
  onSecretKeyChange,
  brandIcon,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.brandButton}
        onClick={onHomeClick}
        aria-label="Homeへ移動"
      >
        <span className={styles.brandIcon} aria-hidden="true">
          {brandIcon ?? 'T'}
        </span>
        <span className={styles.brandText}>TrusToken</span>
      </button>

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} onClick={onSecretKeyChange}>
          秘密鍵変更
        </button>
        <button type="button" className={styles.actionButton} onClick={onAccountClick}>
          アカウント
        </button>
      </div>
    </header>
  );
}