pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract HelloWorld {
    bytes32 helloWorldText;

    event helloWorldUpdated();

    constructor() public {
       helloWorldText = "Hello World";
    }

    function updateHelloWorld(bytes32 _helloWorldText) public {

        helloWorldText = _helloWorldText;

        emit helloWorldUpdated();
    }

    function getHelloWorld() public view returns (bytes32) {
        return helloWorldText;
    }
}
