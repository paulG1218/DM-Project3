import { DataTypes, Model } from "sequelize";
import util from 'util'
import connectToDB from "./db.js";

export const db = await connectToDB('postgresql:///project_db')

export class Group extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Group.init(
    {
        groupId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'group',
        sequelize: db,
    }
    )

export class GroupList extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

GroupList.init(
{
    groupListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupListName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    dueDate: {
        type: DataTypes.DATE,
        allowNull:false,
    }
},
{
    modelName: 'groupList',
    sequelize: db,
})
    
    export class GroupMember extends Model {
        [util.inspect.custom]() {
            return this.toJSON()
        }
    }
    
GroupMember.init(
{
    groupMemberId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    modelName:'groupMember',
    sequelize:db,
}
)

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

User.init(
{
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,    
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    modelName: 'user',
    sequelize: db,
}
)

export class Task extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Task.init(
{
    taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    modelName: 'task',
    sequelize: db,
}
    )

    export class List extends Model {
        [util.inspect.custom]() {
            return this.toJSON()
        }
    }    

List.init(
{
    listId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    listName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isGroupList: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},
{
    modelName: 'list',
    sequelize: db,
}
)

export class Repeat extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}  

Repeat.init(
    {
        repeatId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        monday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        tuesday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        wednesday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        thursday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        friday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        saturday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
        sunday: {
            type: DataTypes. BOOLEAN,
            allowNull: false,
        },
    },
    {
        modelName: 'repeat',
        sequelize: db,
    }
    )

User.hasMany(List, { foreignKey: 'userId' })
List.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Group, { foreignKey: 'userId' })
Group.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(GroupMember, { foreignKey: 'userId' })
GroupMember.belongsTo(User, { foreignKey: 'userId' })

Group.hasMany(GroupMember, { foreignKey: 'groupId' })
GroupMember.belongsTo(Group, { foreignKey: 'groupId' })

Group.hasMany(GroupList, { foreignKey: 'groupId' })
GroupList.belongsTo(Group, { foreignKey: 'groupId' })

List.hasMany(Task, { foreignKey: 'listId' })
Task.belongsTo(List, { foreignKey: 'listId'})

GroupList.hasMany(Task, { foreignKey: 'groupListId' })
Task.belongsTo(GroupList, { foreignKey: 'groupListId' })

Repeat.hasMany(List, { foreignKey: 'repeatId' })
List.belongsTo(Repeat, { foreignKey: 'repeatId' })

Repeat.hasMany(GroupList, { foreignKey: 'repeatId' })
GroupList.belongsTo(Repeat, { foreignKey: 'repeatId' })
