function xxNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

export const inNewEngland = aCustomer => {
  return xxNewEngland(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter(c => inNewEngland(c))

console.info(newEnglanders)
