import {Group, db, User, Task, List, GroupMember, Repeat, GroupList} from "./model.js"

// Synchronize the database (without force: true if you want to keep existing data)
console.log("syncing database...")

await db.sync({ force: true });
console.log("Seeding database...");

//seeding a group list
const groupList1 = await GroupList.create({
    groupListName: "punch the wall",
    dueDate: new Date('2023-12-24T12:24:00'),
})
// Seed a new group 
const group1 = await Group.create({
    groupName: "kyles DryWall"
})
//seed a group member table
const groupMember1 = await GroupMember.create({
    score: 75,
})

// Seed a new User one with admin one without
const user1 = await User.create({
    username: "paul",
    isAdmin: true,
    password: "asdf",
    score: 50,
    email: "paul@gooberville"
})

const user2 = await User.create({
    username: "gabe",
    isAdmin: false,
    password: "asdf",
    score: 25,
    email: "gabe@coolville"
})
const user3 = await User.create({
    username: "jacob",
    isAdmin: false,
    password: "asdf",
    score: 25,
    email: "jacob@oldville"
})
//seed a new List
const list1 = await List.create({
    listName: "clean garadge",
    isGroupList: false,
    dueDate: new Date('2023-12-17T03:24:00'),
})
const list2 = await List.create({
    listName: "group cleaning",
    isGroupList: false,
    dueDate: new Date('2023-12-17T03:24:00'),
})

//seed a new Task
const task1 = await Task.create({
    title: "sweep garadge",
    desc: "I need to sweep the garadge",
    difficulty: 2,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task2 = await Task.create({
    title: "wipe counters",
    desc: "I need to wipe the counters",
    difficulty: 1,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task3 = await Task.create({
    title: "hard task",
    desc: "the group needs to move the construction the site",
    difficulty: 3,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task4 = await Task.create({
    title: "dishes",
    desc: "i need to wash the dishes",
    difficulty: 1,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task5 = await Task.create({
    title: "make paul a goober again",
    desc: "this is a medium task",
    difficulty: 2,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task6 = await Task.create({
    title: "medium task",
    desc: "this is a medium task",
    difficulty: 2,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task7 = await Task.create({
    title: "easy task",
    desc: "this is a easy task",
    difficulty: 1,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
})
const task8 = await Task.create({
    title: "medium task",
    desc: "this is a medium task",
    difficulty: 2,
    img: "https://media.istockphoto.com/id/178594527/photo/clean-garage.jpg?s=612x612&w=0&k=20&c=0pMNJ53-lcC2kiMgNJSyqsUZVThnDRksbHd751mzoUk=",
    checked: false,
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
const repeat2 = await Repeat.create({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false, 
    friday: false,
    saturday: false,
    sunday: false,
})

// I want task1 to belong to list1
await list1.addTask(task1)

// I want task2 to belong to list2
await list2.addTask(task2)

// I want user1 to belong to group1
await user1.addGroup(group1)

//i want list1 to belong to user1
await user1.addList(list1)

//i want task4, 5, 6to belong to list1
await list1.addTask(task4)
await list1.addTask(task5)
await list1.addTask(task6)

//i want list2 to belong to user2d
await user2.addList(list2)

//i want grouplist1 to belong to group1
await group1.addGroupList(groupList1)

// i want task 3, 7, 8 to belong to groupList1
await groupList1.addTask(task3)
await groupList1.addTask(task7)
await groupList1.addTask(task8)

//i want list to belong to repeat 1
await repeat1.addList(list1)

//i want grouplist1 to belong to repeat 2
await repeat2.addGroupList(groupList1)

//i want groupMember1 to belong to user group1
// await group1.addGroupMember(groupMember1)


// 
const groupMember2 = await group1.createGroupMember({
    userId: 2,
    score: 80
})

const groupMember3 = await user3.createGroupMember({
    groupId: 1,
    score: 85
})


//i want user1 to be in group1
await user1.addGroupMember(groupMember1)
await group1.addGroupMember(groupMember1)
// i want user3 to be in group1 
// await user3.addGroupMember(groupMember1)
// await group1.addGroupMember(groupMember1)

//i want groupMember1 to belong to a user3
// groupMember1.addGroupMember(user3)

// const user5 = await User.createList({
//     listName: "clean kitchen",
//     isGroupList: false,
//     dueDate: new Date('2023-12-17T03:24:00'),
// })
console.log("Finished seeding DB!")

await db.close()



