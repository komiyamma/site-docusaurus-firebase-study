# CLI TOOL Instructions

## 開発環境・利用可能ツール
Windows環境に以下のツールが導入されており、パスが通っています。
作業（検索、分析、変換、閲覧など）に必要に応じて活用してください：
- **基盤/実行環境**: `python` (スクリプト実行), `node`/`npm`/`npx` (JS環境), `git` (バージョン管理), `uv` (Python環境・依存管理)
- **シェル**: `pwsh` (PowerShell Core / 主要な実行環境)
- **検索/操作**: `fd` (find代替), `rg` (grep代替), `sd` (sed代替 / 高速置換)
- **データ/文書**: `jq` (JSON処理), `yq` (YAML処理), `pandoc` (ドキュメント変換)
- **統計/分析**: `cloc` (コード行数集計), `repomix` (AI用パッキング)
- **メディア**: `ffmpeg` (動画・音声), `magick` (画像処理)
- **開発支援/管理**: `gh` (GitHub CLI)
- **AIエージェント拡張ツール**:
  - `gitleaks`: 機密情報の漏洩検知・防止
  - `html2text`: `python -m html2text` で実行。HTMLをプレーンテキストに変換
  - `typos`: 高速なスペルチェック。
  - `ast-grep`: `sg` コマンド。AST（抽象構文木）ベースの構造化コード検索・置換ツール。コードの構造を理解した高度な修正に使用。
