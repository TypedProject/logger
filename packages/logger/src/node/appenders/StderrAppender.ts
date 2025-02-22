import {BaseAppender} from "../../common/appenders/class/BaseAppender.js";
import {Appender} from "../../common/appenders/decorators/appender.js";
import {LogEvent} from "../../common/core/LogEvent.js";

/**
 * ## Standard Error Appender
 *
 * This appender writes all log events to the standard error stream.
 *
 * ## Configuration
 *
 * * type - stderr
 * * layout - object (optional, defaults to colouredLayout) - see layouts
 *
 * ## Example
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders.set("log-error", {
 *     type: "stderr",
 *     levels: ["error", "warn", "fatal"]
 * });
 * ```
 *
 * @private
 */
@Appender({name: "stderr"})
export class StderrAppender extends BaseAppender {
  private log = process.stderr.write.bind(process.stderr);

  write(loggingEvent: LogEvent) {
    this.log(`${this.layout(loggingEvent, this.config.timezoneOffset)}\n`);
  }
}
