import {Group, db, User, Task, List, GroupMember, Repeat, GroupList} from "./model.js"

// Synchronize the database (without force: true if you want to keep existing data)
console.log("syncing database...")

await db.sync({ force: true });
console.log("Seeding database...");

//seeding a group list
const groupList1 = await GroupList.create({
    groupListName: "punch the wall",
})
// Seed a new group 
const group1 = await Group.create({
    groupName: "kyles DryWall"
})
//seed a group memeber table
const groupMember1 = await GroupMember.create({
    score: 75,
})
// Seed a new User one with admin one withought
const user1 = await User.create({
    username: "paul is a goober",
    isAdmin: true,
    password: "asdf",
    score: 5,
    email: "paul@gooberville"
})

const user2 = await User.create({
    username: "gabe",
    isAdmin: false,
    password: "asdf",
    score: 25,
    email: "gabe@coolville"
})
//seed a new List
const list1 = await List.create({
    listName: "clean garadge",
    isGroupList: false,
    dueDate: new Date('2023-12-17T03:24:00'),
    // userId: user1.userId
})
const list2 = await List.create({
    listName: "house cleaning",
    isGroupList: false,
    dueDate: new Date('2023-12-17T03:24:00'),
})

//seed a new Task
const task1 = await Task.create({
    title: "sweep garadge",
    desc: "i need to sweep the garadge",
    difficulty: 2,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: true,
})
const task2 = await Task.create({
    title: "wipe counters",
    desc: "i need to wipe the counters",
    difficulty: 1,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: true,
})

//seeding the repeat list
const repeat1 = await Repeat.create({
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false, 
    friday: true,
    saturday: false,
    sunday: false,
})

// I want task1 to belong to list1
list1.addTask(task1)

// I want task2 to belong to list2
list2.addTask(task2)

// I want user1 to belong to group1
group1.addUser(user1)

//i want list1 to belong to user1
user1.addList(list1)

//i want list2 to belong to user2
user2.addList(list2)




// const user5 = await User.createList({
//     listName: "clean kitchen",
//     isGroupList: false,
//     dueDate: new Date('2023-12-17T03:24:00'),
// })


