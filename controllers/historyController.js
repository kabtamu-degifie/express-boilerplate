const History = require("../models/history");
const Block = require("../utils/blockchains/block");
const Blockchain = require("../utils/blockchains/blockchain");

const addHistory = async (req, res) => {
  const history = await History.findOne({ user: req.params.id });
  const historyBlock = new Blockchain(history?.blockchain || []);

  if (history?.blockchain?.length > 0) {
    // create new block
    historyBlock.addNewBlock(
      new Block(history.blockchain.length + 1, Date.now(), { ...req.body })
    );

    // push to blockchain
    history.blockchain.push(
      historyBlock.blockchain[historyBlock.blockchain.length - 1]
    );

    // update document
    const result = await History.findOneAndUpdate(
      { user: req.params.id },
      {
        blockchain: history.blockchain,
      },
      { new: true }
    );
    res.status(200).send(result);
  } else {
    // genesis block
    historyBlock.addNewBlock(new Block(0, Date.now(), { ...req.body }));
    const result = await History.create({
      user: req.params.id,
      blockchain: historyBlock.blockchain[0],
    });
    res.status(200).send(result);
  }
};

module.exports = { addHistory };
