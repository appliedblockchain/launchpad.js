pragma solidity ^0.4.23;

contract Store {
  string myVariable;

  function set(string data) public {
    myVariable = data;
  }

  function get() constant public returns (string) {
    return myVariable;
  }

  // latestWriter function
}
