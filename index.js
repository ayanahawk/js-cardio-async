const readline = require('readline-sync');
const db = require('./db');

async function promptUser() {
  const input = readline.question('What would you like to do?\n');
  const program = input.split(' ')[0];
  const args = input.match(/"([^"]+)"/g) || [];
  if (program === 'quit') {
    return;
  }
  if (!db[program]) {
    console.log('Invalid program');
  } else {
    await db[program](...args.map(arg => arg.slice(1, arg.length - 1)));
  }
  promptUser();
}

promptUser();
