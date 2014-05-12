'use strict';

describe('Service: Clips', function () {

  // load the service's module
  beforeEach(module('clipBardApp'));

  // instantiate service
  var Clips;
  beforeEach(inject(function (_Clips_) {
    Clips = _Clips_;
  }));

  it('should do something', function () {
    expect(!!Clips).toBe(true);
  });

});
