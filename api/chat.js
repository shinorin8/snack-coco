// スナック ココ — 裏方サーバー（APIキーをお客さんから隠す中継所）
// APIキーはコードに書かず、Vercelの環境変数 ANTHROPIC_API_KEY から読みます。

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POSTのみ対応しています" });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: "サーバーにAPIキーが設定されていません（Vercelの環境変数 ANTHROPIC_API_KEY を確認）" });
    return;
  }

  try {
    // リクエストのbodyを読む（環境差に備えて両対応）
    let body = req.body;
    if (!body || typeof body === "string") {
      try { body = JSON.parse(body || "{}"); } catch { body = {}; }
    }
    const prompt = body && body.prompt;
    if (!prompt) {
      res.status(400).json({ error: "promptがありません" });
      return;
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // 一番安いモデル。会話用に十分
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: (data && data.error && data.error.message) || "AI接続エラー" });
      return;
    }

    const text = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
}
