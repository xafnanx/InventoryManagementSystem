const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

const mysql = require('mysql');
const { json } = require('body-parser');


const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// router.get('/',authController.isLoggedIn,(req,res)=>{
//     res.render('index',{
//         user: req.user
//     });
// });

router.get('/', authController.isLoggedIn, (req, res) => {
  // res.render('index',{
  //     user: req.user
  // });

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    connection.query('SELECT * FROM storage', (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        if (req.user)
          res.render('index', { rows, user: req.user, type: req.user.type })
        else
          res.render('index', { rows, user: req.user })
      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  // console.log(req.user);
  if (req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

})

router.get('/users', authController.isLoggedIn, (req, res) => {
  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else if (req.user.type == 'admin') {
    let curuser = req.user
    // res.render('users', { curuser })

    if (req.user.type == 'admin') {

      // console.log(user)

      pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM users', (err, rows) => {
          //when done with connection, release it
          connection.release();

          if (!err) {
            let removedUser = req.query.removed;
            res.render('users', { rows, curuser, removedUser })
          }
          else console.log(err)

          // console.log('The data from storage table: \n',rows)

        })
      })
    } else
      res.render('login', { message: 'Please login as admin to access this page.' });
  }
  else
    res.render('login', { message: 'Please login as admin to access this page.' })
})

router.get('/users/delete/:id', authController.isLoggedIn, (req, res) => {
  // res.render('login')

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    // console.log(req.params.id)
    connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        let removedUser = encodeURIComponent('User successfully removed.')

        res.redirect('/users/?removed=' + removedUser)
      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })

})

router.post('/users/update/:id', (req, res) => {
  // res.redirect('/users')
  const { type } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    connection.query('UPDATE users SET type = ? WHERE id = ?', [type, req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {

        pool.getConnection((err, connection) => {
          if (err) throw err;
          // console.log('connected as ID '+connection.threadId);
          //Use the connection
          connection.query('SELECT * FROM users', (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) res.render('users', { rows, message: 'User privilages updates successfully.' })
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

          })
        })

      }
      else console.log(err)

    })
  })
})


router.get('/orders', authController.isLoggedIn, (req, res) => {
  // console.log(req.user)

  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else {
    let curuser = req.user;
    // console.log(curuser)

    if (req.user.type == 'admin') {

      // res.render('orders',{curuser})

      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM orders o,storage s,users u where o.itemid = s.id and o.userid = u.id', (err, rows) => {
          res.render('orders', { rows, curuser })
          // console.log(rows)

        })
      })

    } else {
      res.render('login', { message: 'Please login as an admin' })
    }
  }


})

//order from index page
router.post('/orders/:userid/:itemid', authController.isLoggedIn, (req, res) => {
  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else {
    let curuser = req.user;
    pool.query('SELECT * FROM storage WHERE id=?', [req.params.itemid], (err, rows) => {
      //when done with connection, release it 
      let storage = rows[0]

      if (((parseInt(storage.quantity) - parseInt(req.body.amount)) >= 0) && (req.body.amount > 0) && (req.body.amount % 1 == 0)) {
        pool.query('INSERT INTO orders SET userid = ?, itemid = ?, amount = ?,order_date = CURRENT_TIMESTAMP', [req.params.userid, req.params.itemid, req.body.amount], (err, cart) => {
          let newval = parseInt(storage.quantity) - parseInt(req.body.amount)

          pool.getConnection((err, connection) => {
            if (err) throw err;
            // console.log('connected as ID '+connection.threadId);
            //Use the connection
            connection.query('UPDATE storage SET quantity = ?, updated = CURRENT_TIMESTAMP WHERE id = ?', [newval, req.params.itemid], (err, rows) => {
              //when done with connection, release it
              connection.release();

              if (!err) {

                pool.getConnection((err, connection) => {
                  if (err) throw err;
                  connection.query('SELECT * FROM storage', (err, rows) => {
                    connection.release();
                    if (!err) {
                      if (req.user)
                        res.render('index', { rows, user: req.user, type: req.user.type, success: 'Item Ordered Successfully' })
                      else
                        res.render('index', { rows, user: req.user })
                    }
                    else console.log(err)
                  })
                })

              }
              else console.log(err)

            })
          })


        })
      } else {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query('SELECT * FROM storage', (err, rows) => {
            connection.release();
            if (!err) {
              if (req.user)
                res.render('index', { rows, user: req.user, type: req.user.type, message: 'Please enter a valid Amount' })
              else
                res.render('index', { rows, user: req.user })
            }
            else console.log(err)
          })
        })
      }

    })
  }

})

