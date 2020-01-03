const request = require("supertest");
const app = require("../index");

describe("Get Endpoints", () => {
  it("check user balance", async () => {
    const res = await request(app)
      .get("/balance/tal")
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("balance");
  });
});

describe("Post Endpoints", () => {
  it("check transition", async () => {
    const res = await request(app)
      .post("/send")
      .send({
        from: "tal",
        to: "roy",
        amount: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("balance");
  });
});
