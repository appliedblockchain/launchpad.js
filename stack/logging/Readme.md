# Logging `winston`

[Package](https://www.npmjs.com/package/winston)
[Source](https://github.com/winstonjs/winston)

## Logging Levels
General logging levels helps monitoring and analysing logs. Application can be configured so that it logs depending on severity (logging level). By default, winston use the [npm logging levels](https://github.com/winstonjs/winston#logging-levels)

### Silly

Rarely used in application but very useful for detailed logging.

### Debug

Use generally when debugging and developing.

### Verbose


### Info

General information on regular operations.
> Example:
> `Note {ID: 0000-999-0000} is created successfully.`
> Use for audit purpose but depends on application

### Warn

Information that is worth looking into.

> Example:
> *Bad request when adding notes.*
> Useful to check there was error but again depends on application.

### Error

Fatal and unexpected error for a request.
> Example:
> *500 Error when adding notes.*
> Note: There is no known issue that causes the request to fail


[More](https://github.com/trentm/node-bunyan#levels)

## Usage

* **Debugging**
Debugging of application is easy if more useful debugging information is provided to the logging system.

* **Monitoring Tools that sends alerts**
Depending on severity or every log can be pushed to monitoring and alerting system. Bunyan supports custom streams.

* **Analysis**
Logs can be pushed to third party service to get detail analysis. Bunyan logs are JSON string which can be bulk pushed to NoSQL database (mongodb) for manual analysis.

## Multiple streams
Winston logging support multiple transports, meaning that different logs can be handled in different ways.
[More](https://github.com/winstonjs/winston#Usage)

Following example logs information to different places depending on log level.
`DEBUG` is printed on standard output (console). `INFO` into a file, and the `ERROR` into a separate a file.

Example:

```javascript
const logger = winston.createLogger({
  level: 'debug',  // The minimal severity that will be logged in this logger
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log',level: 'error' })
    new winston.transports.Console({ level: 'debug', format: winston.format.simple() })
  ]
});
```
