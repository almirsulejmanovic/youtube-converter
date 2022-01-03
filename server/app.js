const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const app = express();
const readline = require('readline');

app.use(cors());

app.listen(0, () => console.log('Application is running'));


app.get('/server/downloadmp3', async (req, res) => {
	try {
		var url = req.query.url;
		if (!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		let title = 'audio';

		await ytdl.getInfo(url).then(info => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
			let contentLengthArray = info.formats.filter(e => e.itag == 140);
			contentLength = contentLengthArray[0].contentLength;
		});

		res.setHeader('Content-Type', 'audio/mpeg')
		res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
		res.setHeader('Content-Length', `${contentLength}`)

		ytdl(url, {
			quality: '140'
		}).pipe(res);


	} catch (err) {
		console.error(err);
	}
});

app.get('/server/downloadmp4', async (req, res) => {
	try {
		var url = req.query.url;
		if (!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		let title = 'video';

		await ytdl.getInfo(url).then(info => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.setHeader('Content-Type', 'video/mpeg')
		res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);

		ytdl(url, {
			format: 'mp4'
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});