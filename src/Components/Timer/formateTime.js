export default function (t = 0) {
  const msec = appendZero(Number.parseInt(t % 100)),
  sec = appendZero(Number.parseInt(t/100%60)),
   min = appendZero(Number.parseInt(t/6000%60)),
   hour = appendZero(Number.parseInt(t/360000));

  return `${hour}:${min}:${sec}.${msec}`;

}

const appendZero = n=>n.toLocaleString({},{minimumIntegerDigits:2});