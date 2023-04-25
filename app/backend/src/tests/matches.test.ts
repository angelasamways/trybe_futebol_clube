import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rotas de Matches', () => {
  const matches = [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
    },
  ];

  const matchesFalse = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      },
  ];

  afterEach(() => {
    sinon.restore();
  });

  it('1.Testa /matches', async () => {
    sinon.stub(Matches, 'findAll').resolves(matches as Matches[])
    const response = await chai.request(app).get('/matches').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(matches)
  });

  it('2.Testa /matches?inProgress=true', async () => {
    sinon.stub(Matches, 'findAll').resolves(matches as Matches[])
    const response = await chai.request(app).get('/matches?inProgress=true').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(matches)
  });

  it('3.Testa /matches?inProgress=false', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesFalse as Matches[])
    const response = await chai.request(app).get('/matches?inProgress=false').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(matchesFalse)
  });

  it('4.Testa /matches/id, update sem sucesso por falta de token', async () => {
    sinon.stub(Matches, 'update').resolves()
    const response = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 4, awayTeamGoals: 2 })
    expect(response).to.have.status(401)
  });

});
