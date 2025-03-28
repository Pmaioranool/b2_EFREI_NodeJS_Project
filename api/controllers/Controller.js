const Model = require("../models/Models.js");

class Controllers {
  static async getAll(model, req, res) {
    try {
      const items = await Model.getAll(model);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(model,req, res) {
    try {
      const item = await Model.getById(model,req.params.id);
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: "Pas trouvé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(model,req, res) {
    try {
      const newItem = await Model.create(model,req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(model,req, res) {
    try {
      const updatedItem = await Model.update(model,req.params.id, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(model,req, res) {
    try {
      await Model.delete(model,req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const CategoryController = {
  getAll: (req, res) => Controllers.getAll('categories', req, res),
  get: (req, res) => Controllers.getOne('categories', req, res),
  post: (req, res) => Controllers.create('categories', req, res),
  put: (req, res) => Controllers.update('categories', req, res),
  delete: (req, res) => Controllers.delete('categories', req, res),
};

const CommentController = {
  getAll: (req, res) => Controllers.getAll('comments', req, res),
  get: (req, res) => Controllers.getOne('comments', req, res),
  post: (req, res) => Controllers.create('comments', req, res),
  put: (req, res) => Controllers.update('comments', req, res),
  delete: (req, res) => Controllers.delete('comments', req, res),
};

const GroupController = {
  getAll: (req, res) => Controllers.getAll('groupes', req, res),
  get: (req, res) => Controllers.getOne('groupes', req, res),
  post: (req, res) => Controllers.create('groupes', req, res),
  put: (req, res) => Controllers.update('groupes', req, res),
  delete: (req, res) => Controllers.delete('groupes', req, res),
};

const MPController = {
  getAll: (req, res) => Controllers.getAll('private_messages', req, res),
  get: (req, res) => Controllers.getOne('private_messages', req, res),
  post: (req, res) => Controllers.create('private_messages', req, res),
  put: (req, res) => Controllers.update('private_messages', req, res),
  delete: (req, res) => Controllers.delete('private_messages', req, res),
};

const PublicationController = {
  getAll: (req, res) => Controllers.getAll('publications', req, res),
  get: (req, res) => Controllers.getOne('publications', req, res),
  post: (req, res) => Controllers.create('publications', req, res),
  put: (req, res) => Controllers.update('publications', req, res),
  delete: (req, res) => Controllers.delete('publications', req, res),
};

const ReportController = {
  getAll: (req, res) => Controllers.getAll('reports', req, res),
  get: (req, res) => Controllers.getOne('reports', req, res),
  post: (req, res) => Controllers.create('reports', req, res),
  put: (req, res) => Controllers.update('reports', req, res),
  delete: (req, res) => Controllers.delete('reports', req, res),
};

const TypeReportController = {
  getAll: (req, res) => Controllers.getAll('type_report', req, res),
  get: (req, res) => Controllers.getOne('type_report', req, res),
  post: (req, res) => Controllers.create('type_report', req, res),
  put: (req, res) => Controllers.update('type_report', req, res),
  delete: (req, res) => Controllers.delete('type_report', req, res),
};

const UGRController = {
  getAll: (req, res) => Controllers.getAll('users_groupes_roles', req, res),
  get: (req, res) => Controllers.getOne('users_groupes_roles', req, res),
  post: (req, res) => Controllers.create('users_groupes_roles', req, res),
  put: (req, res) => Controllers.update('users_groupes_roles', req, res),
  delete: (req, res) => Controllers.delete('users_groupes_roles', req, res),
};

const likesController = {
  getAll: (req, res) => Controllers.getAll('likes', req, res),
  get: (req, res) => Controllers.getOne('likes', req, res),
  post: (req, res) => Controllers.create('likes', req, res),
  put: (req, res) => Controllers.update('likes', req, res),
  delete: (req, res) => Controllers.delete('likes', req, res),
};

const RoleController = {
  getAll: (req, res) => Controllers.getAll('roles', req, res),
  get: (req, res) => Controllers.getOne('roles', req, res),
  post: (req, res) => Controllers.create('roles', req, res),
  put: (req, res) => Controllers.update('roles', req, res),
  delete: (req, res) => Controllers.delete('roles', req, res),
};

const ThreadsController = {
  getAll: (req, res) => Controllers.getAll('threads', req, res),
  get: (req, res) => Controllers.getOne('threads', req, res),
  post: (req, res) => Controllers.create('threads', req, res),
  put: (req, res) => Controllers.update('threads', req, res),
  delete: (req, res) => Controllers.delete('threads', req, res),
};

const UserController = {
  getAll: (req, res) => Controllers.getAll('users', req, res),
  get: (req, res) => Controllers.getOne('users', req, res),
  post: (req, res) => Controllers.create('users', req, res),
  put: (req, res) => Controllers.update('users', req, res),
  delete: (req, res) => Controllers.delete('users', req, res),
};

module.exports = {
    CategoryController,
    CommentController,
    GroupController,
    MPController,
    PublicationController,
    ReportController,
    RoleController,
    ThreadsController,
    UserController,
    likesController,
    UGRController,
    TypeReportController
};