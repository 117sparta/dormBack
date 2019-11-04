class Message {
  constructor () {
    this.message = {};
    this.statusCode = 0;
  }
  getMessage () {
    return this.message;
  }
  setMessage (msg) {
    this.message = msg;
  }
  getStatusCode () {
    return this.statusCode;
  }
  setStatusCode (statusCode) {
    this.statusCode = statusCode;
  }
}

module.exports = Message;