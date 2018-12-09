const express = require('express')
const router = express.Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
	const accessToken = req.body.accessToken
	axios.post(`${baseUrl}/accesstoken`, {
		accesstoken: accessToken,
	}).then(result => {
		if (result.status === 200 && result.data.success) {
			req.session.user = {
				accessToken,
				loginName: result.data.loginname,
				id: result.data.id,
				avatarUrl: result.data.avatar_url,
			}
		}
		res.json({
			success: true,
			data: result.data
		})
	}).catch(err => {
		console.log(err.response)
		if (err.response) {
			res.json({
				success: false,
				data: err.response.data
			})
		} else {
			next(err)
		}
	})

})


module.exports = router