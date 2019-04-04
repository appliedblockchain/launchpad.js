# Backup and Restoring Parity Data

## Backup

A backup script is ran by a cron job at 06 every day. The back up filename is the date of file creation in `YYYY-MM-DD` format.

The following file is an example of a backup made on 20th November 2018.
```
2018-11-20.tar.gz
```

The backup file from different parity nodes are uploaded to an AWS S3 bucket. The files for each parity node are saved in different folders.

## Restoring

> **Warning**: Restored data contract can not be connected if a contract address is not provided. The contract address of an associated backup should be noted and used to correctly connect.

In order to restore a backup file, the container should be run with parameters `restore` and `FILENAME`.

`docker-compose run --rm parity1 restore 2018-11-20.tar.gz` will download S3 data and restore it to the parity1 volume. This should be repeated for all connected parity nodes.


```shell
$ docker-compose build parity1 parity2 parity3
$ docker-compose run --rm parity1 restore <FILENAME>
$ docker-compose run --rm parity2 restore <FILENAME>
$ docker-compose run --rm parity3 restore <FILENAME>

$ docker-compose up
```

#### Issues:

While restoring it is possible that you will encounter conflicts with your volume data. In this case, volumes for parity should be deleted.

> **Warning**: This will replace data.

```shell
$ docker-compose down -v
```
