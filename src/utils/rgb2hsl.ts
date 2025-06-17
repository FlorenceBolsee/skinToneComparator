const rgb2Hsl = (rgb: { r: number; g: number; b: number; }) => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
  
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r:
              h = (g - b) / d + (g < b ? 6 : 0);
          break
        case g:
              h = (b - r) / d + 2;
          break
        case b:
              h = (r - g) / d + 4;
          break
      }
  
        h /= 6;
    }
  
    h *= 360;
    s *= 100;
    l *= 100;
  
    return { h, s, l };
}
  
export default rgb2Hsl;
