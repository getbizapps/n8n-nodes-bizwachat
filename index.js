const { Bizwachat } = require('./dist/nodes/Bizwachat/Bizwachat.node');
const { BizwachatTrigger } = require('./dist/nodes/Bizwachat/BizwachatTrigger.node');

module.exports = {
  nodes: [
    Bizwachat,
    BizwachatTrigger,
  ],
};
