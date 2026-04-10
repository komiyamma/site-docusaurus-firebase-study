# 第12章：Remote Configで“AIを安全に運用”する🤖🛡️

この章はひとことで言うと、**「AI機能を、あとから安全に“止める・弱める・変える”ためのリモコンを作る回」**です🎮✨
AIは便利だけど、放置すると **コスト💸 / 連打🌀 / 想定外の出力😇 / モデル変更で急に壊れる⚠️** が起きやすいので、Remote Configで“運用の柵（ガードレール）”を先に作っちゃいます。

---

## この章で作る“AI運用リモコン”🎛️🤖

![AI Remote Control](./picture/firebase_analytics_performance_ts_study_012_ai_remote_control.png)

Remote Configに、こんなパラメータを用意します（例）👇

![AI Parameter Dashboard](./picture/firebase_analytics_performance_ts_study_012_ai_parameters.png)

* `enable_ai_format`（Boolean）… AI整形ボタンの **ON/OFF** 🚦
* `ai_daily_limit`（Number）… 1日あたり **使っていい回数** 🔢
* `ai_prompt_variant`（String）… **プロンプトの型**を切り替える🧩
* `ai_model_name`（String）… **使うモデル名**を切り替える🔁
* `ai_mode`（String）… `off` / `limited` / `full` みたいな **段階運用** 🪜

Remote Configは **String / Boolean / Number / JSON** の型を持てて、条件付き配布（条件・優先順位）もできます。さらに「LLMのモデル名・バージョン文字列を配布する」みたいな用途も公式で例に出ています。([Firebase][1])

---

## 1) 読む：なぜRemote ConfigがAI運用に効くの？🧠🛡️

## ✅ ① “緊急停止ボタン（Kill Switch）”が作れる🧯

![AI Emergency Stop](./picture/firebase_analytics_performance_ts_study_012_ai_emergency_stop.png)

AIで事故っぽい挙動（連打・想定外・コスト急増）が起きたら、**コンソールから `enable_ai_format=false`** にして止められます🚨

## ✅ ② “モデル名をあとから変える”が超大事🔁

![AI Model Switching](./picture/firebase_analytics_performance_ts_study_012_model_switch.png)

FirebaseのAI SDK側でも、**本番前にRemote Configで「モデル名を遠隔で変えられるようにする」**のが強く推奨されています。([Firebase][2])
しかも、モデルには**提供終了（retire）**があり得ます（例：`Gemini 2.0 Flash / Flash-Lite` が **2026-03-31** で退役予定、など）。運用で詰まらないためにも“切替つまみ”は必須です⚠️([Firebase][2])

## ✅ ③ “守り”は2段構えが勝ち🏰

![Two-Layer Defense](./picture/firebase_analytics_performance_ts_study_012_defense_layers.png)

* **UX用のソフト制限**：ボタンを灰色にして「今日はここまで🙂」
* **本命のハード制限**：AI側APIで **レート制限**・**App Check** を効かせる

Firebase AI Logic は **per-userレート制限**も用意されていて、既定では **ユーザーあたり 100 RPM** になっています（調整はクォータ設定）。([Firebase][3])
さらに App Check を組み合わせると「正規アプリからの呼び出し」かどうかを検証でき、AI APIの不正利用対策になります🛡️([Firebase][4])

---

## 2) 手を動かす：Remote Configに“AI運用パラメータ”を作る🎛️🧩

## 2-1. コンソールでパラメータを作成✍️

Remote Configで以下を追加（型もちゃんと選ぶ）👇

* `enable_ai_format`：Boolean（default: `false` 推奨。まずは止めた状態から🚦）
* `ai_daily_limit`：Number（default: `5` とか）
* `ai_prompt_variant`：String（default: `"v1"`）
* `ai_model_name`：String（default: `"gemini-3-flash-preview"` など）
* `ai_mode`：String（default: `"limited"`）

Remote Configは**条件（Condition）**を作って「新規だけON」「テスターだけON」みたいに出し分けできます。条件が複数trueになったときは、**上にある条件が優先**です（ドラッグで順序変更OK）。([Firebase][1])

---

## 3) Reactに組み込む：取得→反映→UI制御🧑‍💻🎚️

