import dbConnect from '../../middleware/mongodb'
import Users from '../../schema/user'

export default async function handler(req, res) {
  const {method} = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let users = await Users.find()
        res.status(200).json({
          success: true,
          msg: 'Success',
          data: users,
        })
      } catch (error) {
        return res.status(400).json({success: false, msg: 'Error : ' + error.message})
      }
      break
    default:
      res.status(400).json({success: false, msg: 'Method not allowed'})
      break
  }
}
