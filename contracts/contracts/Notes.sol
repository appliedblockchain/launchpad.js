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

    mapping (uint => Note) notes;

    event NoteAdded(uint id);

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
        emit NoteAdded(notesCount);
        notesCount++;
    }

    function getNotesCount() public view returns (uint) {
        return notesCount;
    }

    function getNote(uint id) public view  returns (string tag, string encryptedText, address author, address[] addresses, bytes encKeys) {
        Note memory note = notes[id];
        return (note.tag, note.encryptedText, note.author, note.addresses, note.encKeys);
    }
}
