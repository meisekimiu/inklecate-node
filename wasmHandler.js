const ArgsEnum = require('./ArgsEnum');
const {
  error,
  log,
} = require('colorful-logging');
const finish = require('./finish');
const {
  readFile,
  writeFile,
} = require('fs-extra');
const { initializeMonoEnvironment } = require('inklecate-wasm');

module.exports = async (args) => {
  const {
    inputFilepath,
    isCaching,
    isPlaying,
    outputFilepath,
    DEBUG,
  } = args;

  const readProm = readFile(inputFilepath, 'utf8');
  const compileProm = initializeMonoEnvironment();

  const [
    ink,
    compile,
  ] = await Promise.all([
    readProm,
    compileProm,
  ]);

  const {
    compilerOutput,
    storyContent,
    text,
  } = compile(ink);

  const finishArgs = {
    compilerOutput,
    inputFilepath,
    isPlaying,
    isCaching,
    outputFilepath,
    storyContent,
    text,
    DEBUG,
  };

  return finish(finishArgs);
};
