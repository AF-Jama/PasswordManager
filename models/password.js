module.exports = (sequelize,DataTypes)=>{
    const passwordTable = sequelize.define('passwordTable',{
        pid:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        encrypt_password:{
            type:DataTypes.STRING(256),
            allowNull:false,
        },
    },{
        timestamps:false
    })
    passwordTable.associate = models=>{
        passwordTable.belongsTo(models.masterTable,{
            foreignKey:'masterId'
        }) //password table belong to master table
    } 
    return passwordTable
}