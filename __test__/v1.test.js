'use strict';

const server = require('../auth/server');
const supertest = require('supertest');
const request = supertest(server.app);
const {db} = require('../auth/models/index')
let id;
beforeAll( async () =>{
    await db.sync();
})
afterAll( async () =>{
    await db.drop();
})

describe('testing food model for v1 route',()=>{
 
    it ('post new food', async () => {
        const response = await request.post('/api/v1/food').send({
            sportName: "test",
            sportPopularity : "test"
        });
        expect(response.status).toEqual(201);
        id = response.body.id
    });

    it('testing get all food',async()=>{
        const response = await request.get('/api/v1/food')
        expect(response.status).toEqual(200)
    })
        
    it ('testing food get by id method',async()=>{
       const response = await request.get(`/api/v1/food/${id}`)
       expect(response.status).toEqual(200);
   })
  

   it ('update new food', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
        sportName: "test",
        sportPopularity : "test"
    })
    expect(response.status).toEqual(201);
});

it ('deleting food by id',async()=>{
    const response = await request.delete(`/api/v1/food/${id}`)
    expect(response.status).toEqual(204);
})

})


