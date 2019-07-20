const fs = require('fs').promises;

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */

function log(file) {
  return fs.appendFile(`${file}`);
}

/**
 * Returns raw data from json file
 * @param {string} file - filename
 */

async function get(file, key) {
  /* Async/await approach */
  try {
    // 1. read file
    // 2. handle promise -> data
    const data = await fs.readFile(`${file}`, `utf8`);
    // 3. parse data from string -> JSON
    const parsed = JSON.parse(data);
    // 4. use the key to get the value at object[key]
    const value = parsed[key];

    if (!value) {
      return log(
        `Error invalid key ${key}`,
        new Error(`Error invalid key "${key}"`)
      );
    }
    await log(value);
    return value;
  } catch (err) {
    // 5. append the log file with the above value
    return log(`ERROR no such file or directory ${file}`, err);
  }
}

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
    await fs.write(file, JSON.stringify(body));
    return log(`${file}: No such file or directory ${file}`);
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

const noAccess = file =>
  new Promise((resolve, reject) =>
    fs
      .access(file)
      .then(reject)
      .catch(resolve)
  );

async function createFile(file) {
  try {
    await noAccess(file);
    await fs.writeFile(file, `{}`);
    return log(`${file}: created`);
  } catch (err) {
    return log(`ERROR file or directory already exists: ${file}`);
  }
}

/**
 * Returns raw data from json file
 * @param {string} file - filename
 */
async function getFile(file) {
  try {
    const contents = await fs.readFile(file);
    await log(`Succesfully got ${file}`);
    return contents;
  } catch (err) {
    return log(`Error reading ${file}`, err);
  }
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
  getFile
};
