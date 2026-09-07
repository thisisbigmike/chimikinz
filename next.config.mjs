/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    /**
     * Optimization is ON deliberately.
     *
     * The scaffold shipped with `unoptimized: true`, which serves every
     * source file untouched. Several brand PNGs are 3000x3000 —
     * `oddling-3.png` is 1.1MB and renders at 28px in the scroll-to-top
     * button, so the browser decoded 9 megapixels (~36MB of bitmap) to
     * paint an icon. The home page was doing ~38 megapixels of main-thread
     * decode before it could settle.
     *
     * Every <Image> in the app declares `sizes`, so Next can serve a
     * correctly-scaled AVIF/WebP per slot instead. Needs `sharp` present.
     */

    /**
     * AVIF first, WebP as the fallback.
     *
     * Measured through the real optimizer (`next start`, cold request per
     * image, w=640 q=75) rather than a bare sharp benchmark — Next encodes
     * AVIF at a far lower effort than sharp's default, so a standalone
     * benchmark overstates the cost by more than an order of magnitude:
     *
     *                    AVIF              WebP
     *   tiger-suit     0.60s  15.7KB     0.73s  29.0KB
     *   cat-on-head    0.71s  11.1KB     0.17s  20.5KB
     *   bone-mask      0.34s  14.4KB     0.12s  27.2KB
     *   red-coat       0.30s  11.6KB     0.13s  20.9KB
     *
     * AVIF costs ~0.2s more to encode, once, and saves ~45% of the bytes on
     * every request after that. On a phone the transfer is the slow part,
     * so the trade is worth taking.
     */
    formats: ['image/avif', 'image/webp'],

    /**
     * Hold optimized variants for 30 days instead of the 60-second default.
     *
     * At the default TTL a variant expires a minute after it is built, so a
     * visitor arriving a few minutes later waits on a fresh encode instead
     * of being handed a cached file — on the gallery that is 55 encodes
     * that should have happened once. The art is immutable in practice;
     * when a file *is* replaced under the same name, give it a new filename
     * to bust this.
     */
    minimumCacheTTL: 2592000,
  },
}

export default nextConfig
