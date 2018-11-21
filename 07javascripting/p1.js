/**
 * Project 1
 */

for (let i = 1; i < 101; ++i) {
  const div3 = !(i % 3) ? 'Fizz' : '';
  const div5 = !(i % 5) ? 'Buzz' : '';

  const combine = `${div3}${div5}`;

  console.log(combine || i);
}
