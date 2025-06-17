const rgb2cmyk = (r: number, g: number, b: number) => {
    let c = 0;
    let m = 0;
    let y = 0;
    let k = 0;
  
    if (r === 0 && g === 0 && b === 0) {
      return {
        c: 0,
        m: 0,
        y: 0,
        k: 100
      };
    }
  
    c = 1 - r / 255;
    m = 1 - g / 255;
    y = 1 - b / 255;
  
    const minCMY = Math.min(c, Math.min(m, y));
  
    c = (c - minCMY) / (1 - minCMY);
    m = (m - minCMY) / (1 - minCMY);
    y = (y - minCMY) / (1 - minCMY);
    k = minCMY;
  
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
};
  
export default rgb2cmyk;
