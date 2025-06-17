const cmyk2rgb = (c: number, m: number, y: number, k: number) => {
    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;
  
    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));
  
    return {
      r: r,
      g: g,
      b: b
    };
};
  
export default cmyk2rgb;
