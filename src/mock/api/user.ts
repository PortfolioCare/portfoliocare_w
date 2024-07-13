import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

export default [
  {
    url: "/api/getUser",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: {
          name: Mock.Random.name(),
          age: Mock.Random.integer(18, 60),
        },
      };
    },
  },
] as MockMethod[];
