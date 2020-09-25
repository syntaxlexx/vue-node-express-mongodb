var bcrypt = require("bcryptjs");

module.exports = {
  // HOST: "localhost",
  // PORT: 27017,
  // DB: "bezkoder_db"
  url: "mongodb://localhost:27017/bezkoder_db",

  seedDefaultData: (db) => {
    const Role = db.roles;
    const User = db.users;
    const defaultRoles = db.DEFAULT_ROLES;

    // seed Roles
    defaultRoles.forEach(r => {
      Role.findOrCreate({name: r}, { description: `${r} role` }, function(err, dt) {
        // console.log('Role "%s" was added', dt.name);
      })
    })

    // seed default users
    User.find({username: 'admin'}, function(err, docs) {
      if(docs && docs.length > 0) {

      } else {
        // Seed Admin user
        const user = new User({
          username: 'admin',
          email: 'admin@gmail.com',
          first_name: 'Admin',
          last_name: 'Main',
          nickname: 'admin',
          phone: '+111',
          gender: 'male',
          password: bcrypt.hashSync('admin', 8)
        });

        user
          .save(user)
          .then(data => {
            Role.findOne({ name: "admin" }, (err, role) => {
              if (err) {

              } else {
                user.roles = [role._id];
                user.save(err => {
                  if (err) {
                    console.log('ERROR adding Admin role to user')
                  } else {
                    console.log('Admin role added to user')
                  }
                });
              }
            });
          })
          .catch(err => {
            console.log('ERROR creating an Admin User')
          });
      }
    })


  }
};