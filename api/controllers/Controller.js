const Model = require("../models/Models.js");
const User = require("../models/User.js");

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

  static async update(model,Id, req, res) {
    try {
      const updatedItem = await Model.update(model,Id, req.params.id, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(model,Id, req, res) {
    try {
      const deletedItem = await Model.delete(model,Id, req.params.id);
      res.status(204).json(deletedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const CategoryController = {
  getAll: (req, res) => Controllers.getAll('categories', req, res),
  get: (req, res) => Controllers.getOne('categories', req, res),
  post: (req, res) => Controllers.create('categories', req, res),
  put: (req, res) => Controllers.update('categories', 'id', req, res),
  delete: (req, res) => Controllers.delete('categories', 'id', req, res),
};

const CommentController = {
  getAll: (req, res) => Controllers.getAll('comments', req, res),
  get: (req, res) => Controllers.getOne('comments', req, res),
  post: (req, res) => Controllers.create('comments', req, res),
  put: (req, res) => Controllers.update('comments', 'comment_id', req, res),
  delete: (req, res) => Controllers.delete('comments', 'comment_id', req, res),
};

const GroupController = {
  getAll: (req, res) => Controllers.getAll('groupes', req, res),
  get: (req, res) => Controllers.getOne('groupes', req, res),
  post: (req, res) => Controllers.create('groupes', req, res),
  put: (req, res) => Controllers.update('groupes', 'groupe_id', req, res),
  delete: (req, res) => Controllers.delete('groupes', 'groupe_id', req, res),
  async getGroupesByCategory(req, res) {
    const categoryId = req.query.categories_id; // Récupère l'ID de la catégorie depuis les paramètres de requête

    if (!categoryId) {
      return res.status(400).json({ error: "Le paramètre categories_id est requis." });
    }

    try {
      const groupes = await Groupes.getGroupesByCategory(categoryId);
      res.status(200).json(groupes);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  },
};

const MPController = {
  getAll: (req, res) => Controllers.getAll('private_messages', req, res),
  get: (req, res) => Controllers.getOne('private_messages', req, res),
  post: (req, res) => Controllers.create('private_messages', req, res),
  put: (req, res) => Controllers.update('private_messages', 'MP_id', req, res),
  delete: (req, res) => Controllers.delete('private_messages', 'MP_id', req, res),
};

const PublicationController = {
  getAll: (req, res) => Controllers.getAll('publications', req, res),
  get: (req, res) => Controllers.getOne('publications', req, res),
  post: (req, res) => Controllers.create('publications', req, res),
  put: (req, res) => Controllers.update('publications', 'publication_id', req, res),
  delete: (req, res) => Controllers.delete('publications', 'publication_id', req, res),
};

const ReportController = {
  getAll: (req, res) => Controllers.getAll('reports', req, res),
  get: (req, res) => Controllers.getOne('reports', req, res),
  post: (req, res) => Controllers.create('reports', req, res),
  put: (req, res) => Controllers.update('reports', 'report_id', req, res),
  delete: (req, res) => Controllers.delete('reports', 'report_id', req, res),
};

const TypeReportController = {
  getAll: (req, res) => Controllers.getAll('type_report', req, res),
  get: (req, res) => Controllers.getOne('type_report', req, res),
  post: (req, res) => Controllers.create('type_report', req, res),
  put: (req, res) => Controllers.update('type_report', 'type_report_id', req, res),
  delete: (req, res) => Controllers.delete('type_report', 'type_report_id', req, res),
};

const UGRController = {
  getAll: (req, res) => Controllers.getAll('users_groupes_roles', req, res),
  get: (req, res) => Controllers.getOne('users_groupes_roles', req, res),
  post: (req, res) => Controllers.create('users_groupes_roles', req, res),
  put: (req, res) => Controllers.update('users_groupes_roles', 'UGR_id', req, res),
  delete: (req, res) => Controllers.delete('users_groupes_roles', 'UGR_id', req, res),
};

const likesController = {
  getAll: (req, res) => Controllers.getAll('likes', req, res),
  get: (req, res) => Controllers.getOne('likes', req, res),
  post: (req, res) => Controllers.create('likes', req, res),
  put: (req, res) => Controllers.update('likes', 'likes_id', req, res),
  delete: (req, res) => Controllers.delete('likes', 'likes_id', req, res),
  getByPublication: async (req,res) => {
    try {
      const items = await Model.getByPublication(req.params.id);
      items
        ? res.status(200).json(items)
        : res.status(404).json({ message: "Pas trouvé" });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getByUser: async (req,res) => {
    try {
      const items = await Model.getByUser(req.params.id);
      items
        ? res.status(200).json(items)
        : res.status(404).json({ message: "Pas trouvé" });
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

const RoleController = {
  getAll: (req, res) => Controllers.getAll('roles', req, res),
  get: (req, res) => Controllers.getOne('roles', req, res),
  post: (req, res) => Controllers.create('roles', req, res),
  put: (req, res) => Controllers.update('roles','role_id', req, res),
  delete: (req, res) => Controllers.delete('roles','role_id', req, res),
};

const ThreadsController = {
  getAll: (req, res) => Controllers.getAll('threads', req, res),
  get: (req, res) => Controllers.getOne('threads', req, res),
  post: (req, res) => Controllers.create('threads', req, res),
  put: (req, res) => Controllers.update('threads', 'thread_id', req, res),
  delete: (req, res) => Controllers.delete('threads', 'thread_id', req, res),
};

const UserController = {
  getAll: (req, res) => Controllers.getAll('users', req, res),
  get: (req, res) => Controllers.getOne('users', req, res),
  put: (req, res) => Controllers.update('users', 'user_id',req, res),
  delete: (req, res) => Controllers.delete('users', 'user_id',req, res),
  post: async (req, res) => {
    try {
      const newItem = await User.register(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const item = await User.login(req.body);
      item
        ? res.status(200).json(item)
        : res.status(404).json({message : "mot de passe ou email incorrect"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  ban: (req, res) => {
    try {
      const item = User.ban(req.body);
      item
      ? res.status(200).json(item)
      : res.status(404).json({ message: "Pas trouvé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  unBan: (req, res) => {
    try {
      const item = User.unBan(req.body);
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: "Pas trouvé" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
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