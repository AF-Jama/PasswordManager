module.exports = (sequelize,DataTypes)=>{
    const masterTable = sequelize.define('masterTable',{
        mid:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        master_password:{
            type:DataTypes.CHAR(60),
            allowNull:false
        }
    },{
        timestamps:false
    })
    masterTable.associate = models =>{
        masterTable.belongsTo(models.userTable,{
            foreignKey: "userId",
            onDelete:"cascade",
            allowNull:false
        }) // usetable primary key added to master table as foreign key
        masterTable.hasMany(models.passwordTable,{
            foreignKey:"masterId",
            allowNull:false,
            onDelete:'cascade'
        }) // 1:m relationship 1 master key can be linked to many passowrds in password table 
    }
    return masterTable
}