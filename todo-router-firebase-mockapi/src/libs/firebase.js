import * as firebase from 'firebase'

const config = {
  //ใส่ config firebase ตรงนี้
};

class Firebase {

  constructor() {
    this.firebase = firebase.initializeApp(config)
  }

  getDatabase() {
    return this.firebase.database();
  }

}

export default new Firebase().getDatabase();