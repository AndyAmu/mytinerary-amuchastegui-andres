const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken')


const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )
    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    });

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
        service: "gmail",
        auth: {
            user: process.env.USER,//DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
        },
        tls: {
            rejectUnauthorized: false // Para que no salte con el antivirus que estas usasndo el servicio
        } //CONFIGURACIONES DE GMAIL
    })

    // EN ESTA SECCION LOS PARAMETROS DEL MAIL 
    
    let mailOptions = { 
        from:  process.env.USER,    //DE QUIEN
        to: email,       //A QUIEN
        subject: "Verify account ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <a href=http://localhost:4000/api/verify/${uniqueString}>CLICK!</a>
        <h3>to confirm!</h3>`
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
        if (error) { console.log('error gaston' + error) }
        else {
            console.log(`check ${email}`)

        }
    })
};


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
                            userExists.uniqueString = crypto.randomBytes(15).toString('hex')
                            await userExists.save()
                            await sendEmail(email, userExists.uniqueString)
                            res.json({
                                success: true,
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
                    const newUser = await new User({ // le paso los datos que necesito para crear nuevo usuario
                        nameUser,
                        lastNameUser,
                        photoUser,
                        email,
                        country,
                        from: [from],
                        password: [passwordHasheada],
                        uniqueString:crypto.randomBytes(15).toString('hex'),
                        emailVerified: false,
                    })
                    //Creo condicional anidado, veo si el from es diferente a mi formulario de registro
                    if (from !== "SignUpForm") {
                        await newUser.save()//Guardo el usuario
                        console.log(newUser)
                        await sendEmail(email, newUser.uniqueString)
                        res.json({
                            success: true,
                            from: "SignUpForm",
                            message: 'Congratulations, your user has been created with ' + from + ' check the mail and confirm'
                        })
                    } else {
                        await newUser.save()//Guardo el usuario
                        await sendEmail(email, newUser.uniqueString) // Llamo a la funcion encargada del envio del correo electronico
                        res.json({
                            success: true,
                            from: "externalSignUp",
                            message: `check ${email} and finish your SIGN UP!`
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                res.json({ success: false, message: "Something went wrong, try again in a few minutes" })
            }
        },


        verifyEmail: async (req, res) => {

            const uniuniqueString  = req.params.uniqueString; 
            // console.log(req.params)
        
            const user = await User.findOne({ uniqueString: uniuniqueString })
            if (user) {
                user.emailVerified = true 
                await user.save()
            res.redirect("http://localhost:3000/") 

            }
            else { res.json({ success: false, response: "Email has not been confirmed yet!" }) }
        },

        signInUser: async (req, res) => {
            const { email, password, from } = req.body.logedData
            try {
                const userExists = await User.findOne({ email }) // busco password mediante from
                // const indexpass = userExists.from.indexOf(from)
                // console.log(usuarioExiste.password[indexpass])

                if (!userExists) { // verifico que usuario exista
                    res.json({ success: false, message: `${email} has no account in MyTinerary, please SIGN UP!` })
                } else {
                    if (from !== "LogInForm") {
                        
                            let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))
                            // console.log(passwordmatch)
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
                                
                                userExists.isConected = true
                                userExists.lastConection = new Date().toLocaleString()
                                await userExists.save()

                                const token = jwt.sign({userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                                
                                res.json({
                                    success: true,
                                    from: from,
                                    response: {token, userData },
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
                            if (userExists.emailVerified) {
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
                                userExists.isConected = true
                                userExists.lastConection = new Date().toLocaleString()
                                await userExists.save()
                                const token = jwt.sign({userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                                res.json({
                                    success: true,
                                    from: from,
                                    response: { token, userData },
                                    message: "Welcome again " + userData.nameUser + " " + userData.lastNameUser,
                                })
                            } else {
                                res.json({
                                    success: false,
                                    from: from,
                                    message: `verify your ${email} or password!`,
                                })
                            }
                        }else{
                            res.json({ succes: false,
                                from: from,
                                message: `You have not verified your email ${email}, please check your email box to complete your signUp`
                            })
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: "Something went wrong, try again in a few minutes"
                })
            }
        },

        singnOutUser: async (req, res) => {
            const email = req.body.closeuser
            const user = await USer.findOne({ email })

            user.isConected = false
            await user.save()
            res.json({success:true})
        },


        verificationToken:(req,res) => {

            if(req.user){
                res.json({
                    succes:true,
                    response:{id:req.user.id, nameUser:req.user.nameUser,lastNameUser:req.user.lastNameUser,email:req.user.email, from:"token"},
                    message: "welcome new" + req.user.email})
            }else {
                res.json({success:false,
                message: 'Please signIn again'})
        }
    }
    }
    module.exports = UserControllers