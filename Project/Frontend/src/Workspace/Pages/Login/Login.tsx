import { useState, type FormEvent } from 'react';
import styles from './Login.module.css';

type LoginProps = {
  onSubmitSecret: (secretKey: string) => void;
};

export default function Login({ onSubmitSecret }: LoginProps) {
  const [secretKey, setSecretKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSecretKey = secretKey.trim();

    if (!trimmedSecretKey) {
      setErrorMessage('秘密鍵を入力してください。');
      return;
    }

    setErrorMessage('');
    onSubmitSecret(trimmedSecretKey);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Login</p>
        <h1 className={styles.title}>秘密鍵を入力してください</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="secretKey">
            秘密鍵
          </label>
          <input
            id="secretKey"
            className={styles.input}
            type="password"
            autoComplete="current-password"
            value={secretKey}
            onChange={(event) => setSecretKey(event.target.value)}
            placeholder="秘密鍵を入力"
          />

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

          <button className={styles.submitButton} type="submit">
            ログイン
          </button>
        </form>
      </section>
    </main>
  );
}