# Logging `node-bunyan`

[Package](https://www.npmjs.com/package/bunyan)  
[Source](https://github.com/trentm/node-bunyan)

## Logging Levels
General logging levels helps monitoring and analysing logs. Application can be configured so that it logs depending on severity (logging level).

### Trace  
Rarely used in application but very useful for detailed logging.

### Debug  
Use generally when debugging and developing.

### Info
General information on regular operations.  
> Example:  
> `Note {ID: 0000-999-0000} is created successfully.`  
> Use for audit purpose but depends on application

### Warning  
Informations that is worth to be looked in.
> Example:  
> *Bad request when adding notes.*   
> Useful to check there was error but again depends on application.

### Error
Fatal and unexpected error for a request.
> Example:
> *500 Error when adding notes.*
> Note: There is no any known issue that cause to fail request

### Fatal  
Fatal for application. App has to be stopped for the error.
> Example:
> *Unable to connect contract using web3 or unable to connect*
> Note: App does not have to stopped but is not usable completely.

[More](https://github.com/trentm/node-bunyan#levels)

## Usage
* **Debugging**  
Debugging of application is easy if more and useful debugging information is provided to logging system.

* **Monitoring Tools that sends alerts**  
Depending on severity or every log can be pushed to monitoring and alerting system. Bunyan supports custom streams.

* **Analysis**  
Logs can be pushed to third party service to get detail analysis. Bunyan logs are JSON string which can be bulk pushed to NoSQL database (mongodb) to manual analysis.


## Multiple streams
Bunyan logging support multiple streams meaning that different logs can be handles in different way.
[More](https://github.com/trentm/node-bunyan#streams)

Following example logs information depending on log level.
Debug are printed on standard output (console). Information into a file and error and above into separate file.

Example:

```javascript
var log = bunyan.createLogger({
  name: 'base-app-mantle',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'info',
      path: '/var/tmp/mantle-info.log'
    }
    {
      level: 'error',
      path: '/var/tmp/mantle-error.log'  // log ERROR and above to a file
    }
  ]
});
```

### Third-party Bunyan Streams

Bunyan supports custom streams too. A custom stream is a function, which can be written to push data into other services and cloud services like `Papertrail` and `Sentry`.

Find more third party stream [here](https://github.com/trentm/node-bunyan/wiki/Awesome-Bunyan#streams).

Example to send error to Sentry.  
Also [refer](https://stackoverflow.com/questions/53310580/sentry-node-integration-to-wrap-bunyan-log-calls-as-breadcrumbs)

```javascript
import * as Sentry from '@sentry/node'
Sentry.init({
  dsn: 'https://<key>@sentry.io/<project>'
})
var bunyan = require('bunyan')
var bsyslog = require('bunyan-syslog')
var log = bunyan.createLogger({
  name: 'base-app-mantle',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'error',
      stream: () = ({
        write: (err) => {
          Sentry.captureException(err, (sentryError, eventId) => {
            console.log(`Reported error ${eventId}`)
          })
        }
      })
    }
  ]
})
```

Example to send error to Papertrail.  
Also [refer](https://blog.papertrailapp.com/best-practices-for-logging-in-nodejs/)

```javascript
var bunyan = require('bunyan')
var bsyslog = require('bunyan-syslog')
var log = bunyan.createLogger({
  name: 'base-app-mantle',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
    {
    level: 'error',
    type: 'raw',  // raw object is send instead of stringified one
    stream: bsyslog.createBunyanStream({
      type: 'sys',
      host: 'logs5.papertrailapp.com', // papertrail url
      port: 59738 // papertrail port
    })
  }]
})
```
