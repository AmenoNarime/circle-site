# Dev Container 使用ガイド

このプロジェクトでは、開発環境の統一とセットアップの簡素化のためにDev Containerを使用しています。

## 🚀 クイックスタート

### 前提条件
- **Docker Desktop** がインストールされていること
- **Visual Studio Code** がインストールされていること
- **Dev Containers拡張機能** がインストールされていること

### セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone git@github.com:AmenoNarime/circle-site.git
   cd circle-site
   ```

2. **VSCodeで開く**
   ```bash
   code .
   ```

3. **Dev Containerで開く**
   - VSCodeの右下に表示される通知「Reopen in Container」をクリック
   - または、コマンドパレット（`Ctrl+Shift+P` / `Cmd+Shift+P`）で「Dev Containers: Reopen in Container」を実行

4. **自動セットアップ完了を待つ**
   - 初回は5-10分程度かかります
   - `npm install`が自動実行されます
   - 必要なVSCode拡張機能が自動インストールされます

5. **開発開始**
   ```bash
   npm run dev
   ```
   - ブラウザで `http://localhost:3000` にアクセス

## 🎯 ブログ記事作成ワークフロー

### 新しい記事の作成

1. **記事ファイルを作成**
   ```bash
   # posts/ディレクトリに新しいMDXファイルを作成
   touch posts/your-article-title.mdx
   ```

2. **Frontmatterを設定**
   ```mdx
   ---
   title: "記事のタイトル"
   date: "2025-01-07"
   description: "記事の概要説明"
   tags: ["音響", "技術", "研究"]
   published: true
   ---
   ```

3. **記事を執筆**
   - MDX拡張機能によるシンタックスハイライト
   - リアルタイムプレビュー機能
   - 数式（KaTeX）、画像、動画の埋め込み対応

4. **プレビュー確認**
   - 開発サーバー（`npm run dev`）でリアルタイム確認
   - ブログ一覧ページ：`http://localhost:3000/blog`
   - 個別記事ページ：`http://localhost:3000/blog/your-article-title`

5. **公開**
   ```bash
   git add .
   git commit -m "feat: 新しい記事を追加"
   git push origin main
   ```
   - Vercelで自動デプロイされます

## 🛠 開発環境の詳細

### 自動インストールされる拡張機能

**必須拡張機能:**
- **ESLint** - コード品質チェック
- **Prettier** - コード自動フォーマット
- **TypeScript** - TypeScript言語サポート
- **Tailwind CSS IntelliSense** - CSSクラス補完
- **MDX** - MDXファイル編集サポート
- **GitLens** - Git履歴表示

**推奨拡張機能:**
- **Auto Rename Tag** - HTMLタグの自動リネーム
- **Path Intellisense** - ファイルパス補完
- **Markdown All in One** - Markdown編集支援

### 自動設定される機能

- **保存時自動フォーマット** - Prettierによる統一フォーマット
- **ESLint自動修正** - 保存時にリンターエラーを自動修正
- **TypeScript自動インポート** - 必要なモジュールの自動インポート
- **Tailwind CSS補完** - CSSクラス名の自動補完
- **Git自動フェッチ** - リモートの変更を自動取得

## 📁 プロジェクト構造

```
circle-site/
├── .devcontainer/           # Dev Container設定
│   ├── devcontainer.json   # メイン設定ファイル
│   └── README.md           # このファイル
├── app/                    # Next.js App Router
├── components/             # Reactコンポーネント
├── lib/                    # ユーティリティ関数
├── posts/                  # ブログ記事（MDX）
├── public/                 # 静的ファイル
└── docs/                   # ドキュメント
```

## 🔧 トラブルシューティング

### よくある問題と解決方法

**1. Dev Containerが起動しない**
- Docker Desktopが起動していることを確認
- Docker Desktopのメモリ設定を4GB以上に設定
- VSCodeのDev Containers拡張機能が最新版であることを確認

**2. npm installが失敗する（権限エラー）**
- **解決済み**: 権限問題は自動的に解決されるように設定済み
- それでも失敗する場合：コンテナを再ビルド `Dev Containers: Rebuild Container`
- 最終手段：package-lock.jsonを削除してから再試行

**3. npm run devが実行できない（next: not found）**
- **即座の解決方法**: ターミナルで `npm install` を手動実行
- **根本的解決**: コンテナを再ビルド `Dev Containers: Rebuild Container`
- **確認方法**: `npm list next` でNext.jsがインストールされているか確認
- **最終手段**: `npm cache clean --force && npm install` を実行

**4. lightningcssエラー（Cannot find module '../lightningcss.linux-x64-gnu.node'）**
- **即座の解決方法**: `npm rebuild lightningcss` を実行
- **根本的解決**: コンテナを再ビルド `Dev Containers: Rebuild Container`
- **手動修復**: `npm install && npm rebuild lightningcss` を実行
- **原因**: Tailwind CSS v4のlightningcssネイティブバイナリがLinux環境で正しくインストールされていない

**4. ポート3000にアクセスできない**
- VSCodeの「PORTS」タブで3000番ポートが転送されていることを確認
- ファイアウォール設定を確認
- 開発サーバーが正常に起動していることを確認

**5. 拡張機能が動作しない**
- コンテナ内で拡張機能がインストールされていることを確認
- VSCodeを再起動してから再試行

**6. 初回起動が遅い**
- **正常な動作**: 初回は5-10分程度かかります
- 権限設定とnpm installが自動実行されるため
- 2回目以降は高速に起動します

### パフォーマンス最適化

**メモリ使用量を削減したい場合:**
```json
// devcontainer.jsonに追加
"runArgs": ["--memory=2g", "--cpus=2"]
```

**ファイル監視を最適化したい場合:**
- 既に`.devcontainer/devcontainer.json`で最適化済み
- 大量のファイルがある場合は`files.watcherExclude`を調整

## 🎵 プロジェクト特有の設定

### MDXファイル編集
- `.mdx`ファイルは自動的にMDXとして認識
- KaTeX数式のシンタックスハイライト対応
- 画像・動画埋め込みのパス補完

### メディアファイル管理
- `public/media/`ディレクトリ構造に対応
- 画像・音声・動画ファイルのプレビュー機能

### 記事テンプレート
```mdx
---
title: "記事タイトル"
date: "2025-01-07"
description: "記事の概要"
tags: ["技術", "開発", "ブログ"]
published: true
---

# 記事概要

## 背景

## 内容

### 数式例
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$$

## まとめ
```

## 📞 サポート

問題が解決しない場合は、以下の情報と共にIssueを作成してください：

- OS（Windows/Mac/Linux）
- Docker Desktopのバージョン
- VSCodeのバージョン
- エラーメッセージの全文
- 実行した手順

---

**🎵 統一された開発環境で、美しいブログ記事を作成しましょう！**
