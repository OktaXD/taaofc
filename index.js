import { cwd } from 'process';
import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 8080
import fs from 'fs';
import hikki from 'canvas-hikki'
import knights from "knights-canvas";
import path from "path";

const __path = cwd();

app.use(express.json())
app.set("json spaces", 2)

const creator = 'Client';

const loghandler = {
error: {
		status: false,
		code: 406,
		error: 'Internal server error!',
	}
}

app.get('/', async (req, res) => {
  try {
    const baseUrl = `https://${req.hostname}`;
    const goodbye = `${baseUrl}/goodbye?name=textMT&gcname=text&ppgc=image&member=text&pp=image&bg=image`;
    const welcome = `${baseUrl}/welcome?name=text&gcname=text&ppgc=image&member=text&pp=image&bg=image`;
    const welcome2 = `${baseUrl}/welcome2?name=text&gcname=text&ppgc=image&member=text&pp=image&bg=image`;
    const welcome3 = `${baseUrl}/welcome3?name=text&gcname=text&ppgc=image&member=text&pp=image&bg=image`;
    const loli = `${baseUrl}/loli`;
    const resultJson = {
      endpoint: [
        { name: "goodybe", url: goodbye },
        { name: "welcome", url: welcome },
        { name: "welcome2", url: welcome2 },
        { name: "welcome3", url: welcome3 },
        { name: "randomloli", url: loli }
      ],
      status: true,
    };
    res.json(resultJson);
  } catch (error) {
  res.json({ status: "false", result: "Request failed!" });
  }
});

//Routernya 
app.get('/welcome2', async(req, res) => {
  try {
  var name = req.query.name
  var gcname = req.query.gcname
  var ppgc = req.query.ppgc
  var member = req.query.member
  var bg = req.query.bg
  var pp = req.query.pp

  if (!name) return res.json({ message: 'Masukan parameter name?='})
  if (!gcname) return res.json({ message: 'Masukan parameter &gcname?='})
  if (!bg) return res.json({ message: 'Masukan parameter &bg?='})
  if (!pp) return res.json({ message: 'Masukan parameter &pp?='})
  if (!member) return res.json({ message: 'Masukan parameter &member?='})
  const image = await new hikki.Welcome2()
    .setUsername(name)
    .setGroupname(gcname)
    .setMember(member)
    .setAvatar(pp)
    .setBg(bg)
    .toAttachment();
    let data = image.toBuffer();
    await fs.writeFileSync(__path +'/tmp/welcome2.png', data)
   	await res.sendFile(__path +'/tmp/welcome2.png')
    } catch(err) {
    console.log(err) 
    res.json({
			status: false,
			creator: `${creator}`,
			result: 'Request failed!',
			error: loghandler.error
		});
    }   
})

app.get('/welcome3', async(req, res) => {
  try {
  var name = req.query.name
  var pp = req.query.pp
  if (!name) return res.json({ message: 'Masukan parameter name?='})
  if (!pp) return res.json({ message: 'Masukan parameter &pp?='})
  const image = await new hikki.Welcome3()
    .setUsername(name)
    .setAvatar(pp)
    .toAttachment();
   let data = image.toBuffer();
    await fs.writeFileSync(__path +'/tmp/welcome3.png', data)
   	await res.sendFile(__path +'/tmp/welcome3.png')
  } catch(err) {
  console.log(err) 
  res.json({
			status: false,
			creator: `${creator}`,
			result: 'Request failed!',
			error: loghandler.error
		});
}   
})


app.get('/welcome', async(req, res) => {
  try {
  var name = req.query.name
  var gcname = req.query.gcname
  var ppgc = req.query.ppgc
  var member = req.query.member
  var bg = req.query.bg
  var pp = req.query.pp
  if (!name) return res.json({ message: 'Masukan parameter name?='})
  if (!gcname) return res.json({ message: 'Masukan parameter &gcname?='})
  if (!ppgc) return res.json({ message: 'Masukan parameter &ppgc?='})
  if (!bg) return res.json({ message: 'Masukan parameter &bg?='})
  if (!pp) return res.json({ message: 'Masukan parameter &pp?='})
  if (!member) return res.json({ message: 'Masukan parameter &member?='})
  const image = await new knights.Welcome()
    .setUsername(name)
    .setGuildName(gcname)
    .setGuildIcon(ppgc)
    .setMemberCount(member)
    .setAvatar(pp)
    .setBackground(bg)
    .toAttachment();
   let data = image.toBuffer();
    await fs.writeFileSync(__path +'/tmp/welcome.jpg', data)
   	await res.sendFile(__path +'/tmp/welcome.jpg')
   } catch(err) {
   console.log(err) 
   res.json({
			status: false,
			creator: `${creator}`,
			result: 'Request failed!',
			error: loghandler.error
		}); 
}   
})

app.get('/goodbye', async(req, res) => {
  try {
  var name = req.query.name
  var gcname = req.query.gcname
  var ppgc = req.query.ppgc
  var member = req.query.member
  var bg = req.query.bg
  var pp = req.query.pp

  if (!name) return res.json({ message: 'Masukan parameter name?='})
  if (!gcname) return res.json({ message: 'Masukan parameter &gcname?='})
  if (!ppgc) return res.json({ message: 'Masukan parameter &ppgc?='})
  if (!bg) return res.json({ message: 'Masukan parameter &bg?='})
  if (!pp) return res.json({ message: 'Masukan parameter &pp?='})
  if (!member) return res.json({ message: 'Masukan parameter &member?='})
  const image = await new knights.Goodbye()
    .setUsername(name)
    .setGuildName(gcname)
    .setGuildIcon(ppgc)
    .setMemberCount(member)
    .setAvatar(pp)
    .setBackground(bg)
    .toAttachment();
  let data = image.toBuffer();
    await fs.writeFileSync(__path +'/tmp/bye.png', data)
   	await res.sendFile(__path +'/tmp/bye.png')
  } catch(err) {
   console.log(err) 
   res.json({
			status: false,
			creator: `${creator}`,
			result: 'Request failed!',
			error: loghandler.error
		});
} 
})


//Loli
app.get('/loli', async (req, res, next) => {
const Loli = JSON.parse(fs.readFileSync(__path +'/db/loli.json'))
const randLoli = Loli[Math.floor(Math.random() * Loli.length)]
  res.json({ 
	  status: 'true',
	  creator: creator,
	  url: randLoli
  });

})
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



