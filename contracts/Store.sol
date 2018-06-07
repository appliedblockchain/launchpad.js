pragma solidity ^0.4.23;

contract Store {
  string myVariable;

  function set(string x) public {
    myVariable = x;
  }

  function get() constant public returns (string) {
    return myVariable;
  }

  // latestWriter function
}
