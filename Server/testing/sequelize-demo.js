var dao = require('../dao');
var models = require('../models');
var sequelize = models.sequelize;
sequelize.sync().then(function(){
  var User = models.User;
  // User.findOne({where:{id:1}}).then(function(user){
  //   if(user != null){
  //     console.log(user.get('name'));
  //   }else{
  //     console.log('not found');
  //   }
  // });

  // User.findAll().then(function(users){
  //   users.forEach(function(user){
  //     console.log(user.get('name'));
  //   });
  //   console.log('users.length = ' + users.length);
  // });
  //var sequelize = models.sequlize;


  // User.findAll({attributes:[[sequelize.fn('COUNT',sequelize.col('id')),'counts']]}).
  //     then(function(results){
  //       if(results){
  //         console.log(results[0].get('counts'));
  //       }else{
  //         console.log('not found');
  //       }
  //     });

  // sequelize.transaction({autocommit:true,isolationLevel:'SERIALIZABLE'}).
  // then(function(tx){
  //   User.create({
  //     name:'kkoolerter',
  //     password:'000000',
  //     code:'003'
  //   },{
  //     transaction:tx
  //   }).then(function(rs){
  //     console.log(rs.get('id'));
  //   });
  // });
//  var trans = null;
  // sequelize.transaction({autocommit:true,isolationLevel:'SERIALIZABLE'}).
  // then(function(tx){
  //   console.log('1');
  //   //trans = tx;
  //   User.update({name:'DEC'},{where:{id:8},transaction:tx});
  // }).then(function(result){
  //   console.log(result);
  // });

  // sequelize.transaction({autocommit:true,isolationLevel:'SERIALIZABLE'}).then(function(tx){
  //   User.update({name:'HELLO'},{where:{id:9},transaction:tx});
  // }).then(function(result){
  //     console.log(result);
  // });

  // sequelize.transaction({autocommit:true,isolationLevel:'SERIALIZABLE'}).then(function(tx){
  //   return User.update({name:'OK'},{where:{id:8},transaction:tx}).then(function(result){
  //     return result;
  //   });
  // })

  // sequelize.transaction({autocommit:true,isolationLevel:'SERIALIZABLE'})
  // .then(funciton(tx){
  //   return User.update({name:'OK'},{where:{id:8},transaction:tx})
  //   .then(function(result){
  //     console.log(result);
  //   })
  //   .catch(function(err){
  //     tx.rollback()
  //   });
  // });

  // sequelize.transaction(function(tx){
  //   return User.update({name:'ABCDD'},{where:{id:8},transaction:tx});
  // }).then(function(result){
  //   console.log(result);
  // }).catch(function(err){
  //   console.log(err);
  // });


  // sequelize.transaction(function(tx){
  //   return User.destroy({where:{id:8},transaction:tx});
  // }).then(function(result){
  //   console.log(result);
  // }).catch(function(err){
  //   console.log(err);
  // });

  // User.findOne({where:{name:'ABCD',password:'AAAAAAA'}}).then(function(user){
  //   console.log(user);
  // });

  User.findAll({offset:10,limit:10}).then(function(users){
    if(users){
      users.forEach(function(user){
        var usr = {
          id:user.get('id'),
          name:user.get('name'),
          code:user.get('code'),
          password:user.get('password')
        }
        console.log(usr);
      });
    }
  });
});
