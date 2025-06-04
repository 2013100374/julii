import { useEffect } from 'react';
import useUtility from '../_hooks/useUtility';

const CustomColor = () => {

    const { gs } = useUtility();
    const baseColor = gs('base_color');
    const secondaryColor = gs('secondary_color');

  // Function to check if the hex color is valid
  const checkHexColor = (color) => {
    return /^#[a-f0-9]{6}$/i.test(color);
  };

  // Function to convert hex color to HSL
  const hexToHsl = (hex) => {
    hex = hex.replace('#', '');
    const red = parseInt(hex.substr(0, 2), 16) / 255;
    const green = parseInt(hex.substr(2, 2), 16) / 255;
    const blue = parseInt(hex.substr(4, 2), 16) / 255;

    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);
    const delta = cmax - cmin;

    let hue = 0;
    if (delta !== 0) {
      if (cmax === red) {
        hue = ((green - blue) / delta) % 6;
      } else if (cmax === green) {
        hue = (blue - red) / delta + 2;
      } else {
        hue = (red - green) / delta + 4;
      }
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;

    const lightness = (cmax + cmin) / 2;
    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    return {
      h: hue,
      s: Math.round(saturation * 100),
      l: Math.round(lightness * 100),
    };
  };

  useEffect(() => {
    let color = baseColor ? `#${baseColor}` : '#336699';
    let secondColor = secondaryColor ? `#${secondaryColor}` : '#336699';

    if (!checkHexColor(color)) color = '#336699';
    if (!checkHexColor(secondColor)) secondColor = '#336699';

    const baseHsl = hexToHsl(color);
    const baseTwoHsl = hexToHsl(secondColor);

    // Set CSS variables
    document.documentElement.style.setProperty('--base-h', baseHsl.h);
    document.documentElement.style.setProperty('--base-s', `${baseHsl.s}%`);
    document.documentElement.style.setProperty('--base-l', `${baseHsl.l}%`);
    document.documentElement.style.setProperty('--base-two-h', baseTwoHsl.h);
    document.documentElement.style.setProperty('--base-two-s', `${baseTwoHsl.s}%`);
    document.documentElement.style.setProperty('--base-two-l', `${baseTwoHsl.l}%`);
  }, [baseColor, secondaryColor]); // Add baseColor and secondaryColor to dependencies

  return null;
};

export default CustomColor;
