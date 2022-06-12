const { SHA256 } = require("crypto-js");
const sha256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = async () => await this.computeHash();
  }

  computeHash() {
    return sha256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

module.exports = Block;
