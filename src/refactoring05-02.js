export const inNewEngland = stateCode => {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
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

const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state))

console.info(newEnglanders)
