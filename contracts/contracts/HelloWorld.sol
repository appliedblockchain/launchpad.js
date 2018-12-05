pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract HelloWorld {
    string helloWorldText;

    event helloWorldUpdated();

    constructor() public {
       helloWorldText = "Hello World";
    }

    function updateHelloWorld(string memory _helloWorldText) public {

        helloWorldText = _helloWorldText;

        emit helloWorldUpdated();
    }

    function getHelloWorld() public view returns (string memory _helloWorld) {
      return helloWorldText;
    }
}
