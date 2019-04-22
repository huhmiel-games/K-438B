export default async () => {
  let en = localStorage.getItem('e');
  en = JSON.parse(en);
  en += 1;
  localStorage.setItem('e', en);
};
