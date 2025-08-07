# ブログ記事作成ガイド

このガイドでは、音雅研究所ウェブサイトでのブログ記事作成方法を詳しく説明します。

## 目次

1. [基本的な記事作成手順](#基本的な記事作成手順)
2. [Frontmatterの設定](#frontmatterの設定)
3. [Markdown記法](#markdown記法)
4. [数式の書き方](#数式の書き方)
5. [メディアファイルの埋め込み](#メディアファイルの埋め込み)
6. [コンポーネントの使用](#コンポーネントの使用)
7. [公開・非公開の制御](#公開非公開の制御)
8. [公開プロセス](#公開プロセス)
9. [ベストプラクティス](#ベストプラクティス)
10. [トラブルシューティング](#トラブルシューティング)

## 基本的な記事作成手順

### 1. ファイルの作成

`posts/` ディレクトリに新しい `.mdx` ファイルを作成します。

```bash
# ファイル名の例
posts/my-new-article.mdx
posts/acoustic-analysis-2025.mdx
posts/frequency-response-study.mdx
```

**ファイル命名規則**：
- 小文字とハイフンを使用
- 日付は含めない（Frontmatterで管理）
- 内容が分かりやすい名前を付ける

### 2. 基本テンプレート

新しい記事は以下のテンプレートから始めてください：

```mdx
---
title: "記事のタイトル"
date: "2025-01-07"
description: "記事の概要（SEO用）"
tags: ["タグ1", "タグ2", "タグ3"]
published: true
---

# 記事のタイトル

記事の導入部分をここに書きます。

## セクション1

内容...

## セクション2

内容...

## まとめ

記事のまとめをここに書きます。
```

## Frontmatterの設定

記事の先頭にある `---` で囲まれた部分がFrontmatterです。

### 必須フィールド

```yaml
---
title: "記事のタイトル"           # 必須：記事のタイトル
date: "2025-01-07"              # 必須：公開日（YYYY-MM-DD形式）
description: "記事の概要"        # 必須：SEO用の説明文
tags: ["タグ1", "タグ2"]        # 必須：記事のタグ（配列形式）
published: true                 # 必須：公開状態（true/false）
---
```

### オプションフィールド

```yaml
---
# 基本情報
title: "記事のタイトル"
date: "2025-01-07"
description: "記事の概要"
tags: ["音響", "技術", "研究"]
published: true

# オプション（将来的に使用予定）
author: "AmenoNarime"           # 著者名
category: "技術記事"            # カテゴリ
readingTime: "5分"              # 読了時間
featured: false                 # 注目記事フラグ
---
```

### 日付の形式

```yaml
# 正しい形式
date: "2025-01-07"
date: "2025-12-31"

# 間違った形式
date: "2025/01/07"    # スラッシュは使わない
date: "Jan 7, 2025"   # 英語形式は使わない
```

### タグの設定

```yaml
# 推奨タグの例
tags: ["音響", "技術", "研究", "数学", "物理", "プログラミング", "Web開発", "Next.js", "React"]

# 日本語・英語どちらでも可
tags: ["Acoustics", "Mathematics", "Web Development"]

# 複数語の場合はスペースを含めて可
tags: ["周波数解析", "Machine Learning", "音響信号処理"]
```

## Markdown記法

### 見出し

```markdown
# H1見出し（記事タイトル用）
## H2見出し（主要セクション）
### H3見出し（サブセクション）
#### H4見出し（詳細項目）
```

### テキスト装飾

```markdown
**太字**
*斜体*
~~取り消し線~~
`インラインコード`
```

### リスト

```markdown
# 順序なしリスト
- 項目1
- 項目2
  - サブ項目1
  - サブ項目2

# 順序ありリスト
1. 項目1
2. 項目2
   1. サブ項目1
   2. サブ項目2
```

### リンク

```markdown
[リンクテキスト](https://example.com)
[内部リンク](/blog/other-article)
```

### 引用

```markdown
> これは引用文です。
> 複数行にわたって書くことができます。
```

### コードブロック

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```python
def hello():
    print("Hello, World!")
```
````

### 表

```markdown
| 項目1 | 項目2 | 項目3 |
|-------|-------|-------|
| 値1   | 値2   | 値3   |
| 値4   | 値5   | 値6   |
```

## 数式の書き方

KaTeXを使用して数式を表示できます。

### インライン数式

```markdown
文中に $E = mc^2$ のように数式を埋め込めます。
```

### ブロック数式

```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### 複雑な数式の例

```markdown
# フーリエ変換
$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt
$$

# 行列
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

# 分数と上付き・下付き
$$
\frac{d}{dx} x^n = nx^{n-1}
$$
```

## メディアファイルの埋め込み

### ディレクトリ構造

記事用のメディアファイルは以下の構造で配置します：

```
public/media/posts/{記事のslug}/
├── images/          # 画像ファイル
├── audio/           # 音声ファイル
└── videos/          # 動画ファイル
```

### 画像の埋め込み

```markdown
# 基本的な画像
![画像の説明](/media/posts/my-article/images/sample.jpg)

# サイズ指定付き（HTMLタグ使用）
<img src="/media/posts/my-article/images/sample.jpg" alt="画像の説明" width="500" height="300" />
```

### 音声の埋め込み

```markdown
<audio controls className="w-full">
  <source src="/media/posts/my-article/audio/sample.wav" type="audio/wav" />
  <source src="/media/posts/my-article/audio/sample.mp3" type="audio/mpeg" />
  お使いのブラウザは音声タグをサポートしていません。
</audio>
```

### 動画の埋め込み

```markdown
<video controls className="w-full">
  <source src="/media/posts/my-article/videos/sample.mp4" type="video/mp4" />
  <source src="/media/posts/my-article/videos/sample.webm" type="video/webm" />
  お使いのブラウザは動画タグをサポートしていません。
</video>
```

### メディアファイルの準備

1. **ファイル名の規則**：
   - 小文字とハイフンを使用
   - 内容が分かる名前を付ける
   - 例：`frequency-sweep-200-800hz.wav`

2. **推奨フォーマット**：
   - 画像：JPG, PNG, SVG, WebP
   - 音声：WAV, MP3, OGG
   - 動画：MP4, WebM

3. **ファイルサイズ**：
   - 画像：1MB以下推奨
   - 音声：5MB以下推奨
   - 動画：10MB以下推奨

## コンポーネントの使用

MDXではReactコンポーネントを直接使用できます。

### 音声プレーヤーコンポーネント

```mdx
import { AudioPlayer } from '@/components/audio-player'

<AudioPlayer 
  src="/media/posts/my-article/audio/sample.wav"
  title="サンプル音声"
/>
```

### 周波数計算機コンポーネント

```mdx
import { FrequencyCalculator } from '@/components/frequency-calculator'

<FrequencyCalculator />
```

### 波形アニメーション

```mdx
import { WaveformAnimation } from '@/components/waveform-animation'

<WaveformAnimation 
  frequency={440}
  amplitude={0.8}
/>
```

## 公開・非公開の制御

### 公開記事

```yaml
---
published: true    # または省略（デフォルトで公開）
---
```

### 非公開記事（下書き）

```yaml
---
published: false   # 非公開に設定
---
```

### 非公開記事の動作

- ブログ一覧ページに表示されない
- 直接URLにアクセスしても404エラー
- 静的生成の対象外
- トップページのRecent Activitiesに表示されない

## 公開プロセス

### 1. 記事の作成・編集

1. `posts/` ディレクトリに `.mdx` ファイルを作成
2. 必要に応じてメディアファイルを `public/media/posts/{slug}/` に配置
3. 記事を執筆・編集

### 2. ローカルでの確認

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで確認
# http://localhost:3000/blog で記事一覧を確認
# http://localhost:3000/blog/{slug} で個別記事を確認
```

### 3. GitHubへのプッシュ

```bash
# 変更をステージング
git add .

# コミット
git commit -m "feat: 新記事「記事タイトル」を追加"

# プッシュ
git push origin main
```

### 4. 自動デプロイの確認

- Vercelが自動的にデプロイを開始
- デプロイ完了後、本番サイトで記事を確認

## ベストプラクティス

### 記事の構成

1. **導入部分**：
   - 記事の目的と概要を明確に
   - 読者が得られる価値を提示

2. **本文**：
   - 論理的な構成で情報を整理
   - 見出しを適切に使用して読みやすく
   - 具体例やコード例を豊富に

3. **まとめ**：
   - 重要なポイントを再確認
   - 次のアクションや関連記事への誘導

### SEO対策

```yaml
---
title: "具体的で検索されやすいタイトル"
description: "120文字以内で記事の内容を要約"
tags: ["関連性の高いキーワード"]
---
```

### 画像の最適化

1. **適切なサイズ**：
   - 表示サイズに合わせてリサイズ
   - 不要に大きな画像は避ける

2. **alt属性の設定**：
   ```markdown
   ![音響波形の解析結果グラフ](/media/posts/article/images/waveform.jpg)
   ```

3. **フォーマットの選択**：
   - 写真：JPEG
   - 図表・ロゴ：PNG または SVG
   - アニメーション：GIF または WebP

### コードの書き方

1. **言語の指定**：
   ````markdown
   ```javascript
   // JavaScriptコード
   ```
   ````

2. **コメントの追加**：
   ```javascript
   // 周波数を計算する関数
   function calculateFrequency(wavelength) {
     return SPEED_OF_SOUND / wavelength;
   }
   ```

3. **実行可能な例**：
   - 動作するコード例を提供
   - 必要に応じて説明を追加

### 数式の書き方のコツ

1. **変数の説明**：
   ```markdown
   $$f = \frac{c}{\lambda}$$
   
   ここで、$f$ は周波数、$c$ は音速、$\lambda$ は波長です。
   ```

2. **単位の明記**：
   ```markdown
   音速 $c = 343 \text{ m/s}$ （20°C、1気圧）
   ```

3. **複雑な数式の分割**：
   ```markdown
   # 段階的に説明
   $$x(t) = A \sin(2\pi ft + \phi)$$
   
   各パラメータ：
   - $A$: 振幅
   - $f$: 周波数
   - $\phi$: 位相
   ```

## トラブルシューティング

### よくある問題と解決方法

#### 1. 記事が表示されない

**症状**：ブログ一覧に記事が表示されない

**確認事項**：
- [ ] `published: true` が設定されているか
- [ ] Frontmatterの形式が正しいか
- [ ] ファイル拡張子が `.mdx` になっているか
- [ ] `posts/` ディレクトリに配置されているか

#### 2. 画像が表示されない

**症状**：記事内の画像が表示されない

**確認事項**：
- [ ] ファイルパスが正しいか（`/media/posts/{slug}/images/` から始まる）
- [ ] ファイルが実際に存在するか
- [ ] ファイル名の大文字小文字が一致しているか
- [ ] 画像ファイルが破損していないか

#### 3. 数式が表示されない

**症状**：KaTeX数式が正しく表示されない

**確認事項**：
- [ ] `$` または `$$` で正しく囲まれているか
- [ ] KaTeX記法が正しいか
- [ ] エスケープが必要な文字が含まれていないか

#### 4. 音声・動画が再生されない

**症状**：メディアファイルが再生されない

**確認事項**：
- [ ] ファイルパスが正しいか
- [ ] ブラウザがサポートするフォーマットか
- [ ] ファイルサイズが適切か（大きすぎないか）
- [ ] 複数フォーマットのfallbackが設定されているか

#### 5. ビルドエラーが発生する

**症状**：`npm run build` でエラーが発生

**確認事項**：
- [ ] MDXファイルの構文が正しいか
- [ ] インポートしているコンポーネントが存在するか
- [ ] Frontmatterの形式が正しいか
- [ ] 使用している画像・メディアファイルが存在するか

### デバッグ方法

#### 1. 開発サーバーでの確認

```bash
npm run dev
```

開発サーバーではより詳細なエラーメッセージが表示されます。

#### 2. ビルドテスト

```bash
npm run build
```

本番環境と同じ条件でビルドをテストできます。

#### 3. ファイル構造の確認

```bash
# 記事ファイルの確認
ls -la posts/

# メディアファイルの確認
ls -la public/media/posts/{記事のslug}/
```

## 参考資料

### 外部リンク

- [MDX公式ドキュメント](https://mdxjs.com/)
- [KaTeX記法リファレンス](https://katex.org/docs/supported.html)
- [Markdown記法ガイド](https://www.markdownguide.org/)
- [Next.js App Router](https://nextjs.org/docs/app)

### プロジェクト内ドキュメント

- [メディア管理システム](./media-management.md)
- [README.md](../README.md)

---

このガイドに関する質問や改善提案があれば、GitHubのIssueでお知らせください。
