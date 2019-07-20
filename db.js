const fs = require('fs').promises;

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */

function log(file) {
  return fs.appendFile(`log.txt`,`${file}`);
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

/*
Reads from json file and returns parsed object
@param {string} file
@returns object
*/

async function getObject(){
  return fs.readFile(`${file}`).then(data=>JSON.parse(data))
}

/*
Writes file as a parsed object
returns parsed object
*/

async function writeObject(file, obj){
  return fs.writeFile(`${file}`, JSON.stringify(obj))
}

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
function set(file, key, value) {
  // Open file, parse data, set object[key] to value, rewrite object to file
  return fs
    .readFile(file, 'utf-8')
    .then(data => {
      const obj = JSON.parse(data);
      obj[key] = value;
      log(`${file} ${key} updated to ${value}`);
      return fs.writeFile(file, JSON.stringify(obj));
    })
    .catch(err => log(`Error reading file ${file}`, err));
}


/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */

function remove(file, key) {
  return fs
    .readFile(file, 'utf-8')
    .then(data => {
      const obj = JSON.parse(data);
      if (!obj[key]) {
        return log(
          `Error invalid key ${key}`,
          new Error(`Error invalid key "${key}"`)
        );
      }
      delete obj[key];
      // console.log(JSON.stringify(obj));
      log(`Deleted key ${key} from ${file}`);
      return fs.writeFile(file, JSON.stringify(obj));
    })
    .catch(err => log(`Error reading file ${file}`, err));
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
 * Promise constructor.
 * Resolves if no access, rejects if access.
 * @param {string} file file to test access
 */
const noAccess = file =>
  new Promise((resolve, reject) =>
    fs
      .access(file)
      .then(() => reject(new Error('File already exists')))
      .catch(resolve)
  );

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
async function createFile(file, content) {
  try {
    const localFiles = await fs.readdir('./');
    let fileExists = false;
    localFiles.forEach(filename => {
      if (filename === file) {
        fileExists = true;
      }
    });
    if (fileExists) {
      return log(
        `File ${file} already exists`,
        console.log(`Error creating file. ${file} already exists`)
      );
    }
    log(`File ${file} created`);
    return fs.writeFile(file, JSON.stringify(content));
  } catch (err) {
    return log(`Error creating file ${file}`, err);
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
  getObject, 
  writeObject,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  noAccess,
  intersect,
  difference,
  getFile
};
