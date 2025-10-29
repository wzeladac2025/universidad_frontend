import PouchDB from 'pouchdb';

export class BdService {
  class: string = "BdService";
  db: any;

  constructor() {
    // BD LOCAL
    this.db = new PouchDB("universidaddb");
  }

  info() {
    this.db.info().then(function (info: any) {
      console.log("dbInfo", info);
    });
  }

  save(db: any, doc: any) {
    let method = "save";
    return new Promise((resolve: any) => {
      db.put(doc)
        .then(() => {
          console.log(this.logRef(method), doc);
          resolve(true);
        })
        .catch((error: any) => {
          console.error(this.logRef(method), error);
          resolve(false);
        });
    });
  }

  read(db: any, _id: any) {
    let method = "read";
    return new Promise((resolve: any) => {
      db.get(_id)
        .then((doc: any) => {
          console.log(this.logRef(method), doc);
          resolve(doc);
        })
        .catch((error: any) => {
          console.error(this.logRef(method), error);
          resolve(null);
        });
    });
  }

  readAll(db: any) {
    let method = "readAll";
    return new Promise((resolve: any) => {
      db.allDocs({
        include_docs: true,
      })
        .then((docs: any) => {
          console.log(this.logRef(method), docs.rows);
          resolve(docs.rows);
        })
        .catch((error: any) => {
          console.error(this.logRef(method), error);
          resolve(null);
        });
    });
  }

  delete(db: any, _id: any) {
    let method = "delete";
    return new Promise((resolve: any) => {
      db.get(_id)
        .then((doc: any) => {
          db.remove(doc)
            .then((response: any) => {
              console.log(this.logRef(method), response);
              resolve(true);
            })
            .catch((error: any) => {
              console.error(this.logRef(method), error);
              resolve(true);
            });
        })
        .catch(() => {
          resolve(true);
        });
    });
  }

  logRef(method: string) {
    return method + " " + this.class;
  }
}
