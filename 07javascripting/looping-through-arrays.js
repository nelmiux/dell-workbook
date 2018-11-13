const pets = ['cat', 'dog', 'rat'];

pets.forEach((x, i) => (pets[i] = `${x}s`));

console.log(pets);
