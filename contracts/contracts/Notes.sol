pragma experimental ABIEncoderV2;
pragma solidity ^0.4.18;

contract Notes {
    uint notesCount;
    mapping(uint => string) notes;
    
    constructor () public{
        notesCount = 0;
    }

    function addNote(string content) public {
        notes[notesCount] = content;
        notesCount++;
    }
    
    function getNotesCount( ) public view returns (uint ) {
        return notesCount;
    }
    
    function getNote(uint id) public view  returns (string) {
        return notes[id];
    }
    
}
