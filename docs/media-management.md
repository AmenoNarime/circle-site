# メディア管理システム

このドキュメントでは、プロジェクトのメディアファイル管理システムについて説明します。

## ディレクトリ構造

```
public/media/
├── posts/                    # 記事固有のメディアファイル
│   ├── {post-slug}/
│   │   ├── images/          # 記事用画像
│   │   ├── videos/          # 記事用動画
│   │   └── audio/           # 記事用音声
├── shared/                   # 共有メディアファイル
│   ├── images/              # 共有画像（ロゴ、アイコンなど）
│   ├── videos/              # 共有動画
│   └── audio/               # 共有音声（BGM、効果音など）
└── components/               # コンポーネント用メディア
    ├── interactive/         # インタラクティブコンテンツ用
    └── animations/          # アニメーション用
```

## ヘルパー関数の使用方法

### 基本的な使用例

```typescript
import { getPostMediaPath, getMimeType } from '@/lib/media'

// 記事用メディアパスの生成
const imagePath = getPostMediaPath('media-embedding-test', 'images', 'sample-image.svg')
// 結果: "/media/posts/media-embedding-test/images/sample-image.svg"

const audioPath = getPostMediaPath('media-embedding-test', 'audio', 'sample-tone-440hz.wav')
// 結果: "/media/posts/media-embedding-test/audio/sample-tone-440hz.wav"

// MIMEタイプの取得
const mimeType = getMimeType('sample-tone-440hz.wav')
// 結果: "audio/wav"
```

### MDXファイルでの使用例

```mdx
---
title: "サンプル記事"
date: "2025-01-07"
---

# サンプル記事

## 画像の埋め込み

![サンプル画像](/media/posts/sample-article/images/hero-image.jpg)

## 音声の埋め込み

<audio controls className="w-full">
  <source src="/media/posts/sample-article/audio/sample-sound.wav" type="audio/wav" />
  お使いのブラウザは音声タグをサポートしていません。
</audio>
```

## ファイル命名規則

### 推奨命名パターン

1. **記述的な名前**: ファイルの内容が分かる名前を使用
   - ✅ `frequency-sweep-200-800hz.wav`
   - ❌ `audio1.wav`

2. **ハイフン区切り**: 単語の区切りにはハイフンを使用
   - ✅ `sample-waveform-visualization.svg`
   - ❌ `sample_waveform_visualization.svg`

3. **小文字**: ファイル名は小文字で統一
   - ✅ `hero-image.jpg`
   - ❌ `Hero-Image.jpg`

### ファイルタイプ別の推奨拡張子

- **画像**: `.jpg`, `.png`, `.svg`, `.webp`
- **動画**: `.mp4`, `.webm`
- **音声**: `.wav`, `.mp3`, `.ogg`

## メディアファイル生成

### 音声ファイルの生成

プロジェクトには音声ファイル生成スクリプトが含まれています：

```bash
node scripts/generate-media.js
```

このスクリプトは以下のファイルを生成します：
- `sample-tone-440hz.wav`: 440Hz正弦波（2秒）
- `frequency-sweep.wav`: 200Hz-800Hz周波数スイープ（3秒）

### カスタム音声ファイルの生成

```javascript
// scripts/generate-media.js を参考に
const { generateMediaFiles } = require('./scripts/generate-media.js')

// カスタム周波数の音声生成
function generateCustomTone(frequency, duration, filename) {
  // 実装例は generate-media.js を参照
}
```

## 最適化のベストプラクティス

### 画像最適化

1. **適切なフォーマット選択**
   - 写真: JPEG
   - イラスト・ロゴ: SVG または PNG
   - 次世代フォーマット: WebP, AVIF

2. **サイズ最適化**
   - 表示サイズに応じた解像度
   - 圧縮率の調整

### 音声最適化

1. **フォーマット選択**
   - 高品質: WAV（非圧縮）
   - Web配信: MP3, OGG
   - 低遅延: AAC

2. **サンプリングレート**
   - 音楽: 44.1kHz
   - 音声: 22.05kHz
   - 効果音: 16kHz

## トラブルシューティング

### よくある問題

1. **ファイルが見つからない**
   - パスが正しいか確認
   - ファイルが実際に存在するか確認
   - 大文字小文字の違いに注意

2. **音声が再生されない**
   - ブラウザがサポートするフォーマットか確認
   - 複数のフォーマットを提供（fallback）

3. **画像が表示されない**
   - Next.js Imageコンポーネントの設定確認
   - 画像サイズの指定

### デバッグ用ヘルパー

```typescript
import { validateMediaPath, getMediaTypeFromExtension } from '@/lib/media'

// パスの検証
const isValid = validateMediaPath('/media/posts/test/images/sample.jpg')
console.log('Path is valid:', isValid)

// ファイルタイプの確認
const mediaType = getMediaTypeFromExtension('sample.wav')
console.log('Media type:', mediaType) // 'audio'
```

## 今後の拡張予定

- [ ] 画像の自動リサイズ機能
- [ ] メディアファイルの自動圧縮
- [ ] CDN連携
- [ ] メディアファイルの使用状況追跡
- [ ] 動的メディア生成API
