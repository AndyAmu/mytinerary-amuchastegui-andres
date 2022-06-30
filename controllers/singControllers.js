const User = require('../models/User')
const bcryptjs = require('bcryptjs')

const UserControllers = {

    singUpUsers: async (req, res) => {
        let { nameUser, lastNameUser, photoUser, email, password, country, from } = req.body.userData
        try {
            const userExists = await User.findOne({ email }) // Busco si hay un usuario por email
            if (userExists) {
                if (userExists.from.indexOf(from) !== -1) {//indexOf me busca el valor desde from si esta almacenado en la BS o no. Si es diferente !== -1 significa que el usuario ya realizo el registro con ese método
                    res.json({
                        success: false,//Respuesta false
                        from: "SignUpForm",//Viene desde el SignUpForm
                        message: `user ${email} already exists, please LOG IN!`
                    })
                } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)//Incripto la password para que la guarde la BD
                    userExists.from.push(from)//El usuario que encontro en su campo from le voy a pushear desde from que es un array en mongo 
                    userExists.password.push(passwordHasheada)// Traigo la contrasela incriptada
                    if (from === "SignUpForm") {
                        await userExists.save()
                        await sendEmail(email, userExists.uniqueString)
                        res.json({
                            succes: true,
                            from: "SignUpForm",
                            message: `check ${email}! we send you a mail to confirm your SIGN UP!`
                        })

                    } else {
                        userExists.save()
                        res.json({
                            success: true,
                            from: "externalSignUp",
                            message: `user exist! LOG IN please!`
                        })
                    }
                }
                } else {  // en caso que el usuario sea nuevo vamos a esta condición                  
                    const passwordHasheada = bcryptjs.hashSync(password, 10)//Encripto la contraseña
                    const newUser = await new User({ // le paso los daots que necesito para crear nuevo usuario
                        nameUser,
                        lastNameUser,
                        photoUser,
                        email,
                        country,
                        from: [from],
                        password: [passwordHasheada],
                        emailVerified: false,
                    })
                    //Creo condicional anidado, veo si el from 
                    if (from !== "SignUpForm") { // Veo si el from es diferente a mi formulario de registro
                        await newUser.save()//Guardo el usuario
                        res.json({
                            succes: true,
                            from: "SignUpForm",
                            message: `check ${email} and finish your SIGN UP!`
                        })
                    } else {// Si viene de una red social
                        await newUser.save()//Guardo el usuario
                        res.json({
                            succes: true,
                            from: "externalSignUp",
                            message: `you SIGN UP by ${from}! now LOG IN!`
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                res.json({ success: false, message: "Something went wrong, try again in a few minutes" })
            }
        },

        signInUser: async (req, res) => {
            const { email, password, from } = req.body.logedData
            try {
                const userExists = await User.findOne({ email })
                // const indexpass = userExists.from.indexOf(from)
                if (!userExists) {
                    res.json({ success: false, message: `${email} has no account in MyTinerary, please SIGN UP!` })
                } else {
                    if (from !== "LogInForm") {
                        if (userExists.emailVerified) {
                        let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                        console.log(passwordmatch)
                        if (passwordmatch.length > 0) {
                            const userData = {
                                id: userExists._id,
                                nameUser: userExists.nameUser,
                                lastNameUser: userExists.lastNameUser,
                                photoUser: userExists.photoUser,
                                email: userExists.email,
                                country: userExists.country,
                                from: userExists.from, 
                            }
                            
                            await userExists.save()
                            res.json({
                                success: true,
                                from: from,
                                response: { userData },
                                message: `welcome back ${userData.nameUser}!`,
                            })
                        } else {
                            res.json({
                                success: false,
                                from: from,
                                message: "You have not registered with" + from + "if you want to enter with this method you must do the SingUp with" + from
                            })
                        }
                    } else {
                        let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                        if (passwordmatch.length > 0) {
                            const userData = {
                                id: userExists._id,
                                nameUser: userExists.nameUser,
                                lastNameUser: userExists.lastNameUser,
                                photoUser: userExists.photoUser,
                                email: userExists.email,
                                country: userExists.country,
                                from: userExists.from,
                            }
                            await userExists.save()
                            res.json({
                                success: true,
                                from: from,
                                response: {userData},
                                message: "Welcome again " + userData.nameUser + " " + userData.lastNameUser,
                            })
                        } else {
                            res.json({
                                succes: false,
                                from: from,
                                message: `verify your ${email} or password!`
                            })
                        }
                    }
                }
            }
            } catch (error) {
                console.log(error)
                res.json({ succes: false,
                    message: "Something went wrong, try again in a few minutes" })
            }
        },

        singnOutUser: async (req,res) => {
            const email = req.body.closeuser
            const user = await USer.findOne({ email})
            await user.save()
            res.json(console.log('Closed session ' + email))
        },
}
module.exports = UserControllers