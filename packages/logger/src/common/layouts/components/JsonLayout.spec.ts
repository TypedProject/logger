import {LogContext} from "../../core/LogContext";
import {LogEvent} from "../../core/LogEvent";
import {levels} from "../../core/LogLevel";
import {JsonLayout} from "./JsonLayout";

describe("JsonLayout", () => {
  describe("when separator is given", () => {
    it("should return a formatted string", () => {
      const layout = new JsonLayout({
        type: "json",
        separator: ","
      });

      const context = new LogContext();
      context.set("user", "romain");
      const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      // @ts-ignore
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      const result = layout.transform(logEvent);

      // @ts-ignore
      expect(result).toEqual(
        JSON.stringify({
          startTime: logEvent.startTime,
          categoryName: "category",
          level: "DEBUG",
          user: "romain",
          data: ["data"]
        }) + ","
      );
    });
    it("should return a formatted object", () => {
      const layout = new JsonLayout({
        type: "json",
        separator: ","
      });

      const context = new LogContext();
      context.set("user", "romain");
      const logEvent = new LogEvent(
        "category",
        levels().DEBUG,
        [
          {
            test: "test",
            data: ["hello"]
          }
        ],
        context
      );
      // @ts-ignore
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      const result = layout.transform(logEvent);

      // @ts-ignore
      expect(result).toEqual(
        JSON.stringify({
          startTime: logEvent.startTime,
          categoryName: "category",
          level: "DEBUG",
          user: "romain",
          test: "test",
          data: ["hello"]
        }) + ","
      );
    });
  });

  describe("when separator isn't given", () => {
    let logEvent: any, layout: any, result: any;
    beforeAll(() => {
      layout = new JsonLayout({
        type: "json"
      });

      const context = new LogContext();
      context.set("user", "romain");
      logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      result = layout.transform(logEvent);
    });

    it("should return a formatted string", () => {
      expect(result).toEqual(
        JSON.stringify({
          startTime: logEvent._startTime,
          categoryName: "category",
          level: "DEBUG",
          user: "romain",
          data: ["data"]
        })
      );
    });
  });

  describe("startTime, categoryName, level  can't be overridden", () => {
    let logEvent: any, layout: any, result: any;
    beforeAll(() => {
      layout = new JsonLayout({
        type: "json"
      });

      const context = new LogContext();
      context.set("user", "romain");
      context.set("startTime", new Date());
      context.set("categoryName", "fakeCategory");
      context.set("level", levels().INFO);

      logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      result = layout.transform(logEvent);
    });

    it("should return a formatted string", () => {
      expect(result).toEqual(
        JSON.stringify({
          startTime: logEvent._startTime,
          categoryName: "category",
          level: "DEBUG",
          user: "romain",
          data: ["data"]
        })
      );
    });
  });
});
