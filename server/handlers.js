import {} from '../db/model'

const handlers = {

    login: async (req, res) => {
        const { username, email, password } = req.body 

        console.log(username)
        console.log(email)
        console.log(password)
        console.log("session data", req.session)

        const user = await User.findOne({
            where: {
                username: username,
                email: email
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