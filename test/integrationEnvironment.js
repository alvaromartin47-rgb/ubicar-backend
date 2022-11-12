import app from '../src/server';
import User from "./entities/User";

import NodeEnvironment from 'jest-environment-node';
NodeEnvironment.TestEnvironment;

export default class IntegrationEnvironment extends NodeEnvironment {

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