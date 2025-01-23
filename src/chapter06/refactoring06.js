let defaultOwnerDeta = {firstName: '마틴', lastName: '파울러'};

export function defaultOwner() {
  return defaultOwnerDeta;
}

export function setDefaultOwner(arg) {
  defaultOwnerDeta = arg;
}

const spaceship = {
  owner: defaultOwner(),
}

setDefaultOwner({ firstName: '레베카', lastName: '파슨스' });

console.info(spaceship);
