const execute = require('../../execute');
const path = require('path');

const output = require('./hello-world.ink.json');

describe('Hello world test.', () => {
  it('Tests the hello world.', () => {
    expect.assertions(1);
  
    const data = execute({
      countAllVisits: true,
      isCaching: false,
      inputFilepath: path.join(__dirname, 'hello-world.ink'),
      outputFilepath: null,
      verbose: false,
      DEBUG: false,
    });
  
    return expect(data.then((inkRet) => {
      return inkRet.storyContent;
    })).resolves.toMatchObject(output);
  });
});
