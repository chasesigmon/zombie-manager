const shell = require('shelljs');
shell.config.silent = true;

console.log('-- Executing inspect volume command... --');

const volume = shell.exec(`docker volume inspect zombiedata`).stdout;

if (!volume) {
  console.log(
    '-- Nothing returned from inspect volume, exiting... --',
  );
}

if (volume.trim().toString() === '[]') {
  console.log('-- Volume does not exist, creating... --');
  shell.exec(`docker volume create zombiedata`);
  console.log('-- Volume created --');
} else {
  console.log('-- Volume exists');
}

console.log('-- Executing check for container... --');

const runningContainer = shell.exec(`docker ps | grep zombiedb`)
  .stdout;

let containerIsRunning = false;
if (!runningContainer) {
  console.log('-- Container not running, checking if stopped... --');
  const stoppedContainer = shell.exec(
    `docker ps -a | grep zombiedb`,
  ).stdout;
  if (stoppedContainer) {
    console.log('-- Container is stopped, starting... --');
    shell.exec(`docker start zombiedb`);
    console.log('-- Container started');
    containerIsRunning = true;
  }
} else {
  containerIsRunning = true;
  console.log('-- Container is running');
}

if (!containerIsRunning) {
  console.log('-- Container does not exist, creating... --');
  shell.exec(
    `docker run -d --name zombiedb -p 27017:27017 -v zombiedata:/data/db mvertes/alpine-mongo`,
  );
  console.log('-- Container created');
}

console.log('-- Finished starting mongodb --');
