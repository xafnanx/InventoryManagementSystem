const mysql = require('mysql');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//view storage
exports.view = (req, res) => {
    // console.log(user)

    if (typeof req.user === 'undefined') {
        res.render('login', { message: 'Please login as an admin' })
        // console.log(typeof user)
    } else {

        let curuser = req.user;
        // console.log(curuser)

        if (req.user.type == 'admin') {

            // console.log(user)

            pool.getConnection((err, connection) => {
                if (err) throw err;
                // console.log('connected as ID '+connection.threadId);
                //Use the connection
                connection.query('SELECT * FROM storage st,supplier su  WHERE st.supplier_id = su.supplier_id', (err, rows) => {

                    if (!err) {
                        let removedUser = req.query.removed;
                        res.render('storage', { rows, removedUser, curuser })
                    }
                    else console.log(err)

                    connection.release();

                    // console.log('The data from storage table: \n',rows)

                })
            })
        } else
            res.render('login', { message: 'Please login as admin to access this page.' });
    }
};


//find record by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);

        let saerchTerm = req.body.search;

        //Use the connection
        connection.query('SELECT * FROM storage WHERE iname LIKE ? OR id LIKE ?', ['%' + saerchTerm + '%', '%' + saerchTerm + '%'], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {

                res.render('storage', { rows })
            }
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

        })
    })
}

exports.form = (req, res) => {
    if (typeof req.user === 'undefined') {
        res.render('login', { message: 'Please login as an admin' })
        // console.log(typeof user)
    } else {

        let curuser = req.user;
        res.render('add-item', { curuser })
    }
}

//add new item
exports.create = (req, res) => {

    // res.render('add-item');
    let { iname, quantity, description, image, supplier_id } = req.body

    if (!image)
        image = 'https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=170667a&w=0&k=20&c=3Jh8trvArKiGdBCGPfe6Y0sUMsfh2PrKA0uHOK4_0IM='
    if (supplier_id && iname && quantity) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            // console.log('connected as ID '+connection.threadId);

            let saerchTerm = req.body.search;

            //Use the connection
            connection.query('INSERT INTO storage SET iname = ?, quantity = ?, added = CURRENT_TIMESTAMP,UPDATED = CURRENT_TIMESTAMP,description = ?,image=?, supplier_id = ?', [iname, quantity, description, image, supplier_id], (err, rows) => {
                //when done with connection, release it
                connection.release();
                let curuser = req.user

                if (!err)
                    res.render('add-item', { message: 'Item added Successfully.', curuser })
                else{
                    // console.log(err)
                    res.render('add-item', { alert: 'Entered Information Is Invalid.', curuser })
                }

            })
        })
    }
    else {
        let curuser = req.user
        res.render('add-item', { alert: 'Please Enter the Details Correctly.', curuser })
    }
}

//update item
exports.update = (req, res) => {
    const { iname, quantity, description, image,supplier_id } = req.body;



    pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);
        //Use the connection
        connection.query('UPDATE storage SET iname = ?, quantity = ?,updated = CURRENT_TIMESTAMP,description = ?, image = ?,supplier_id = ? WHERE id = ?', [iname, quantity, description, image,supplier_id, req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err;
                    // console.log('connected as ID '+connection.threadId);
                    //Use the connection
                    connection.query('SELECT * FROM storage WHERE id = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();

                        if (!err) res.render('edit-item', { rows, alert: `${iname} has been updated` })
                        else console.log(err)

                        // console.log('The data from storage table: \n',rows)

                    })
                })

            }
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

        })
    })
}

//edit item
exports.edit = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM storage WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) res.render('edit-item', { rows })
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

        })
    })
}

//delete item
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);
        //Use the connection
        // console.log(req.params.id)
        connection.query('DELETE FROM storage WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                let removedUser = encodeURIComponent('User successfully removed.')

                res.redirect('/storage/?removed=' + removedUser)
            }
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

        })
    })
}

//view single item
exports.viewdetail = (req, res) => {

    let curuser = req.user

    pool.getConnection((err, connection) => {
        if (err) throw err;
        // console.log('connected as ID '+connection.threadId);
        //Use the connection
        connection.query('SELECT * FROM storage st, supplier su WHERE id = ? AND  st.supplier_id = su.supplier_id', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) res.render('view-item', { rows, curuser })
            else console.log(err)

            // console.log('The data from storage table: \n',rows)

        })
    })
};

