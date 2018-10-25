
pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;

contract Notes {
    uint notesCount;
    mapping (address => uint) users;
    struct Note {
        string tag; // unencrypted text
        string encryptedText; 
        address author;
        address[] addresses;
        bytes encKeys;
    }
    mapping (uint => mapping(address => bytes)) encSymKeys;
    mapping (uint => Note) notes;
    
    constructor () public {
        notesCount = 0;
    }

    function addNote(string tag, string content, address author, address[] addresses, bytes encKeys) public {
        uint keysNum = encKeys.length / 188;
        uint addressesLength = addresses.length;
        assert(encKeys.length % 188 == 0);
        assert(addressesLength == keysNum);
        Note memory note = Note({ tag: tag, encryptedText: content, author: author, addresses: addresses, encKeys: encKeys });
        notes[notesCount] = note;
        notesCount++;
    }
    
    function getNotesCount() public view returns (uint) {
        return notesCount;
    }
    
    function getNote(uint id) public view  returns (string, string, address, address[], bytes) {
        Note memory note = notes[id];
        return (note.tag, note.encryptedText, note.author, note.addresses, note.encKeys);
    }    
}
