import { Group, GroupList, GroupMember, User, List, Repeat, Task, db} from '../db/model.js'

const user = await User.findOne({
    where: {
     userId: 2
    },
    include: [
      {
        model: List,
        include: [
          {
            model: Task,
          },
        ],
      },
      {
        model: Group,
        include: [
          {
            model: GroupList,
            include: [
              {
                model: Task,
              },
            ],
          },
        ],
      },
       { 
        model: GroupMember, 
        include: [
          {
            model: Group,
            include: [
              {
                model: GroupList,
                include: [
                  {
                    model: Task,
                  },
                ],
              },
            ],
          }
        ] 
      },
    ],
  });

  console.log(user)

await db.close()