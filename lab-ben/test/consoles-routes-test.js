'use strict';

const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const server = require('../server.js');

chai.use(http);

describe('Server module', function() {
  let app;
  before(done => {
    app = server.listen(3000);
    done();
  });

  after(done => {
    app.close();
    done();
  });
});
