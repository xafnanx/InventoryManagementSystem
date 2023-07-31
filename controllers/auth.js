const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).render('login', {
                message: 'Please provide Email and Password'
            })
        }
        pool.query('SELECT * FROM users WHERE name = ?', [name], async (err, results) => {
            // console.log(results);
            if (!results || !(password == results[0].password)) {
                res.status(401).render('login', {
                    message: 'Invalid Username or Password'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/');
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.register = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    if (name && email && password && passwordConfirm) {
        pool.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) console.log(err);
            if (results.length > 0) {
                return res.render('register', {
                    message: 'Email already in use'
                })
            } else if (password !== passwordConfirm) {
                return res.render('register', {
                    message: 'Password does not match'
                })
            }
            pool.query('INSERT INTO users SET ? ', { name: name, email: email, password: password }, (err, results) => {
                if (err) console.log(err);
                else {
                    return res.render('register', {
                        success: 'User registered'
                    })
                }
            })
        });
    }
    else {
        return res.render('register', {
            message: 'Please Enter Proper Details.'
        })
    }
}

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            // console.log(decoded);

            //2) Check if the user still exists
            pool.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
                //   console.log(result);

                if (!result) {
                    return next();
                }

                req.user = result[0];
                //   console.log("user is")
                //   console.log(req.user);
                return next();

            });
        } catch (err) {
            console.log(err);
            return next();
        }
    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    user = undefined
    res.status(200).redirect('/');
}