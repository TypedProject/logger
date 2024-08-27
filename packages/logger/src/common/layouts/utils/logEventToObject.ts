import Util from "util";
import {LogEvent} from "../../core/LogEvent";
import {removeColors} from "./colorizeUtils";

export function logEventToObject(loggingEvent: LogEvent) {
  const contextObject = loggingEvent.context.toJSON();
  const contextWithoutstartTime = excludeKey(contextObject, "startTime");
  const contextWithoutcategoryName = excludeKey(contextWithoutstartTime, "categoryName");
  const contextToLog = excludeKey(contextWithoutcategoryName, "level");
  const log: any = {
    startTime: loggingEvent.startTime,
    categoryName: loggingEvent.categoryName,
    level: loggingEvent.level.toString(),
    ...contextToLog
  };

  log.data = loggingEvent.data.reduce((data, current) => {
    if (typeof current === "object") {
      Object.assign(log, current);

      if (current.data) {
        return [].concat(data, current.data);
      }

      return data;
    }

    return [...data, removeColors(Util.format(current))];
  }, []);

  return log;
}

function excludeKey<T extends object, U extends keyof any>(obj: T, key: U) {
  const {[key]: _, ...newObj} = obj;
  return newObj;
}
