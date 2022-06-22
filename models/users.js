module.exports = (sequelize,DataTypes)=>{
    const userTable = sequelize.define('userTable',{
        id:{
            type:DataTypes.BIGINT,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        username:{
            type:DataTypes.CHAR(50),
            unique:true,
            allowNull:false,

        },
        email:{
            type:DataTypes.STRING(250),
            unique:true,
            allowNull:false
        },
        created_at:{
            type:DataTypes.DATE,
            allowNull:false,
            //create default timestamp
            defaultValue:DataTypes.NOW
        }
    },{
        timestamps:false
    })
    userTable.associate = models =>{
        userTable.hasOne(models.masterTable,{
            foreignKey: "userId",
            onDelete:'cascade'
        })  
    }
    return userTable
}