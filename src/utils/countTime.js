export default (e) => {
  const secondTimestamp = new Date().getTime();
  const result = secondTimestamp - e; // this.firstTimestamp;
  let elapsedTime = localStorage.getItem('time');
  elapsedTime = JSON.parse(elapsedTime);
  localStorage.setItem('time', elapsedTime + result);
  return new Date().getTime();
};
