export const xxNewEngland = stateCode => {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

export const inNewEngland = aCustomer => {
  return xxNewEngland(aCustomer.address.state);
}

const someCustomers = [
  {
    name: 'kainos',
    address: { state: 'CT' },
  },
  {
    name: 'daniel',
    address: { state: 'MA' },
  }
]

const newEnglanders = someCustomers.filter(c => xxNewEngland(c.address.state))

console.info(newEnglanders)
