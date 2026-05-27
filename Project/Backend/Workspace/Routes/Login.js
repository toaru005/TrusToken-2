// 標準モジュール読み込み
import express from 'express';                        // Webサーバーフレームワーク
import path from 'path';                              // パス操作用
import { fileURLToPath } from 'url';                  // ESMで __dirname を作るために必要
// 自作モジュール読み込み
import DBPerf from '../Tools/DBPerf.js';              // DBラッパー
import CreateCookie from '../Tools/CreateCookie.js';  // Cookie作成
import InverseVCM from '../Tools/InverseVCM.js';      // ログイン状態チェックミドルウェア
//Symbol SDK
import { SymbolFacade } from 'symbol-sdk/symbol';
import { PrivateKey } from 'symbol-sdk';

// __dirname 再生成
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express Router 初期化
const router = express.Router();

// JSONリクエストボディをパースできるようにする
router.use(express.json());

// ==========================
// 画面表示ルート
// GET /Login/
// ログイン済みの場合はアクセス拒否（InverseVCM）
// ログイン画面を返却
// ==========================
router.get(
  '/',
  (req, res) => {
    // ==========================
    // 0. Startup Log
    // ==========================
    const logOwner = "/Login/";
    console.log(`\n[${logOwner}] ${logOwner}-API is running!\n`);
    // ==========================
    // 1. Shutdown Log
    // ==========================
    console.log(`\n[${logOwner}] Shutdown!\n`);

    // ページを配って終了
    res.sendFile( path.join(__dirname, "..", "..", "..", "Frontend", "dist", "index.html") );
  }
);

// ==========================
// ログイン処理ルート
// POST /Login/Submit
// フロントエンドから送信された UserID と Password を受け取る
// DBからユーザー情報を取得
// ハッシュ検証後にクッキーを発行
// ==========================
router.post(
  '/Submit',
  async (req, res) => {

  // ==========================
  // 0. Startup Log
  // ==========================
  const logOwner = "/Login/Submit";
  console.log(`\n[${logOwner}] ${logOwner}-API is running!\n`);

  // ===============================
  // 1. 秘密鍵を受け取る
  // ===============================
  const { privateKey } = req.body;
  if (!privateKey) {
    return res.status(400).json({
      message: "Bad Request: privateKeyが不足しています。"
    });
  }
  

  // ==========================
  // 2. 秘密鍵からAddressを取得
  // ==========================

  const Account = facade.createAccount(privateKey);
  const Address = Account.address;

  const {data, error} = await supabase
    .from('users')
    .select('username')
    .eq('address', Address)
    .single();

  if (error) {
    console.error(`[${logOwner}] Error occurred while fetching user info:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  const username = data && data.username ? data.username : null;

    if (username && Account) {

    // ==========================
    //　3. 正しかったらUserID, Addressを含むCookieを返す
    // ==========================
    // Verify Success Log
    console.log(`[${logOwner}] LoginToken is verified!`);
    // Cookie発行
    CreateCookie({
      res,
      cookieName: 'LOGIN_TOKEN',
      payload: { username, Address },
      secretKey: process.env.LOGIN_SECRET,
      deadlineHours: 24, // 1日有効
      httpOnly: true,
      sameSite: 'strict'
    });
    // JSONで成功を返す（フロント側のres.json()に合わせる）
    return res.status(200).json({ message: "Login successful" });

  } else {

    // ==========================
    //　4'. 正しくなかったらErrorを返す
    // ==========================
    //Verify Error Log
    console.error(`[${logOwner}] LoginToken is not verified!`);
    // ==========================
    // 5. Shutdown Log
    // ==========================
    console.log(`\n[${logOwner}] Shutdown!\n`);
    return res.status(400).json({ message: 'Bad Request: 秘密鍵に一致するアドレスがありません。' });

  }
});

// Routerエクスポート
export default router;