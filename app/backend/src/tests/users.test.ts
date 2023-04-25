import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rotas de Login', () => {
  
  afterEach(() => {
    sinon.restore();
  });

  it('1.Testa a rota /login, com email em formato inválido, retornando status 401', async function () {
    const response = await chai.request(app).post('/login').send({ email: 'xablau@', password: 'secret_user' });

    expect(response).to.have.status(401);
  });

  it('2.Testa a rota /login, com senha em formato inválido, retornando status 401', async function () {
    const response = await chai.request(app).post('/login').send({ email: 'user@user.com', password: 'abc' });

    expect(response).to.have.status(401);
  });

  it('3.Testa a rota /login, sem senha, retornando status 400', async function () {
    const response = await chai.request(app).post('/login').send({ email: 'user@user.com' });

    expect(response).to.have.status(400);
  });

  it('4.Testa a rota /login, sem email, retornando status 400', async function () {
    const response = await chai.request(app).post('/login').send({ password: 'secret_user' });

    expect(response).to.have.status(400);
  });

});
