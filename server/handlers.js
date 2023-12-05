import { Group, GroupList, GroupMember, User, List, Repeat, Task} from '../db/model.js'

const handlers = {

    login: async (req, res) => {
        const { username, email, password } = req.body 

        console.log(username)
        console.log(email)
        console.log(password)
        console.log("session data", req.session)

        const user = await User.findOne({
            where: {
                // might need to change this if it does not work
                [Op.or]: [{ username }, { email }]
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
                userId: user.userId
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

    },

    getUserProfileInfo: async (req, res) => {

    },



}

export default handlers