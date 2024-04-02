const Contact = require('../models/Contact')


const getPhonebooks = async ({ page = 1, limit = 30, keyword = '', sort = 'asc' }) => {
    try {
        const params = {}
        if (keyword) {
            params['$or'] = [
                { 'name': new RegExp(keyword, 'i') },
                { 'phone': new RegExp(keyword, 'i') }
            ]
        }

        const dataCount = await Contact.find(params)
        const total = dataCount.length
        const offset = (page - 1) * limit
        const pages = Math.ceil(total / limit)
        const data = await Contact.find(params).sort({ name: sort }).limit(limit).skip(offset)
        return {
            phonebooks: data,
            page,
            limit,
            pages,
            total
        }
    }
    catch (err) {
        console.log(err)
    }
}

const createPhonebook = async (input) => {
    try {
        const data = await Contact.create(input)
        return data
    } catch (err) {
        console.log(err)
    }
}

const updatePhonebook = async ({ _id, input }) => {
    try {
        const data = await Contact.findOneAndUpdate(_id, input, { new: true })
        return data
    } catch (err) {
        console.log(err)
    }
}

const deletePhonebook = async ({ _id }) => await Contact.findByIdAndDelete(_id)

module.exports = { getPhonebooks, createPhonebook, updatePhonebook, deletePhonebook }