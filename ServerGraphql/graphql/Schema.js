const { buildSchema } = require('graphql')
const Contact = require('../models/Contact')


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
    updatePhonebook(_id: ID, input: PhonebookInput): Phonebook
    deleteUser(_id: ID): Phonebook
}
`)

const solution = {
    getPhonebooks: async ({ page = 1, limit = 30, keyword = '', sort = 'asc' }) => {
        const offset = (page - 1) * limit
        const data = await Contact.find().limit(limit).skip(offset)
        console.log(data)
        return {
            phonebooks: data,
            page,
            limit,
        }
    },
    createUser: ({ input }) => Contact.create(input),
    updateUser: ({ id, input }) => Contact.findOneAndUpdate(id, input, { new: true }),
    deletePhonebook: ({ id }) => Contact.findByIdAndDelete(id)
}

module.exports = { schema, solution }