import * as topicService from "./topicService";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ _id: "1", title: "Mock Topic" }])
  })
);

test("topicService.getAll returns list", async () => {
  const result = await topicService.getAll();
  expect(result.length).toBe(1);
  expect(result[0].title).toBe("Mock Topic");
});
