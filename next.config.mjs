/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Next.jsのappディレクトリ構造を有効化
    },
    reactStrictMode: true, // ReactのStrictモードを有効にする
    swcMinify: true, // SWCによる高速なコード圧縮を有効化
    images: {
      domains: [], // 必要に応じて外部画像ドメインを設定
    },
  };

  export default nextConfig;
