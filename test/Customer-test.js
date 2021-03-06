import { assert } from 'chai';

import Customer from '../src/classes/Customer';

describe('Customer', () => {
  let customer;

  beforeEach(function () {
    customer = new Customer({
      id: 1,
      name: 'Leatha Ullrich',
    });
  });

  it('Should be a function', () => {
    assert.isFunction(Customer);
  });

  it('Should be an instance of customer', () => {
    assert.instanceOf(customer, Customer);
  });

  it('Should have an ID', () => {
    assert.equal(customer.id, 1);
  });

  it('Should have a name', () => {
    assert.equal(customer.name, 'Leatha Ullrich');
  });
});
