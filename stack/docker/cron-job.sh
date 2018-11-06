#!/usr/bin/env sh
BACKUP_NAME="$1"
tar -czvf "$BACKUP_NAME" /parity/data/chains/parity

# echo "hello" > ./test.txt
echo "Archive complete..."
