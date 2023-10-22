const boom = require('boom');
const { Test } = require('../models');
const path = require('path');

const customCrud = () => ({
      /**
     * Получение одной записи по id
     * @param {*} param0 
     * @param {*} res 
     * @returns 
     */
      async get({params: {id}}, res) {
        try {
            const item = await Test.findOne({'hashId': id})
            return res.status(200).send(item)

        } catch (err) {
            return res.status(400).send({status: false, err: boom.boomify(err)});
        }
    },
    /**
     * Получение всех записей
     * @param {*} _ 
     * @param {*} res 
     * @returns 
     */
    async getAll(_, res) {
        try {
            const items = await Test.find()
            return res.status(200).send(items)

        } catch (err) {
            return res.status(400).send({status: false, err: boom.boomify(err)});
        }
    },
    /**
     * Добавление записи
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async create(req, res) {
        try {
            const item = new Test(req.body)
            const newItem = await item.save()
            return res.status(200).send(newItem)

        } catch (err) {
            return res.status(400).send({status: false, err: boom.boomify(err)});
        }
    },
    /**
     * Обновление записи по id
     * @param {*} param0 
     * @param {*} res 
     * @returns 
     */
    async update({ params: { id }, body }, res) {
        try {
            const item = await Test.findByIdAndUpdate(id, body, { new: true })
            return res.status(200).send(item)

        } catch (err) {
            return res.status(400).send({ status: false, err: boom.boomify(err) });
        }
    },
    /**
     * Удаление записи
     * @param {*} param0 
     * @param {*} res 
     * @returns 
     */
    async delete({ params: { id } }, res) {
        try {
            await Test.findByIdAndDelete(id)
            return res.status(200).send({ status: 'ok', massage: 'Удалено' })
        } catch (err) {
            return res.status(400).send({ status: false, err: boom.boomify(err) });
        }
    },
})

module.exports = {
    ...customCrud()
}

