const request = require( "supertest" );
const server = require( "../server" );
let app, min = 1, max = 3999;

describe("on Route [/api/]", () => {

  describe("conversions/:type ", () => {
    test("must return an endpoint error with e-code of 404", async () => {
      app = await server;
      const response = await request(app).post("/api/conversions/romania").send()
      expect(response.statusCode).toBe(404)
    })
  });

  describe("conversions/:type/convert/:value ", () => {
    test("must return as conversion-limit error with e-code of 400", async () => {
      request(app).post("/api/conversions/roman/convert/0").send().then(data => {
        expect(data.statusCode).toBe(400)
      })
      .catch(e => {
        expect(e.error.message).toMatch(`value cannot be less than [${min}] or greater than [${max}]`)
      })
    });

    test("must return as successful request", async () => {
      let num = Math.floor(Math.random() * max);
      request(app).post(`/api/conversions/roman/convert/${num}`).send().then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.value).toBe(num);
      })
    });
  });

  describe("conversions/:type/recent ", () => {
    test("must return as successful request", async () => {
      request(app).post("/api/conversions/roman/recent").send().then(response => {
        expect(response.statusCode).toBe(200);
      })
    });
  });

  describe("conversions/:type/top ", () => {

    test("must return an conversion-type error with e-code of 400", async () => {
      const response = await request(app).post("/api/conversions/romania/top").send()
      expect(response.statusCode).toBe(400)
    })

    test("must return as successful responses with a body typeof Array", async () => {
      const response = await request(app).post("/api/conversions/roman/top").send()
      expect(response.statusCode).toBe(200)
      expect(typeof response.body.length).toEqual('number')
    })

  });
});
