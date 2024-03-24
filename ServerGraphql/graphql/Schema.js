const { buildSchema } = require('graphql')
const { getPhonebooks, createPhonebook, updatePhonebook, deletePhonebook } = require('../services/Scontact')


const schema = buildSchema(`

type Phonebook {
    _id: ID!
    name: String!
    phone: String!
    avatar: String
}

type Phonebooks {
    phonebooks: [Phonebook]
    page: Int
    limit: Int
    pages: Int
    total: Int
}

input PhonebookInput {
    name: String!
    phone: String!
}

type Query {
    getPhonebooks( page: Int, limit: Int, keyword: String, sort: String): Phonebooks
}

type Mutation {
    createPhonebook(input: PhonebookInput): Phonebook
    deletePhonebook(_id: ID): Phonebook
    updatePhonebook(_id: ID, input: PhonebookInput): Phonebook
}
`)

const solution = {
  getPhonebooks: ({ page = 1, limit = 30, keyword = '', sort = 'asc' }) => getPhonebooks({ page, limit, keyword, sort }),
  createPhonebook: ({ input }) => createPhonebook(input),
  updatePhonebook: ({ _id, input }) => updatePhonebook(_id, input),
  deletePhonebook: ({ _id }) => deletePhonebook(_id)
}

module.exports = { schema, solution }

/*
query{
getPhonebooks{
        phonebooks {
            _id,
            name,
            phone,
            avatar
        }
    }
}

query{
    getPhonebooks(page: 1, limit: 1){
    page
        phonebooks {
            name
    }
  }
}

params: {
    page,
    any params
}

mutation {
  createPhonebook(input: {name: "Rubi Henjaya", phone: "088123444"}) {
    _id
    name
    phone
    avatar
  }
}

mutation {
  deletePhonebook(_id: "65defaffd5659645d46732b0") {
    _id
    name
    phone
    avatar
  }
}

mutation {
  updatePhonebook(_id: "65db4bdc79812ce388dca088", input: {name: "m ramdani", phone: "08821896177810"}) {
    _id
    name
    phone
    avatar
  }
}


*/

