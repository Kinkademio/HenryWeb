const fs = require('fs');
const path = require('path');
const mime = require('mime-types')
const boom = require('boom')

const customCrud = () => ({
    /**
     * Получение файлов из папки uploads
     * @param {*} req 
     * @param {*} res 
     */
    async get(req, res) {
        window.open(ROOT + '/uploads/index.html');
    },
    /**
     * Запись указанного файла на сервер
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async create(req, res){
        try{
            if (req.files) {
                let uploaded_file = req.files.file;
                //генерируем случайное имя для файла
                let server_file_name = (Date.now()).toString() + path.extname(uploaded_file.name);
                file_url = '/uploads/' + server_file_name;
                uploaded_file.mv(ROOT + file_url);
                file_url = SERVER_URL + file_url;
            }
            return res.status(200).send(file_url);
        }catch (err){
            return res.status(400).send({ status: false, err: boom.boomify(err) });
        }
       
    },
});
module.exports = {
    ...customCrud()
}

