import { Group, GroupList, GroupMember, User, List, Repeat, Task} from '../db/model.js'
import {Op} from "sequelize"

const handlers = {

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

    },



}

export default handlers