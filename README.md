# AmenoNarime

Next.jsで構築されたブログサイトです。

## プロジェクト概要

このウェブサイトでは、技術記事やプロダクト情報を発信しています。

### 主な機能

- **ブログ機能**: MDX形式での技術記事投稿
- **数式表示**: KaTeXによる数学的表現のサポート
- **メディア埋め込み**: 音声、動画、インタラクティブコンテンツの統合
- **レスポンシブデザイン**: 全デバイス対応の美しいUI
- **自動デプロイ**: GitHubプッシュによる自動公開

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ管理**: MDX (next-mdx-remote)
- **数式表示**: KaTeX
- **デプロイ**: Vercel
- **バージョン管理**: GitHub

### 主要な依存関係

```json
{
  "next": "15.1.3",
  "react": "19.0.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "next-mdx-remote": "^5.0.0",
  "katex": "^0.16.11",
  "gray-matter": "^4.0.3"
}
```

## 開発環境のセットアップ

### 🐳 Dev Container（推奨）

**最も簡単で確実な方法です。環境差異によるトラブルを完全に回避できます。**

#### 前提条件
- Docker Desktop
- Visual Studio Code + Dev Containers拡張機能

#### セットアップ手順
1. リポジトリをクローン
```bash
git clone git@github.com:AmenoNarime/circle-site.git
cd circle-site
```

2. VSCodeで開く
```bash
code .
```

3. 「Reopen in Container」をクリック
   - 初回は5-10分程度で自動セットアップ完了
   - 権限設定、Node.js、依存関係、VSCode拡張機能がすべて自動インストール
   - 権限エラーは自動的に解決されます

4. 開発開始
```bash
npm run dev
```

詳細な使用方法は [.devcontainer/README.md](./.devcontainer/README.md) を参照してください。

### 🛠 ローカル環境セットアップ

#### 前提条件
- Node.js 18.0以上
- npm, yarn, pnpm, または bun

#### インストール手順

1. リポジトリのクローン
```bash
git clone git@github.com:AmenoNarime/circle-site.git
cd circle-site
```

2. 依存関係のインストール
```bash
npm install
# または
yarn install
# または
pnpm install
```

3. 開発サーバーの起動
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

4. ブラウザで確認
[http://localhost:3000](http://localhost:3000) にアクセス

## プロジェクト構造

```
circle-site/
├── app/                      # Next.js App Router
│   ├── icon.svg             # Favicon
│   ├── apple-icon.svg       # Apple Touch Icon
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ
│   ├── globals.css          # グローバルスタイル
│   └── blog/                # ブログ関連ページ
├── components/              # Reactコンポーネント
│   ├── layout/              # レイアウトコンポーネント
│   ├── ui/                  # UIコンポーネント
│   └── *.tsx                # 各種コンポーネント
├── lib/                     # ユーティリティ関数
│   ├── blog.ts              # ブログ処理
│   ├── media.ts             # メディア管理
│   └── utils.ts             # 汎用ユーティリティ
├── posts/                   # ブログ記事（MDX）
├── public/                  # 静的ファイル
│   ├── icons/               # アイコン類
│   └── media/               # メディアファイル
├── docs/                    # ドキュメント
└── memory-bank/             # プロジェクト記録
```

## ブログ記事の作成

詳細な手順は [docs/blog-writing-guide.md](./docs/blog-writing-guide.md) を参照してください。

### 基本的な手順

1. `posts/` ディレクトリに `.mdx` ファイルを作成
2. Frontmatter でメタデータを設定
3. Markdown + JSX で記事を執筆
4. GitHubにプッシュして自動公開

### 記事の例

```mdx
---
title: "サンプル記事"
date: "2025-01-07"
description: "記事の概要"
tags: ["技術", "音響"]
published: true
---

# 記事タイトル

記事の内容をここに書きます。

## 数式の例

$$E = mc^2$$

## 画像の埋め込み

![説明](/media/posts/sample-article/images/sample.jpg)
```

## デプロイ

### Vercel（推奨）

1. Vercelアカウントでリポジトリを連携
2. 自動デプロイ設定が完了
3. `main` ブランチへのプッシュで自動公開

### 手動ビルド

```bash
npm run build
npm run start
```

## 開発ガイドライン

### コーディング規約

- TypeScript の厳密な型チェックを使用
- ESLint + Prettier による自動フォーマット
- Tailwind CSS によるユーティリティファーストなスタイリング

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発ブランチ

### コミットメッセージ

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメント更新
style: スタイル変更
refactor: リファクタリング
test: テスト追加・修正
```

## トラブルシューティング

### よくある問題

1. **開発サーバーが起動しない**
   - Node.js のバージョンを確認（18.0以上）
   - `node_modules` を削除して再インストール

2. **ブログ記事が表示されない**
   - MDX ファイルの Frontmatter を確認
   - `published: true` が設定されているか確認

3. **画像が表示されない**
   - ファイルパスが正しいか確認
   - `public/media/` 以下に配置されているか確認

4. **devcontainer環境でlightningcssエラーが発生する**
   ```
   Error: Cannot find module '../lightningcss.linux-x64-gnu.node'
   ```
   
   **原因**: macOS（ローカル）とLinux（devcontainer）で異なるネイティブバイナリがインストールされるため
   
   **解決方法**: devcontainer内で依存関係を再インストール
   ```bash
   # devcontainer内で実行
   rm -rf node_modules package-lock.json
   npm install
   ```
   
   **予防策**: 
   - ローカルで `node_modules` や `package-lock.json` をコミットしない
   - `.gitignore` で適切に除外されていることを確認
   - devcontainer の `postCreateCommand` で自動的に再インストールが実行される設定済み

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 連絡先

- GitHub: [AmenoNarime](https://github.com/AmenoNarime)

---

**AmenoNarime** - Next.jsで構築されたブログサイト
