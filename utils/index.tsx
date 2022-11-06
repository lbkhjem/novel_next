
export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f6f6" offset="8%" />
      <stop stop-color="#f0f0f0" offset="18%" />
      <stop stop-color="#f6f6f6" offset="33%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f6f6" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export const toBase64 = (str) =>
typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
