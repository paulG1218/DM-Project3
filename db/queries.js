import { Group, GroupList, GroupMember, User, List, Repeat, Task, db} from '../db/model.js'

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

const group1 = await Group.findByPk(
    1, 
    {include: {
        model: GroupMember
    }}
)

await db.close()