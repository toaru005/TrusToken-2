import { useState } from 'react';
import Header from './Workspace/Components/Header/Header';
import Login from './Workspace/Pages/Login/Login';
import './App.css';

type Page = 'home' | 'account';

function App() {
  const [secretKey, setSecretKey] = useState('');
  const [page, setPage] = useState<Page>('home');

  const isLoggedIn = secretKey.trim().length > 0;

  const handleLogin = (nextSecretKey: string) => {
    setSecretKey(nextSecretKey);
    setPage('home');
  };

  const handleLogout = () => {
    setSecretKey('');
    setPage('home');
  };

  if (!isLoggedIn) {
    return <Login onSubmitSecret={handleLogin} />;
  }

  return (
    <div className="appShell">
      <Header
        onHomeClick={() => setPage('home')}
        onAccountClick={() => setPage('account')}
        onSecretKeyChange={handleLogout}
      />

      <main className="workspace">
        {page === 'home' ? (
          <section className="panel panelHero">
            <p className="eyebrow">Home</p>
            <h1>TrusToken 管理画面</h1>
            <p className="lead">
              左のアイコンで Home に戻れます。右側にはアカウント切替や秘密鍵変更を置いています。
            </p>

            <div className="cardGrid">
              <article className="infoCard">
                <span className="cardLabel">接続状態</span>
                <strong>秘密鍵が入力されています</strong>
                <span>この画面はログイン後の共通 Header を使います。</span>
              </article>
              <article className="infoCard">
                <span className="cardLabel">次の拡張先</span>
                <strong>アイコン差し替え対応</strong>
                <span>brandIcon プロパティで左側のアイコンを後から差し替えできます。</span>
              </article>
            </div>
          </section>
        ) : (
          <section className="panel panelAccount">
            <p className="eyebrow">Account</p>
            <h1>アカウント設定</h1>
            <p className="lead">
              右側のエリアに、今後アカウント変更や切替の操作を追加していく想定です。
            </p>

            <div className="accountBox">
              <span className="cardLabel">現在の状態</span>
              <strong>プレースホルダー</strong>
              <span>ここにアカウント一覧や秘密鍵の管理機能を追加できます。</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
