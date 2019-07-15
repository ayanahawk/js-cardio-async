const fs = require('fs').promises;

/* snippet.json */

/**
 * Read and write to the file with something new
 *
 * 1. Read the file
 * 2. Parse the result
 * 3. Add to the object
 * 4. Stringify the result
 * 5. Write it back to the file
 *
 * @param {String} filePath Relative file path
 * @param {String} newKey New key of the property added to the object
 * @param {Any} newValue Whatever you want to add
 */
const readAndWrite = (filePath, newKey, newValue) => {};

/**
 * Get the "secret" property from the correct file.
 * @param {String} filePath Relative file path
 * @return {String} the secret
 */
const getSecret = filePath => {
  // do something
};

/**
 * Get all "items" from "snippet.json" and remove the first item
 * @param {String} filePath Relative file path
 * @return {String} the removed item
 */
const removeFirstItem = filePath => {};

// Get all "items" and append one item to the end of the list
/**
 * Get all "items" from "snippet.json" and append an item to the end of the list
 * @param {String} filePath Relative file path
 * @return {Boolean} Append operation result
 */
const appendItem = (filePath, item) => {};

/* user.json */

/**
 * 1. Delete the file
 * 2. Create the file with the original data
 * @param {String} filePath Relative file path
 */
const seedUsers = filePath => {};

/* All: [snippet.json, user.json, log.txt] */

/**
 * Read all files and return all data
 * @param {Array<String>} filePaths Relative file paths
 * @returns {Object} All data from each file
 */
const getAllData = filePaths => {};

/**
 * Deletes all memory files, but the log.txt file
 * @param {Array<String>} filePaths Relative file paths
 */
const deleteFiles = filePaths => {};
