export const userIdMiddleware = (req, res, next) => {

  //Destructuring params object. 
  const { userId } = req.params //It is the same as: const userId = req.params.userId
  if (!userId) { //Add logic to test if the user is actually in the database
    return res.status(400).send('User ID required')
  }
  req.userId = userId // Attach userId to the request object
  console.log(`Logged user: ${userId}`);
  next();
}