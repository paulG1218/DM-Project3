import { Group, GroupList, GroupMember, User, List, Repeat, Task} from '../db/model.js'
import {Op} from "sequelize";
import session from 'express-session';

const handlers = {

    sessionCheck: async (req, res) => {
        if (req.session.user) {
            console.log(req.session.user.userId);
            res.json({
              userId: req.session.user.userId,
              isAdmin: req.session.user.isAdmin,
              username: req.session.user.username,
            });
          } else {
            res.json("no user logged in");
          }
    },

    login: async (req, res) => {
        const { usernameOrEmail, password } = req.body 

        console.log(usernameOrEmail)
        console.log(password)
        console.log("session data", req.session)

        const user = await User.findOne({
            where: {
                // might need to change this if it does not work
                [Op.or]: [{ username: usernameOrEmail}, { email: usernameOrEmail }]
            }
        })

        if(!user){
            res.json({
                message: "No username found",
                status: 404,
                userId: ""
            })
            return
        } else if (user && user.password === password) {
            req.session.user = user

            console.log(req.session.user.userId)

            res.json({
                message: "Login successful",
                status: 200,
                user: user
            })
            return
        }

        res.json({
            message: "Password incorrect",
            status: 401,
            userId: "",
        })
        return
    },

    logout: async (req, res) => {
        req.session.destroy()

    },

    registerNewUser: async (req, res) => {
        const { username, email, password } = req.body

        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        })

        res.json({
            message: 'New user created',
            userId: newUser.userId
        })
    },

    getUserProfileInfo: async (req, res) => {
        // console.log(userId)
        const { userId } = req.params 
        const user = await User.findOne({ where: {userId: userId}
        })
        console.log(user)
        res.json(user)
    },

    addAdmin: async (req, res) => {
        const { newAdmin } = req.body

        const admin = await User.findOne({
            where: {
                username: newAdmin
            }
        })
        
        await admin.update({
            isAdmin: true
        })

        res.send('User is now has admin status')
    },
  
    getLists: async (req, res) => {

    },
    editUserInfo: async (req, res) => {
        const {userId} = req.params
        console.log(req.body)
        const { username, email, password } = req.body
        try{
            const user = await User.findByPk(userId)
            console.log(user)
            if(user) {
              await  user.update({
                    username: username,
                    email: email,
                    password: password,
                })
                res.json({user})
            }
        }catch (error) {
            console.log("Error")
            res.status(500).json({ success: false, error: "Internal Server Error Editing User"})
        }
        // console.log(req.body)
    },
    deleteUser: async (req, res) => {
        const userId = req.session.user.userId

        await User.destroy({where: {userId: userId}})

        req.session.destroy()
        res.json("success")
    },

}

export default handlers