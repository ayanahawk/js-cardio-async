const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */

function reset() {
  const andrew = fs.writeFile(
    './andrew.json',
    JSON.stringify({
      firstname: 'Andrew',
      lastname: 'Maney',
      email: 'amaney@talentpath.com',
    })
  );
  const scott = fs.writeFile(
    './scott.json',
    JSON.stringify({
      firstname: 'Scott',
      lastname: 'Roberts',
      email: 'sroberts@talentpath.com',
      username: 'scoot',
    })
  );
  const post = fs.writeFile(
    './post.json',
    JSON.stringify({
      title: 'Async/Await lesson',
      description: 'How to write asynchronous JavaScript',
      date: 'July 15, 2019',
    })
  );
  const log = fs.writeFile('./log.txt', '');
  return Promise.all([andrew, scott, post, log]);
}

function log(value) {
  return fs.appendFile('log.txt', `${value} ${Date.now()}\n`);
}
function get(file, key) {
  // 1. read file
  // 2. handle promise-
  return fs
    .readFile(file, 'utf8')
    .then(data => {
      // 3. parse data from string-JSON
      const parsed = JSON.parse(data);
      // 4. use the kney to get the value object[key]
      const value = parsed[key];

      return log(value);
    })
    .catch(err => log(`error ${file}`));
  // 5. append the log file with the aboive value
}

// async function get(file, key) {
//   const data = await fs.readFile(file, 'utf8');
//   const parsed = JSON.parse(data);
//   const value = parsed[key];
//   return value;
// }

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
async function set(file, key, value) {
  try {
    // read file
    const data = await fs.readFile(file, `utf8`);
    // handle promise data
    const parsed = JSON.parse(data);
    parsed[key] = value;
    // return object to JSON string.
    const newObj = JSON.stringify(parsed);
    await fs.writeFile(file, newObj);
    return log(`${key}: ${value} set in ${file}`);
  } catch (err) {
    return log(`No such file or directory ${file}`);
  }
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */

async function remove(file, key) {
  // 1- reading the file
  const data = await fs.readFile(file);
  // parsing the data
  const parsed = JSON.parse(data);
  // getting the data
  delete parsed[key];
  await fs.writeFile(`${file}`, JSON.stringify(parsed), 'utf-8');
  return console.log(parsed);
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
async function deleteFile(file) {
  // 3- check if it exists
  // 4- delete file
  return fs
    .access(file)
    .then(() => fs.unlink(file))
    .catch(err => console.log('There is an error'));
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */


const noAccess=file =>
  new Promise(resolve,reject)=>
  fs.access()



function createFile(file) {
  return fs
    .access(`${file}`)
    .then(() =>
      log(`Cannot create file, '${file}' already exists`, 'File already exists')
    )
    .catch(() => fs.writeFile(`${file}`, '{}'))
    .then(() => log(`Successfully created '${file}'`));
}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */
function mergeData() {}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
