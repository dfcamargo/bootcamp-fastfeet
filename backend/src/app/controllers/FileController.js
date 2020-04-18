import File from '../models/File';

class FileController {
  /** adiciona novo arquivo */
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    /** retorna o arquivo criado */
    const file = await File.create({
      name,
      path,
    });

    return res.status(201).json(file);
  }
}

export default new FileController();
