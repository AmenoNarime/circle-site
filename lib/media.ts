/**
 * メディアファイル管理用のヘルパー関数
 */

export interface MediaFile {
  type: 'image' | 'video' | 'audio'
  filename: string
  alt?: string
  title?: string
}

/**
 * 記事用メディアファイルのパスを生成
 */
export function getPostMediaPath(
  postSlug: string,
  mediaType: 'images' | 'videos' | 'audio',
  filename: string
): string {
  return `/media/posts/${postSlug}/${mediaType}/${filename}`
}

/**
 * 共有メディアファイルのパスを生成
 */
export function getSharedMediaPath(
  mediaType: 'images' | 'videos' | 'audio',
  filename: string
): string {
  return `/media/shared/${mediaType}/${filename}`
}

/**
 * コンポーネント用メディアファイルのパスを生成
 */
export function getComponentMediaPath(
  componentType: 'interactive' | 'animations',
  filename: string
): string {
  return `/media/components/${componentType}/${filename}`
}

/**
 * メディアファイルの型を拡張子から判定
 */
export function getMediaTypeFromExtension(filename: string): 'image' | 'video' | 'audio' | 'unknown' {
  const ext = filename.toLowerCase().split('.').pop()
  
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif']
  const videoExts = ['mp4', 'webm', 'ogg', 'avi', 'mov']
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'flac']
  
  if (imageExts.includes(ext || '')) return 'image'
  if (videoExts.includes(ext || '')) return 'video'
  if (audioExts.includes(ext || '')) return 'audio'
  
  return 'unknown'
}

/**
 * メディアファイルのMIMEタイプを取得
 */
export function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop()
  
  const mimeTypes: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'avif': 'image/avif',
    
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'aac': 'audio/aac',
    'flac': 'audio/flac',
  }
  
  return mimeTypes[ext || ''] || 'application/octet-stream'
}

/**
 * レスポンシブ画像のsrcsetを生成（将来的な拡張用）
 */
export function generateSrcSet(
  basePath: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _sizes: number[] = [400, 800, 1200]
): string {
  // 現在は基本パスのみ返す（将来的に画像リサイズ機能を追加予定）
  return basePath
}

/**
 * メディアファイルの存在確認（開発時用）
 */
export function validateMediaPath(path: string): boolean {
  // 本番環境では実際のファイル存在確認を実装
  // 開発環境では基本的なパス形式チェックのみ
  return path.startsWith('/media/') && path.length > 7
}
