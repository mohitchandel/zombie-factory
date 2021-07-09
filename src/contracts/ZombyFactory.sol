// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ZombyFactory{
    
    struct Zomby{
        string color;
        string name;
        uint8 age;
        bytes32 zombyDna;
    }
    Zomby public zomby;

    function makingZomby(string memory _color, string memory _name, uint8 _age ) public{
        bytes32 Dna = keccak256(abi.encodePacked(_color,_name,_age));
        zomby= Zomby(_color,_name,_age, Dna);
    }

    function zombyResult() public view returns(Zomby memory){
        return zomby;
    }

}