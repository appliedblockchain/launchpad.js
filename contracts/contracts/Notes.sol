pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

contract Notes {
  
  mapping(uint => string) public notes;

  function Notes (){
    uint id = 0;
  }

  function addNote(string content) public {

    notes[id] = content;
    id++;
  }

  function getNote() constant public returns (mapping(uint => string) ) {
    return notes;
  }

}
