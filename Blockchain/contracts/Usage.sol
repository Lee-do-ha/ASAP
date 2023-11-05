// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Usage {
    mapping(address => bytes32) public usageHashes;

    function setUsage(bytes32 usageHash) public {
        require(usageHash != bytes32(0), "Invalid usage hash");
        usageHashes[msg.sender] = usageHash;
    }

    function getUsage() public view returns (bytes32) {
        return usageHashes[msg.sender];
    }

    function getUsage2(address sender) public view returns (bytes32) {
        return usageHashes[sender];
    }
}