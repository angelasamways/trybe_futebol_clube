import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rotas de Team', () => {
  const teams = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann'
    },
    {
      id: 2,
      teamName: 'Bahia'
    },
    {
      id: 3,
      teamName: 'Botafogo'
    },
  ]

  afterEach(() => {
    sinon.restore();
  });

  it('1.Testa /teams', async () => {
    sinon.stub(Team, 'findAll').resolves(teams as Team[])
    const response = await chai.request(app).get('/teams').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(teams)
  });

  it('2.Testa /teams/id', async () => {
    sinon.stub(Team, 'findByPk').resolves(teams[0] as Team)
    const response = await chai.request(app).get('/teams/1').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(teams[0])
  });
});
