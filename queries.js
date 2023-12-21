const SELECT_ALL = `SELECT * FROM`;
const PAGINATION = `LIMIT $1 OFFSET $2`;
const ORDER_BY_DESC_DATE = `ORDER BY since DESC`;
const BY_ID = `WHERE id=$1`;
const BY_USER_ID = `WHERE userId=$1`;
const BY_EMAIL = `WHERE email=$1`;

/* Pet Queries */ 
const SELECT_ALL_PETS = `${SELECT_ALL} pets`;
const SELECT_PETS_BY_DESC_DATE = `${SELECT_ALL_PETS} ${ORDER_BY_DESC_DATE}`;
const SELECT_PETS_BY_PAGINATION = `${SELECT_PETS_BY_DESC_DATE} ${PAGINATION}`;
const SELECT_TOTAL_NUM_OF_PETS = `SELECT COUNT(*) FROM pets`;
const SELECT_PET_BY_ID = `${SELECT_ALL_PETS} ${BY_ID}`;
const SELECT_PETS_BY_USER = `${SELECT_ALL_PETS} ${BY_USER_ID} ${ORDER_BY_DESC_DATE}`;

const UPDATE_PET = `UPDATE pets SET petstatus=$1, petlocation=$2, species=$3, petsize=$4, breed=$5, sex=$6, color=$7, age=$8, uniquefeature=$9, postdescription=$10 WHERE id=$11`;

const DELETE_ALL_PETS = `DELETE FROM pets`
const DELETE_PET = `${DELETE_ALL_PETS} ${BY_ID}`;


/* User Queries */ 
const SELECT_ALL_USERS = `${SELECT_ALL} users`;
const SELECT_USER_BY_ID = `${SELECT_ALL_USERS} ${BY_ID}`;
const SELECT_USER_BY_EMAIL = `${SELECT_ALL_USERS} ${BY_EMAIL}`;

const UPDATE_USER = `UPDATE users SET username=$1, email=$2, pw=$3, phone=$4 WHERE id=$5`;

module.exports = {
    SELECT_PETS_BY_DESC_DATE,
    SELECT_PETS_BY_PAGINATION,
    SELECT_TOTAL_NUM_OF_PETS,
    SELECT_PET_BY_ID,
    SELECT_ALL_USERS,
    SELECT_USER_BY_ID,
    SELECT_PETS_BY_USER,
    SELECT_USER_BY_EMAIL,
    UPDATE_PET,
    UPDATE_USER,
    DELETE_ALL_PETS,
    DELETE_PET
}