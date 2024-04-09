import trainingData from '../users.json' assert { type: 'json' }




export const userIdMiddleware = (req, res, next) => {

  //Destructuring params object. 

  const userId = req.params.userId
  if (!userId) {
    console.log(`userId requireed!`)
    return res.status(404).send(`Username required!`)
  }
  
  const userFound = trainingData.find( user => user.userId.toLowerCase() === req.params.userId.toLowerCase())
  if (!userFound) {
    console.log(`user ${userId} not found`)
    return res.status(404).send(`User  ${userId} not found`)
  } 
  
  // if (!userId) { //Add logic to test if the user is actually in the database
  //   return res.status(400).send('User ID required')
  // }
  req.user = userFound // Attach userId to the request object
  console.log(`Logged user: ${req.user.userId}`);

  next();
}
