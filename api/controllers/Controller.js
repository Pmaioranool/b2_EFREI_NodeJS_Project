const Category = require("../models/category.js");
const Comment = require("../models/commentaire.js");
const Group = require("../models/groupes.js");
const MP = require("../models/MP.js");
const Report = require("../models/report.js");
const Role = require("../models/role.js");
const Threads = require("../models/Threads.js");
const User = require("../models/user.js");

class Controllers {
  static async getAll(model, req, res) {
    try {
      const items = await model.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(model, req, res) {
    try {
      const item = await model.getById(req.params.id);
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: "Pas trouvé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(model, req, res) {
    try {
      const newItem = await model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(model, req, res) {
    try {
      const updatedItem = await model.update(req.params.id, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(model, req, res) {
    try {
      await model.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const categoryController = {
  getAll: (req, res) => Controllers.getAll(Category, req, res),
  get: (req, res) => Controllers.getOne(Category, req, res),
  post: (req, res) => Controllers.create(Category, req, res),
  put: (req, res) => Controllers.update(Category, req, res),
  delete: (req, res) => Controllers.delete(Category, req, res),
};

const commentController = {
  getAll: (req, res) => Controllers.getAll(Comment, req, res),
  get: (req, res) => Controllers.getOne(Comment, req, res),
  post: (req, res) => Controllers.create(Comment, req, res),
  put: (req, res) => Controllers.update(Comment, req, res),
  delete: (req, res) => Controllers.delete(Comment, req, res),
};

const groupController = {
  getAll: (req, res) => Controllers.getAll(Group, req, res),
  get: (req, res) => Controllers.getOne(Group, req, res),
  post: (req, res) => Controllers.create(Group, req, res),
  put: (req, res) => Controllers.update(Group, req, res),
  delete: (req, res) => Controllers.delete(Group, req, res),
};

const mpController = {
  getAll: (req, res) => Controllers.getAll(MP, req, res),
  get: (req, res) => Controllers.getOne(MP, req, res),
  post: (req, res) => Controllers.create(MP, req, res),
  put: (req, res) => Controllers.update(MP, req, res),
  delete: (req, res) => Controllers.delete(MP, req, res),
};

const reportController = {
  getAll: (req, res) => Controllers.getAll(Report, req, res),
  get: (req, res) => Controllers.getOne(Report, req, res),
  post: (req, res) => Controllers.create(Report, req, res),
  put: (req, res) => Controllers.update(Report, req, res),
  delete: (req, res) => Controllers.delete(Report, req, res),
};

const roleController = {
  getAll: (req, res) => Controllers.getAll(Role, req, res),
  get: (req, res) => Controllers.getOne(Role, req, res),
  post: (req, res) => Controllers.create(Role, req, res),
  put: (req, res) => Controllers.update(Role, req, res),
  delete: (req, res) => Controllers.delete(Role, req, res),
};

const ThreadsController = {
  getAll: (req, res) => Controllers.getAll(Threads, req, res),
  get: (req, res) => Controllers.getOne(Threads, req, res),
  post: (req, res) => Controllers.create(Threads, req, res),
  put: (req, res) => Controllers.update(Threads, req, res),
  delete: (req, res) => Controllers.delete(Threads, req, res),
};

const UserController = {
  getAll: (req, res) => Controllers.getAll(User, req, res),
  get: (req, res) => Controllers.getOne(User, req, res),
  post: (req, res) => Controllers.create(User, req, res),
  put: (req, res) => Controllers.update(User, req, res),
  delete: (req, res) => Controllers.delete(User, req, res),
};

module.exports = {
  categoryController,
  commentController,
  groupController,
  mpController,
  reportController,
  roleController,
  ThreadsController,
  UserController,
};