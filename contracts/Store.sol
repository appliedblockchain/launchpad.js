pragma solidity ^0.4.23;

contract Store {
  string data;
  address latestWriter;

  function set(string newData) public {
    latestWriter = msg.sender;
    data = newData;
  }

  function get() constant public returns (string) {
    return data;
  }

  function getLatestWriter() constant public returns (address) {
    return latestWriter;
  }
}
