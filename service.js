// 爬虫

// 用于搭建简易的本地服务器
const express = require('express')
const app = express()
// 用于第三方客户端请求代理
const superagent= require('superagent')
// 相当于node版的jq，用于抓取页面元素和数据信息
const cheerio = require('cheerio')
// 解决跨域问题
const cors = require('cors')
// 用于请求接口
const request = require('request')

app.use(cors())

let server = app.listen(3000, () => {
	// let host = server.address().address
	let host = 'localhost'
	let port = server.address().port
	console.log(`Your Service is running at http://${host}:${port}`)
})

let hotNews = []
let hero = []

app.get('/getBaiduNews', (req, res, next) => {
	superagent.get('http://news.baidu.com/').end((err, data) => {
		if (err) {
			console.log('抓取失败')
		} else {
			hotNews = getNews(data)
			res.send(hotNews);
		}
	})
})

app.get('/getLOLHero', async (req, res, next) => {
	request.get('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js', (error, response, body) => {
		res.send(body);
	})
})

let getNews = (res) => {
	let news = []
	let $ = cheerio.load(res.text)
	$('div#pane-news ul li a').each((idx, ele) => {
		// cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
		// 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
		let newItem = {
		  title: $(ele).text(),
		  href: $(ele).attr('href')
		};
		news.push(newItem)
	});
	return news
}