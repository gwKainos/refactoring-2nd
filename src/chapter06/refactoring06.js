let defaultOwnerDeta = {firstName: '마틴', lastName: '파울러'};

export function defaultOwner() {
  return Object.assign({}, defaultOwnerDeta);
}
export function setDefaultOwner(arg) {
  defaultOwnerDeta = arg;
}

const spaceship = {
  owner: defaultOwner(),
}
console.info(spaceship);