Remote Config（Web）は本番だと**12時間が推奨のフェッチ間隔**（取りすぎ防止）になってます。開発中は短くしてOKですが、やりすぎ注意です⚠️([Firebase][5])

## 3-1. Remote Configの読み取り（フック化）🪝

![Fetching AI Flags](./picture/firebase_analytics_performance_ts_study_012_fetch_logic.png)

```ts
// remoteConfigAi.ts
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";
import type { FirebaseApp } from "firebase/app";

export type AiFlags = {
  enableAi: boolean;
  dailyLimit: number;
  promptVariant: string;
  modelName: string;
  mode: "off" | "limited" | "full";
};

export async function loadAiFlags(app: FirebaseApp): Promise<AiFlags> {
  const rc = getRemoteConfig(app);

  // 開発中だけ短く。本番は基本いじらず（推奨は12h）
  rc.settings.minimumFetchIntervalMillis = 60 * 60 * 1000;

  // “アプリ内デフォルト”も必ず持つ（Remote Configが取れない日もある）
  rc.defaultConfig = {
    enable_ai_format: false,
    ai_daily_limit: 5,
    ai_prompt_variant: "v1",
    ai_model_name: "gemini-3-flash-preview",
    ai_mode: "limited",
  };

  await fetchAndActivate(rc);

  const mode = getValue(rc, "ai_mode").asString() as AiFlags["mode"];

  return {
    enableAi: getValue(rc, "enable_ai_format").asBoolean(),
    dailyLimit: getValue(rc, "ai_daily_limit").asNumber(),
    promptVariant: getValue(rc, "ai_prompt_variant").asString(),
    modelName: getValue(rc, "ai_model_name").asString(),
    mode: mode === "off" || mode === "full" ? mode : "limited",
  };
}
```

---

## 4) Firebase AI Logicへつなぐ：モデル名・プロンプトをRemote Configで切替🔁🤖

Firebase AI Logic（Web）は `firebase/ai` から使えます。`getAI` → `getGenerativeModel` → `generateContent` が基本の流れです。([Firebase][2])

## 4-1. Remote Configの `ai_model_name` を使ってモデル選択🎯

```ts
// aiFormat.ts
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import type { FirebaseApp } from "firebase/app";
import type { AiFlags } from "./remoteConfigAi";

function buildPrompt(input: string, variant: string): string {
  // ここを “運用で差し替える” のがポイント🧩
  if (variant === "v2") {
    return `次の文章を、丁寧で短い箇条書きに整形して:\n---\n${input}\n---`;
  }
  // v1
  return `次の文章を、読みやすい文章に整形して:\n---\n${input}\n---`;
}

export async function formatWithAi(app: FirebaseApp, flags: AiFlags, text: string) {
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: flags.modelName });

  const prompt = buildPrompt(text, flags.promptVariant);
  const result = await model.generateContent(prompt);

  return result.response.text();
}
```

> 💡モデル変更・プロンプト変更は“運用で起きる”ので、**Remote Configを通す設計**にしておくと安心です。([Firebase][2])

---

## 5) まずは“やさしい制限”：1日上限でボタンを止める🙂🔒

![Daily Limit UI](./picture/firebase_analytics_performance_ts_study_012_soft_limit.png)

ここは「初心者でも今日からできる」ソフト制限です🎈
（※ガチの不正対策は次章以降でサーバー側も絡めると強い💪）

```ts
// dailyLimit.ts
export function canUseAiToday(key = "ai_uses_today", limit = 5): { ok: boolean; used: number } {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const raw = localStorage.getItem(key);
  const data = raw ? JSON.parse(raw) : { date: today, used: 0 };

  if (data.date !== today) {
    data.date = today;
    data.used = 0;
  }

  return { ok: data.used < limit, used: data.used };
}

export function markAiUsed(key = "ai_uses_today") {
  const today = new Date().toISOString().slice(0, 10);
  const raw = localStorage.getItem(key);
  const data = raw ? JSON.parse(raw) : { date: today, used: 0 };

  if (data.date !== today) {
    data.date = today;
    data.used = 0;
  }

  data.used += 1;
  localStorage.setItem(key, JSON.stringify(data));
}
```

