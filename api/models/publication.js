const publications = [];

class Publication {
  static async getAllPublications() {
    return publications;
  }

  static async getPublicationById(id) {
    return publications.find((pub) => pub.id === id) || null;
  }

  static async createPublication(data) {
    const newPublication = { id: publications.length + 1, ...data };
    publications.push(newPublication);
    return newPublication;
  }

  static async updatePublication(id, data) {
    const index = publications.findIndex((pub) => pub.id == id);
    if (index === -1) return null;
    publications[index] = { ...publications[index], ...data };
    return publications[index];
  }

  static async deletePublication(id) {
    const index = publications.findIndex((pub) => pub.id == id);
    if (index === -1) return null;
    return publications.splice(index, 1);
  }
}

module.exports = Publication;
