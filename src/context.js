const { PrismaClient } = require('@prisma/client');
const jwt = require ('jsonwebtoken')
const prisma = new PrismaClient();

const getUser = async (token) => {
  try{
    const verify = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err,user) =>{
        if(err) return new Error('NOT TOKEN')
        
        return user;
      }
    ) 
    // console.log("tien12",verify?.email);
    const auth = await prisma.user.findFirst({
      where: { email: verify?.email },
      select: { id: true },
    });
    
    return auth || null;
  }
  catch(error) {
    console.log(error);
  }
}
const context = async ({req}) => {
  
  const token = req.headers.authorization?.split(' ')[1] || '';
  const user =  await getUser(token)
  const result = {
    ...req,
    prisma: prisma,
    user :  user
  }
  
  return result ;
};

module.exports = context;
