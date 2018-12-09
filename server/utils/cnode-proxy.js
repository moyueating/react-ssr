const axios = require('axios')
const queryString = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function(req, res, next){
	console.log(req.path)
	console.log(req.body)
	console.log(req.method)
	const path = req.path
	const user = req.session.user || {}
	const needAccessToken = req.query.needAccessToken

	if(needAccessToken && !user.accessToken){
		return res.status(401).send({
			success: false,
			msg: 'need login'
		})
	}

	const query = Object.assign({}, req.query,{
		accessToken: needAccessToken && req.method === 'GET' ? user.accessToken : ''
	})
	if(query.needAccessToken){
		delete query.needAccessToken
	}

	axios({
		url: `${baseUrl}${path}`,
		method: req.method,
		params: query,
		data: Object.assign({}, req.body, {
			accesstoken: needAccessToken && req.method === 'POST' ? user.accessToken : ''
		}),
		// data: queryString.stringify(Object.assign({}, req.body, {
		// 	accesstoken: user.accessToken
		// })),
		// headers: {
		// 	"Content-Type": 'application/x-www-form-urlencoded'
		// }
	}).then(result => {
		if(result.status === 200){
			return res.send({
				...result.data
			})
		}else{
			return res.status(result.status).send(result.data)
		}
	}).catch(err => {
		if(err.response){
			return res.status(500).send(err.response.data)
		}else{
			return res.status(500).send({
				success: false,
				msg: '未知错误'
			})
			next()
		}
	})
}