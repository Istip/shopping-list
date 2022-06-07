export const generateHexColor = (setBgColor) => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return setBgColor(n.slice(0, 6));
};
