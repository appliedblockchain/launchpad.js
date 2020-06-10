pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract HelloWorld {
    string helloWorldText;

    event helloWorldUpdated(string value);

    constructor() public {
       helloWorldText = "Hello World";
    }

    function updateHelloWorld(string memory _helloWorldText) public returns (bool) {
        helloWorldText = _helloWorldText;

        emit helloWorldUpdated(helloWorldText);
        return true;
    }

    function getHelloWorld() public view returns (string memory) {
      return helloWorldText;
    }
}
