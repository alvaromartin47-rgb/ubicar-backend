const app = require("../src/server");
const User = require("./entities/User");

const NodeEnvironment = require('jest-environment-node').TestEnvironment;

class EndToEndEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // this.global.user = await User.create(app, "alvaro@gmail.com");
  }

  async teardown() {
    await super.teardown();
    // await someTeardownTasks();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = EndToEndEnvironment;