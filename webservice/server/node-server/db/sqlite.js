const sqlite3 = require("sqlite3").verbose();
const uuid = require('uuid4');

const TABLE = 'PROFILE';
const COLUMNS = ['id', 'name', 'clearanceType', 'position', 'age', 'height', 'weight', 'phone', 'email', 'image'];
const SELECT_ALL = `SELECT ${COLUMNS.join()} FROM ${TABLE}`;
const SELECT = `SELECT ${COLUMNS.join()} FROM ${TABLE} WHERE id =?`;
const INSERT = `INSERT INTO ${TABLE} (${COLUMNS.join()}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const UPDATE = `UPDATE ${TABLE} SET ${COLUMNS.join('=?, ')}=? WHERE id=?`;
const DELETE = `DELETE FROM ${TABLE} WHERE id=?`;

const NOT_FOUND = 'not found';
const SUCCESS = 'success';
const ERROR = 'error';

var db;

module.exports = {
    NOT_FOUND: NOT_FOUND,
    SUCCESS: SUCCESS,
    ERROR: ERROR,

    open: function (config) {

        db = new sqlite3.Database(config.database.file, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Connected to ${config.database.file}`);
            }
        });
    },

    getAllProfiles: function (callback) {
        const results = {status: SUCCESS, data: [], errors: []};
        db.all(SELECT_ALL, [], (err, rows) => {
            if (err) {
                results.status = ERROR;
                results.errors.push(err);
            }

            rows.forEach((row) => {
                results.data.push(row);
            });
            callback(results);
        });
    },

    getProfile: function (id, callback) {
        const results = {status: NOT_FOUND, data: [], errors: []};
        db.all(SELECT, [id], (err, rows) => {
            if (err) {
                results.errors.push(err);
                results.status = ERROR;
            }

            rows.forEach((row) => {
                results.data.push(row);
                results.status = SUCCESS;
            });
            callback(results);
        });
    },

    insertProfile: function (profile, callback) {
        const results = {status: SUCCESS, data: [], errors: []};

        db.run(INSERT, [profile.id, profile.name, profile.clearanceType,
            profile.position, profile.age, profile.height, profile.weight, profile.phone,
            profile.email, profile.image], function (err) {

            if (err) {
                results.status = ERROR;
                results.errors.push(err);
            }

            results.data = profile;
            callback(results);
        });

    },

    updateProfile: function (profile, callback) {
        const results = {status: SUCCESS, data: [], errors: []};

        db.run(UPDATE, [profile.id, profile.name, profile.clearanceType,
            profile.position, profile.age, profile.height, profile.weight, profile.phone,
            profile.email, profile.image, profile.id], function (err) {

            if (err) {
                results.status = ERROR;
                results.errors.push(err);
            }

            results.data = profile;
            callback(results);
        });
    },

    deleteProfile: function (id, callback) {
        const results = {status: SUCCESS, data: [], errors: []};

        db.run(DELETE, [id], function (err) {

            if (err) {
                results.status = ERROR;
                results.errors.push(err);
            }

            callback(results);
        });
    }
}