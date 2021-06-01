import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc   Auth user & get token
// @route  POST /user/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })
	console.log(await user.matchPassword(password))
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: null
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})
