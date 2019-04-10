import DbControllers from "../dbControllers";


exports.create = (user, cb) => {
  const newuser = DbControllers.saveData(user);
  delete newuser.password;
  cb(null, newuser);
};
