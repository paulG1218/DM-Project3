  import {
    Group,
    GroupList,
    GroupMember,
    User,
    List,
    Repeat,
    Task,
  } from "../db/model.js";
  import { Op } from "sequelize";
  
  const handlers = {
    sessionCheck: async (req, res) => {
      if (req.session.user) {
        const user = await User.findOne({
          where: {
            userId: req.session.user.userId,
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
  
        res.json({
          userId: user.userId,
          isAdmin: user.isAdmin,
          username: user.username,
          lists: user.lists,
          email: user.email,
          groups: user.groups,
          score: user.score,
          groupMembers: user.groupMembers
        });
        return;
      } else {
        res.json("no user logged in");
      }
    },
  
    login: async (req, res) => {
      const { usernameOrEmail, password } = req.body;
  
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
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
              {
                model: GroupMember,
              },
            ],
          },
        ],
      });
  
      if (!user) {
        res.json({
          message: "no username found",
          status: 404,
          userId: "",
        });
        return;
      } else if (user && user.password === password) {
        req.session.user = user;
  
        res.json({
          message: "login successful",
          status: 200,
          user: user,
        });
        return;
      }
  
      res.json({
        message: "password incorrect",
        status: 401,
        userId: "",
      });
      return;
    },
  
    logout: async (req, res) => {
      req.session.destroy();
      res.json("out");
    },
  
    registerNewUser: async (req, res) => {
      const { username, email, password } = req.body;


      if (await User.findOne({
            where: {
              username: username
            }
          })

        ) {
        res.json({
          message: "username taken",
          status: 401
        });
        return
      }  
      await User.create({
        username: username,
        email: email,
        password: password,
      });
  
      const user = await User.findOne({
        where: {
          username: username,
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
              {
                model: GroupMember,
              },
            ],
          },
        ],
      }
      );
  
      req.session.user = user;
  
      res.json({
        message: "success",
        status: 200,
        user: user,
      });
    },
  
    getUserProfileInfo: async (req, res) => {
      const userSession = req.session.user;
  
      if (!userSession) {
        res.json({ message: "no user" });
        return;
      }
      const user = await User.findOne({
        where: {
          userId: userSession.userId,
        },
      });
      res.json({ message: "success", user: user });
    },
  
    addAdmin: async (req, res) => {
      const { newAdmin } = req.body;
  
      const admin = await User.findOne({
        where: {
          username: newAdmin,
        },
      });

      if (admin) {
        await admin.update({
          isAdmin: true,
        });
    
        res.json({message: 'admin added'});
      } else {
        res.json({message: 'no user'})
      }
  
    },
  
    editUserInfo: async (req, res) => {
      const { userId } = req.params;
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
        where: {
          username: username
        }
      })

      const user = await User.findByPk(userId)

      if (existingUser && existingUser.userId != userId) {
        console.log(existingUser.userId)
        console.log(userId)
        res.json({message: 'name taken'})
        return
      }

        if (user) {
          await user.update({
            username: username,
            email: email,
            password: password,
          });
          res.json({ user: user, message: 'saved' });
        } else {
          res.json({message: 'error'})
        }
    },
    
    deleteUser: async (req, res) => {
      const userId = req.session.user.userId;
  
      await User.destroy({ where: { userId: userId } });
  
      req.session.destroy();
      res.json("success");
    },
  
    checkTask: async (req, res) => {
      const { taskId, groupTask, groupId } = req.body;
  
      try {
        const task = await Task.findOne({
          where: {
            taskId: taskId,
          },
        });
  
        if (task) {
          await task.update({
            checked: true,
          });
  
          const userSession = req.session.user;
  
          if (!userSession) {
            res.json("no user");
            return;
          }
  
          // Update the user's score based on task difficulty
          const user = await User.findByPk(req.session.user.userId);
  
          if (user) {
            let pointsToAdd = 0;
  
            switch (task.difficulty) {
              case 1:
                pointsToAdd = 5;
                break;
              case 2:
                pointsToAdd = 10;
                break;
              case 3:
                pointsToAdd = 20;
                break;
              // Add more cases for other difficulties if needed
  
              default:
              // Handle other difficulties if needed
            }

            if (groupTask) {
              const member = await GroupMember.findOne({
                where: {
                  [Op.and]: [{ groupId: groupId }, { userId: user.userId }],
                }
              })
              await member.update({
                score: member.score + pointsToAdd
              })

              res.json({
                message: "checked",
                task: task,
                pointsAdded: pointsToAdd,
                updatedUserScore: member.score,
              });
              return
            }
  
            await user.update({
              score: user.score + pointsToAdd,
            });
  
            res.json({
              message: "checked",
              task: task,
              pointsAdded: pointsToAdd,
              updatedUserScore: user.score,
            });
          } else {
            res.json({ message: "failed", error: "User not found" });
          }
        } else {
          res.json({ message: "failed", error: "Task not found" });
        }
      } catch (error) {
        console.error("Error checking task:", error);
        res
          .status(500)
          .json({ message: "failed", error: "Internal Server Error" });
      }
    },
  
    getGroup: async (req, res) => {
      const { groupId } = req.params;
  
      const group = await Group.findOne({
        where: {
          groupId: groupId,
        },
        include: [
          {
            model: GroupList,
            include: [
              {
                model: Task,
              },
            ],
          },
          {
            model: GroupMember,
            include: [
              {
                model: User,
              },
            ],
          },
        ],
      });
  
      const user = req.session.user;
  
      if (group && user) {
        res.json({ group: group, userId: user.userId });
      } else {
        res.json({
          group: {
            groupLists: [],
            groupMembers: [],
          },
        });
      }
    },
  
    addTask: async (req, res) => {
      const { title, desc, difficulty, photo } = req.body;
  
      const newTask = await Task.create({
        title: title,
        desc: desc,
        difficulty: difficulty,
        photo: photo,
      });
  
      res.json({
        message: "Task made",
      });
    },

    deleteTask: async (req, res) => {
      const { taskId } = req.params

      await Task.destroy({
        where: {
          taskId: taskId,
        }
      })

      res.json("Task successfully deleted.")
    },
  
    addList: async (req, res) => {
      if (req.session.user.userId) {
        const { listName, dueDate } = req.body;
        const newList = await List.create({
          listName: listName,
          dueDate: dueDate,
          userId: req.session.user.userId,
        });
  
        const list = await List.findOne({
          where: {
            listId: newList.listId,
          },
          include: [
            {
              model: Task,
            },
          ],
        });
        res.json({
          message: "List made",
          list: list,
        });
      } else {
        res.status(403).send("Not authorized to create a List");
      }
    },

    deleteList: async (req, res) => {
        const { listId } = req.params;
      
        await List.destroy({ where: { listId: listId } });

      res.json("success");
    },
    
    editList: async (req, res) => {
      const { titleState, listId, dateState } = req.body;
      try {
        const list = await List.findByPk(listId);
        if (list) {
          await list.update({
            listName: titleState,
            dueDate: dateState,
          });
          const updatedList = await List.findByPk(listId)
          res.json(updatedList);
        }
      } catch (error) {
        console.log("Error");
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error Editing List" });
      }
    },

    addGroupList: async (req, res) => {
      const userId = req.session.user.userId;
      const { groupId } = req.params;
      if (userId) {
        const { groupListName, dueDate } = req.body;
  
        const newGroupList = await GroupList.create({
          groupListName: groupListName,
          dueDate: dueDate,
          userId: req.session.user.userId,
          groupId: groupId,
        });
        const groupLists = await GroupList.findOne({
          where: {
            groupListId: newGroupList.groupListId,
          },
          include: {
            model: Task,
          },
        });
        res.json({
          message: "Group List made",
          groupLists: groupLists,
        });
      } else {
        res.status(403).send("You must be the group owner to create a GroupList");
      }
    },
    
    deleteGroupList: async (req, res) => {
      const { groupListId } = req.params;
    
      await GroupList.destroy({ where: { groupListId: groupListId } });

    res.json("success");
  },

    editGroupList: async (req, res) => {
      const { titleState, groupListId, dateState } = req.body;
      try {
        const groupList = await GroupList.findByPk(groupListId);
        if (groupList) {
          await groupList.update({
            groupListName: titleState,
            dueDate: dateState,
          });
          const updatedGroupList = await GroupList.findByPk(groupListId)
          res.json(updatedGroupList);
        }
      } catch (error) {
        console.log("Error");
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error Editing Group List" });
      }
    }, 

    getLists: async (req, res) => {
      const user = req.session.user;
      if (user) {
        const lists = List.findAll({
          where: {
            userId: user.userId,
          },
        });
        res.json({ lists: lists });
      }
    },
  
    addMember: async (req, res) => {
      const code = +req.body.code;
      const user = req.session.user;
  
      if (user) {
        const group = await Group.findOne({
          where: {
            code: code,
          },
          include: [
            {
              model: GroupMember
            },
          ]
        });
        if (group) {
          if(group.groupMembers.filter(m => m.userId === user.userId).length > 0) {
            res.json({ message: "already in"})
            return
          }
          const groupMember = await GroupMember.create({
            score: 0,
            userId: user.userId,
            groupId: group.groupId,
          });
  
          res.json({ message: "added", groupMember: groupMember });
          return
        } else {
          res.json({ message: "no group" });
          return
        }
      } else {
        res.json({ message: "no user" });
        return
      }
    },

    addTask: async (req,res) => {
        const {title, difficulty, listId, groupListId} = req.body
        console.log(req.body)
        
        const newTask = await Task.create({
            title: title,
            difficulty: +difficulty
        })

        const list = await List.findByPk(listId)

        if (list) {

            console.log(list)
    
            await list.addTask(newTask)
    
            const updatedList = await List.findOne({
                where: {
                    listId: listId
                },
                include: [
                  {
                    model: Task,
                  },
                ]
            })
            res.json(updatedList)
            
        } else if (groupListId){
            const groupList = await GroupList.findByPk(groupListId)

            await groupList.addTask(newTask)

            const updatedList = await GroupList.findOne({
                where: {
                    groupListId: groupListId
                },
                include: [
                  {
                    model: Task,
                  },
                ],
            })
            res.json(updatedList)
        } else {
            res.json('failed')
        }

    },

    leaveGroup: async (req, res) => {
      const {groupId} = req.params //use req.body
      const {userId} = req.session.user
      
      const groupMemberEntry = await GroupMember.findOne({
        where: {
          userId:userId,
          groupId:groupId,
        }
      })

      await groupMemberEntry.destroy()

      const updatedGroupMembers = await GroupMember.findAll({
        where: {
          userId: userId,
        }
      })

      return res.status(200).json({ message: 'User successfully removed from the group.', groupMembers: updatedGroupMembers})
    },

    createGroup: async (req, res) => {
      const {groupName} = req.body

      if (!req.session.user) {
        res.json({message: 'no user'})
        return
      }

      let code = Math.floor(Math.random() * (899999) + 100000)

      let currentGroup = await Group.findOne({
        where: {
          code: code
        }
      })

      while (currentGroup) {
        code = Math.floor(Math.random() * (899999) + 100000)

        currentGroup = await Group.findOne({
          where: {
            code: code
          }
        })

      }


      const newGroup = await Group.create({
        userId: req.session.user.userId,
        groupName: groupName,
        code: code
      })

      await GroupMember.create({
        userId: req.session.user.userId,
        groupId: newGroup.groupId
      })

      res.json({message: 'created', group: newGroup})
    }
  };

  
  export default handlers;
  