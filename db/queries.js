import { Group, GroupList, GroupMember, User, List, Repeat, Task, db} from '../db/model.js'
import {Op} from "sequelize";

const user = await User.findOne({
    where: {
        userId: 1
    },
    include: [
        {
            model: List, 
            include: [
                {
                    model: Task,
                }
            ]
        }
    ]
    
})

console.log(user.lists[0].tasks)

await db.close()