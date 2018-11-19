# Backup and Restoring Parity Data

## Backup

Backup script is ran by a cron job at 06 every day. The back up file name is date (on which backup made) in `YYYY-MM-DD` format.

Following file is backup on 20th of November 2018.
```
2018-11-20.tar.gz
```

The backup file from different parity node uploaded to AWS S3 bucket. The files for each parity node is saved in different folders.

## Restoring

> **Warning**: Restored data contract can not be connected if contract address not provided. Contract address of backup should noted and used to correctly connect.

In order to restore backup file, container should be ran with paramter `restore` and `FILENAME`.

`docker-compose run --rm parity1 restore 2018-11-20.tar.gz` will download data S3 and restore to the parity1 volume. This should be repeated for all the parity node connected.


```shell
$ docker-compose build parity1 parity2 parity3
$ docker-compose run --rm parity1 restore <FILENAME>
$ docker-compose run --rm parity2 restore <FILENAME>
$ docker-compose run --rm parity3 restore <FILENAME>

$ docker-compose up
```

#### Issues:
While restoring it is possible that volume data conflicts in which case volumes for parity should be deleted.

> **Warning**: This will replace data.

```shell
$ docker-compose down -v
```
