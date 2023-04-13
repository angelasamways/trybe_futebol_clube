import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as rotas de Login', () => {
  const users = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    },
    {
      username: 'User',
      role: 'user',
      email: '@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    },
  ]

  after(() => {
    (UserModel.findAll as sinon.SinonStub).restore();
    (UserModel.findByPk as sinon.SinonStub).restore();
  })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testa /login', async () => {
    sinon.stub(UserModel, 'findAll').resolves(users as UserModel[])
    const response = await chai.request(app).get('/login').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal(users[0][1])
  });

  it('Testa /login/role', async () => {
    sinon.stub(UserModel, 'findByPk').resolves(users[0] as UserModel)
    const response = await chai.request(app).get('/login/role').send()
    expect(response).to.have.status(200)
    expect(response.body).to.deep.equal("admin")
  });
});
