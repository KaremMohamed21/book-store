const axios = require("axios");
const MAIN_URL = "http://localhost:3000/api/v1";

describe("Test book controller module", () => {
  it("test create book", async () => {
    const response = await axios.post(`${MAIN_URL}/book`, {
      title: "Harry Potter",
      categoryId: "638b8b7cbd6a6400bc5ff504",
      description:
        "Gryffindor, Slytherin, Hufflepuff, Ravenclaw … Twenty years ago these magical words and many more flowed from a young writer’s pen, an orphan called Harry Potter was freed from the cupboard under the stairs – and a glob",
      bookNumber: 123,
      Author: "J.K. Rowling",
      price: 25
    });

    expect(response.status).toBe(201);
  });

  it("test get all books", async () => {
    const response = await axios.get(`${MAIN_URL}/book`);

    expect(response.status).toBe(200);
  });
});