//delete order from orders table
router.get('/orders/:id', authController.isLoggedIn, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    // console.log(req.params.id)
    connection.query('DELETE FROM orders WHERE orderid = ?', [req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        res.redirect('/orders')
      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
})


router.get('/orderhistory/:id', authController.isLoggedIn, (req, res) => {
  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else {
    let curuser = req.user;

    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('SELECT * FROM orders o,storage s,users u where o.itemid = s.id and o.userid = u.id AND u.id = ?', [req.params.id], (err, rows) => {
        res.render('orderhistory', { rows, curuser })
        // console.log(rows)

      })
    })

  }
})

router.get('/delete/:userid/:id', authController.isLoggedIn, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    // console.log(req.params.id)
    connection.query('DELETE FROM orders WHERE orderid = ?', [req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        res.redirect(`/orderhistory/${req.params.userid}`)

      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
})

router.post('/', authController.isLoggedIn, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);

    let saerchTerm = req.body.search;

    //Use the connection
    connection.query('SELECT * FROM storage WHERE iname LIKE ? OR id LIKE ?', ['%' + saerchTerm + '%', '%' + saerchTerm + '%'], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        if (req.user)
          res.render('index', { rows, user: req.user, type: req.user.type })
        else
          res.render('index', { rows, user: req.user })
      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
})

router.get('/contact', authController.isLoggedIn, (req, res) => {
  let curuser = req.user;
  res.render('contact', { curuser })
})

router.post('/contact', authController.isLoggedIn, (req, res) => {
  const { name, email, comment } = req.body
  if (name && email && comment) {
    pool.query('INSERT INTO contact_info SET ? ', { name: name, email: email, comment: comment }, (err, results) => {
      if (err) console.log(err);
      else {
        // console.log(results)
        return res.render('contact', {
          success: 'Form Submitted Successfully.'
        })
      }
    })
  } else{
    return res.render('contact', {
      message: 'Please Fill All the Fields.'
    })
  }
})

router.get('/contactinfo', authController.isLoggedIn, (req, res) => {
  // const curuser = req.user
  // res.render('contactinfo',{curuser})

  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else {
    let curuser = req.user;
    // console.log(curuser)

    if (req.user.type == 'admin') {

      // res.render('orders',{curuser})

      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM contact_info', (err, rows) => {
          res.render('contactinfo', { rows, curuser })
          // console.log(rows)

        })
      })

    } else {
      res.render('login', { message: 'Please login as an admin' })
    }
  }
})

router.get('/contactinfo/:id', authController.isLoggedIn, (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    // console.log(req.params.id)
    connection.query('DELETE FROM contact_info WHERE id = ?', [req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        res.redirect('/orderhistory')

      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
})

router.get('/supplier', authController.isLoggedIn, (req, res) => {
  // const curuser = req.user
  // res.render('supplier', { curuser })

  if (typeof req.user === 'undefined') {
    res.render('login', { message: 'Please login as an admin' })
    // console.log(typeof user)
  } else {
    let curuser = req.user;
    // console.log(curuser)

    if (req.user.type == 'admin') {

      // res.render('orders',{curuser})

      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM supplier', (err, rows) => {
          res.render('supplier', { rows, curuser })
          // console.log(rows)

        })
      })

    } else {
      res.render('login', { message: 'Please login as an admin' })
    }
  }
})

router.get('/supplier/:id', authController.isLoggedIn, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log('connected as ID '+connection.threadId);
    //Use the connection
    // console.log(req.params.id)
    connection.query('DELETE FROM supplier WHERE supplier_id = ?', [req.params.id], (err, rows) => {
      //when done with connection, release it
      connection.release();

      if (!err) {
        res.redirect('/supplier')
      }
      else console.log(err)

      // console.log('The data from storage table: \n',rows)

    })
  })
})

router.post('/supplier', authController.isLoggedIn, (req, res) => {
  const { name } = req.body
  flag = true
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM supplier', (err, rows) => {
      rows.forEach(rows => {
        if (rows.supplier_name == name)
          flag = false;
      });
      if (flag) {
        pool.query('INSERT INTO supplier SET ? ', { supplier_name: name }, (err, results) => {
          if (err) console.log(err);
          else {
            return res.redirect('/supplier')
          }
        })
      } else
        return res.redirect('/supplier')
    })
  })
})

module.exports = router;