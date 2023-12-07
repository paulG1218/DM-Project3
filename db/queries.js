import { Group, GroupList, GroupMember, User, List, Repeat, Task, db} from '../db/model.js'
import {Op} from "sequelize";

const user = await User.findOne({
    where: {
     username: "paul is a goober"
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

console.log(user.groups[0].groupLists)

await db.close()