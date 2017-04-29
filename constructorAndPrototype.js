function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return `${this.owner} loves ${this.name}`;
};

let jones = new Cat("Jones", "Davey");
let alice = new Cat("Alice", "Charles");
let stone = new Cat("Stone", "Baltimore");

console.log(jones.cuteStatement());
console.log(alice.cuteStatement());

Cat.prototype.meow = function() {
  return `Meow!!!, I'm ${this.name}`;
};

console.log(stone.meow());

jones.meow = function(){
  return `This is my own unique meow :)`;
};

console.log(jones.meow());
console.log(alice.meow());
