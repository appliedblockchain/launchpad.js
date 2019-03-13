while [ 1 ]
do
  STATUS=$(curl --verbose $API_URL 2>&1| grep "< HTTP/1.1 200 OK")
  if [[ "$STATUS" =~ "< HTTP/1.1 200 OK" ]]
  then
    break
  fi
  echo "Waiting for $API_URL"
  sleep 1
done

while [ 1 ]
do
  STATUS=$(curl --verbose $TEST_URL 2>&1| grep "< HTTP/1.1 200 OK")
  echo "Waiting for $TEST_URL"
  if [[ "$STATUS" =~ "< HTTP/1.1 200 OK" ]]
  then
    break
  fi
  echo "Waiting for $TEST_URL"
  sleep 1
done