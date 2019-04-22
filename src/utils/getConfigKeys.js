export default () => {
  if (!localStorage.getItem('Options')) {
    const def = ['LEFT', 'RIGHT', 'UP', 'DOWN', 'ENTER', 'SPACE', 'SHIFT', 'S', 'P'];
    const s = JSON.stringify(def);
    localStorage.setItem('Options', s);
  }
  const l = localStorage.getItem('Options');
  return JSON.parse(l);
};
