# スナック ココ ＝ 公開手順書

このフォルダには2つのファイルがあります。
- `index.html` … お店本体（声・会話・お会計・常連記憶）
- `api/chat.js` … 裏方サーバー（APIキーを隠してAIに中継する係）

公開は **コマンド不要・全部ブラウザ** でできます。所要時間はだいたい30〜60分。

---

## ステップ1：GitHubにコードを置く

GitHub＝コードの置き場所（無料）。

1. https://github.com を開く → **Sign up**（メールで登録。Google不要）
2. ログイン後、右上の「＋」→ **New repository**
3. Repository name に `snack-coco` と入力 → **Public** のまま → **Create repository**
4. 次の画面で **「uploading an existing file」** のリンクをクリック
5. このフォルダの **`index.html`** をドラッグ＆ドロップ
6. もう一度アップロード画面に行き、今度は **`api` フォルダごと**（中の `chat.js`）をドラッグ＆ドロップ
   - うまくフォルダで上がらない時は、ファイル名の欄に手で `api/chat.js` と打ってから中身を貼ってもOK
7. 下の **Commit changes** を押す

→ `snack-coco` の中に `index.html` と `api/chat.js` が並んでいれば成功。

---

## ステップ2：Vercelで公開する

Vercel＝サーバーを無料で貸してくれて、URLを作ってくれるサービス。

1. https://vercel.com を開く → **Sign Up** → **Continue with GitHub**（さっきのGitHubと連携）
2. ダッシュボードで **Add New… → Project**
3. さっきの **`snack-coco`** を選んで **Import**
4. ⭐ ここが超重要 ⭐ **Environment Variables（環境変数）** の欄を開いて、APIキーを登録：
   - **Name（名前）**： `ANTHROPIC_API_KEY`
   - **Value（値）**： 保存しておいた `sk-ant-…` のキーを貼り付け
   - **Add** を押す
   - ※ これで「キーをコードに書かず、金庫に隠す」状態になります
5. **Deploy** ボタンを押す → 1〜3分待つ
6. 「Congratulations」と出たら成功！ **`https://snack-coco-xxxx.vercel.app`** のようなURLができます

---

## ステップ3：動作確認

- できたURLをスマホ・PCで開く
- ココママたちに話しかける → 声で返事が来れば **公開成功！** 🎉
- このURLは誰に送っても、その人のスマホで動きます

---

## うまくいかない時

- **赤いエラー「接続エラー」や「APIキーが設定されていません」** → ステップ2-4の環境変数を確認。名前は正確に `ANTHROPIC_API_KEY`。直したら Vercelで **Redeploy（再デプロイ）**
- **画面が真っ白** → 1〜2分待って再読み込み（最初だけ部品の読み込みに時間がかかります）

---

## 公開できた後の「仕上げ」（後日でOK）

- 🎵 **BGMを復活**：`index.html` の中の `const BGM_ENABLED = false;` を `true;` に変えてGitHubで保存し直す（公開サイトならYouTube埋め込みが動きます）
- 🎙 **リアルな声**：ニューラル音声（Google/ElevenLabs等）に差し替え
- 🪙 **本物の課金**：Stripeを繋いで、チャージを本物のお金に
- ⚠️ **使用上限の設定**：Anthropicのコンソールで月の上限額を決めておくと安心
