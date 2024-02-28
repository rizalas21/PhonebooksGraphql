var express = require('express');
var router = express.Router();
const Contact = require('../models/Contact')

router.get('/phonebooks', async function (req, res) {
  try {
    const { page = 1, limit = 30, keyword = "", sort = "ASC" } = req.query
    const params = {}
    if (keyword) {
      params['$or'] = [
        { 'name': new RegExp(keyword, 'i') },
        { 'phone': new RegExp(keyword, 'i') }
      ]
    }

    const data = await Contact.find(params)
    const total = data.length
    const offset = (page - 1) * limit
    const users = await Contact.find(params).sort(sort).limit(limit).skip(offset)
    const pages = Math.ceil(total / limit)

    res.status(200).json({
      phonebooks: users,
      page: Number(page),
      limit: Number(limit),
      pages: Number(pages),
      total
    })
  } catch (err) {
    console.log('masuk error get', err)
    res.status(500).json(err)
  }
});

router.get('/phonebooks/:id', async function (req, res) {
  try {
    const { id } = req.params
    const users = await Contact.findById(id)
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.post('/phonebooks', async function (req, res) {
  try {
    const { name, phone } = req.body
    if (!name && !phone) res.status(500).json(new Error("name and phone don't be empty"))
    const user = await Contact.create({ name, phone, avatar: null })
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.put('/phonebooks/:id', async function (req, res) {
  try {
    const { id } = req.params
    const { name, phone } = req.body
    const user = await Contact.findByIdAndUpdate(id, { name, phone }, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json({ err })
  }
})

router.delete('/phonebooks/:id', async function (req, res) {
  try {
    const user = await Contact.findByIdAndDelete(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ err })
    console.log('masuk error')
  }
});

router.put('/phonebooks/:id/avatar', async function (req, res) {
  try {
    const { id } = req.params
    let avatar
    let uploadPath

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    avatar = req.files.avatar
    const fileName = Date.now() + '_' + avatar.name
    uploadPath = path.join(__dirname, '..', 'public', 'images', fileName)

    avatar.mv(uploadPath, async function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const update = await Contact.findOneAndUpdate(
          { _id: id },
          { avatar: fileName },
          { new: true })

        if (update === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json(update)
      } catch (error) {
        res.status(500).send(error)
      }
    })
  } catch (err) {
    res.status(500).json({ err })
  }
})

module.exports = router;
