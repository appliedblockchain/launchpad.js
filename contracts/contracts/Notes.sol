pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

contract Notes {
  string note = '';

  function addNote(string newNote) public {
    note = newNote;
  }

  function getNote() constant public returns (string) {
    return note;
  }

}
