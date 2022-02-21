# Custom Appender

Ts.Logger can load appenders from outside the core appenders by using @@Appender@@ decorator.
The type config value is used as a require path if no matching appender can be found.
For example, the following configuration will create an appender with decorators:

```typescript
// consoleAppender.ts
import {Appender, BaseAppender, LogEvent} from "@tsed/logger";
const consoleLog = console.log.bind(console);

@Appender({name: "console2"})
export class ConsoleAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    consoleLog(this.layout(loggingEvent, this.config.timezoneOffset));
  }
}
```

This appender can be use like this:

```typescript
import {Logger} from "@tsed/logger";
import "./consoleAppender.ts";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "console2",
  level: ["debug", "info", "trace"]
});
```
