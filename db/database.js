class database {
  constructor() {
    this.users = require("./users");
    this.urls = require("./urls");
    this.valid = require("valid-url");
  }

  start() {
    require("./dbconnection");
  }

  async editname(origname, newname) {
    let url = await this.urls.findOne({ url_name: origname });
    await url.updateOne({ url_name: newname });
    url.save();
  }

  async findlinksbyUID(id) {
    let query = { user_id: id };
    let found = await this.urls.find(query);
    return found;
  }

  async existinguser(email) {
    let query = { email: email };
    let found = await this.users.findOne(query);
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  createnewlink(acturl, uid, name) {
    const newL = new this.urls({
      actualurl: acturl,
      user_id: uid,
      url_name: `${name}`,
    });
    newL.save();
    setTimeout(async () => {
      await this.urls.deleteOne({ actualurl: acturl, user_id: uid });
    }, 604800000);
  }

  createnewuser(email, pass, username) {
    const newU = new this.users({
      email: email,
      pass: pass,
      user_name: username,
    });
    newU.save();
  }

  async finduser(email) {
    let profile = await this.users.findOne({ email: email });
    return profile ? profile : false;
  }

  async finduserid(x) {
    let profile = await this.users.findOne({ _id: x });
    return profile ? profile : false;
  }

  adduserurl(link, userid, name) {
    if (this.valid.isUri(link)) {
      this.createnewlink(link, userid, name);
      return true;
    } else {
      return false;
    }
  }

  async listofuserlinks(uid) {
    let urls = await this.urls.find({ user_id: uid });
    if (urls) {
      return urls;
    } else return false;
  }

  async findurl(urlid) {
    let url = await this.urls.findOne({ _id: urlid });
    if (url) {
      return url;
    } else return false;
  }

  async deleteurlbyid(urlid) {
    await this.urls
      .deleteOne({ _id: urlid })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async deleteurlbyname(name) {
    await this.urls
      .deleteMany({ url_name: name })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = database;