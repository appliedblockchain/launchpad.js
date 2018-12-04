pragma solidity ^0.4.2;
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

    mapping (uint => Note) notes;

    event NoteAdded(uint id);

    constructor() public {
        notesCount = 0;
    }

    function addNote(string memory tag, string memory content, address author, address[] memory addresses, bytes memory encKeys) public {
        uint keysNum = encKeys.length / 188;
        uint addressesLength = addresses.length;

        assert(encKeys.length % 188 == 0);
        assert(addressesLength == keysNum);

        Note memory note = Note({ tag: tag, encryptedText: content, author: author, addresses: addresses, encKeys: encKeys });
        notes[notesCount] = note;
        emit NoteAdded(notesCount);

        notesCount++;
    }

    function getNotesCount() public view returns (uint _notesCount) {
        return notesCount;
    }

    function getNote(uint id) public view returns (string memory tag, string memory encryptedText, address author, address[] memory addresses, bytes memory encKeys) {
        Note memory note = notes[id];
        return (note.tag, note.encryptedText, note.author, note.addresses, note.encKeys);
    }
}
