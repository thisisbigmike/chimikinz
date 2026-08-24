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
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
