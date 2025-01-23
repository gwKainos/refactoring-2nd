import { expect } from "chai";
import {defaultOwner, setDefaultOwner} from "../../src/chapter06/refactoring06.js";

describe('DefaultOwner', () => {
  it('should return the correct default owner', () => {
    const owner = defaultOwner();
    expect(owner).to.have.property('firstName', '레베카');
    expect(owner).to.have.property('lastName', '파슨스');
  });

  it('should return a new object each time', () => {
    const owner1 = defaultOwner();
    const owner2 = defaultOwner();
    owner1.firstName = '변경됨';
    expect(owner1.firstName).to.not.equal(owner2.firstName);
  });

  it('should update the default owner correctly', () => {
    const newOwner = { firstName: '로버트', lastName: '마틴' };
    setDefaultOwner(newOwner);

    const updatedOwner = defaultOwner();
    expect(updatedOwner).to.have.property('firstName', '로버트');
    expect(updatedOwner).to.have.property('lastName', '마틴');
  });
});