React側では、こんな感じで「上限ならボタン無効＋やさしい文言」にします😊🫶

* `enable_ai_format` が false → そもそもボタン非表示
* true でも `ai_daily_limit` 超え → disabled ＆「今日はここまで🙂」

---

## 6) “本命の守り”も知っておく：レート制限＋App Check🧱🛡️

Remote Configはあくまで「運用のつまみ」🎛️
**本気の防御は AI Logic 側の仕組みとセット**が安心です。

* **per-user レート制限**：既定でユーザーあたり 100 RPM（調整はクォータ設定）([Firebase][3])
* **App Check**：正規アプリからのリクエストか検証し、未認証は拒否🛡️（AI Logicのゲートウェイとして機能）([Firebase][4])

ここまでやると「Remote Configで段階運用しつつ、AI側で乱用も防ぐ」形になって強いです🏰✨

---

## 7) AI導入済み開発（Antigravity / Gemini）での進め方🛸🤖

* Firebaseコンソール内の **AIアシスタンス（Gemini in Firebase / Firebase Studio など）**は、設計・運用の詰まりどころを減らす用途で紹介されています。([Firebase][6])
* **Gemini CLI** はターミナルで調査・実装案づくり・タスク整理までやれる、という位置づけで公式に紹介されています（オープンソース）。([Google Cloud][7])

たとえばGemini CLIに👇みたいに投げると便利です💻✨

* 「Remote ConfigのAI運用パラメータ案を、段階リリース前提で提案して」
* 「`ai_mode` が off のときのUI文言を3案、やさしい感じで」
* 「モデル退役に備えて `ai_model_name` の切替手順をチェックリスト化して」

---

## ミニ課題🧪✨

1. Remote Configに `enable_ai_format` / `ai_daily_limit` / `ai_model_name` を作る🎛️
2. Reactで「AI整形」ボタンを **ON/OFF** できるようにする🚦
3. 1日の上限に達したら、ボタンを無効化して「今日はここまで🙂」を出す🔒
4. `ai_model_name` を変えたとき、**コード変更なしで**モデルが切り替わるのを確認🔁

---

## チェック✅

* [ ] Remote Configが取れないときでも、**アプリ内デフォルト**で安全に動く？🧯
* [ ] 緊急停止（`enable_ai_format=false`）で、AIが止まる？🚨
* [ ] `ai_model_name` を変えるだけで、AI呼び出し先が切り替わる？🎛️
* [ ] 使いすぎ対策（最低でも“ソフト制限”）が入ってる？🙂
* [ ] 次にやるなら「per-user制限」「App Check」まで視野に入ってる？🛡️([Firebase][3])

---

次の章（第13章〜）でA/Bに入っていくとき、**`ai_prompt_variant` を“実験のタネ”として育てられる**ので、この章の仕込みが効いてきます🧪🌱
必要なら「この章のReact画面（フラグ表示・残回数表示・エラーメッセージ）」まで、サンプルUIごと書き起こすよ😊

[1]: https://firebase.google.com/docs/remote-config/parameters "Remote Config Parameters and Conditions  |  Firebase Remote Config"
[2]: https://firebase.google.com/docs/ai-logic/get-started "Get started with the Gemini API using the Firebase AI Logic SDKs  |  Firebase AI Logic"
[3]: https://firebase.google.com/docs/ai-logic/faq-and-troubleshooting "FAQ and troubleshooting  |  Firebase AI Logic"
[4]: https://firebase.google.com/docs/ai-logic/app-check "Implement Firebase App Check to protect APIs from unauthorized clients  |  Firebase AI Logic"
[5]: https://firebase.google.com/docs/remote-config/web/get-started "Get started with Remote Config on Web  |  Firebase Remote Config"
[6]: https://firebase.google.com/docs/ai-assistance/overview?hl=ja&utm_source=chatgpt.com "AI アシスタンスを使用して開発する | Develop with AI assistance"
[7]: https://cloud.google.com/blog/ja/topics/developers-practitioners/introducing-gemini-cli "Gemini CLI : オープンソース AI エージェント | Google Cloud 公式ブログ"
