import { Group, GroupList, GroupMember, User, List, Repeat, Task} from '../db/model.js'
import {Op} from "sequelize";
import session from 'express-session';

const handlers = {

    sessionCheck: async (req, res) => {
        if (req.session.user) {
            res.json({
              userId: req.session.user.userId,
              isAdmin: req.session.user.isAdmin,
              username: req.session.user.username,
              lists: req.session.user.lists,
              email: req.session.user.email,
              groups: req.session.user.groups
            });
          } else {
            res.json("no user logged in");
          }
    },

    login: async (req, res) => {
        const { usernameOrEmail, password } = req.body 

        const user = await User.findOne({
            where: {
                [Op.or]: [{ username: usernameOrEmail}, { email: usernameOrEmail }]
            },
            include: [
                {
                    model: List, 
                    include: [
                        {
                            model: Task,
                        }
                    ]
                },
                {
                    model: Group,
                    include: [
                        {
                            model: GroupList,
                            include: [
                                {
                                    model: Task,
                                }
                            ]
                        },
                        {
                            model: GroupMember,
                        }
                    ]
                }
            ]
            
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
        res.json('out')
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
        const userSession = req.session.user

        if (!userSession) {
            res.json({message: "no user"})
            return
        }
        const user = await User.findOne({ 
            where: {
                userId: userSession.userId
            }
        })
        res.json({message: 'success', user: user})
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
  
    editUserInfo: async (req, res) => {
        const {userId} = req.params
        const { username, email, password } = req.body
        try{
            const user = await User.findByPk(userId)
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
    },
    deleteUser: async (req, res) => {
        const userId = req.session.user.userId

        await User.destroy({where: {userId: userId}})

        req.session.destroy()
        res.json("success")
    },
}

export default handlers