import express from 'express'
import redis from "redis"


const app = express()

app.use(express.text())

const redisUrl = process.env.REDIS_URL
const client = redis.createClient({
  url: redisUrl
});

client.on("error", function(error) {
  console.error(error);
});

await client.connect()  // redis v.4부터는 명시적으로 connect()를 호출해야 한다.

app.get("/", (req, res) => {
  console.log("request at URL")
  res.send("hello nabeeel from port " + port)
})

app.get('/keys', async (req, res) => {
  try {
    const value = await client.KEYS('*')
    res.send(value)
  } catch(err) {
    res.send(err)
  }
})

app.get("/:key", async (req, res) => {
  const key = req.params.key
  console.log('key : ', key)
  try {
    const value = await client.get(key)
    res.send(value)
  } catch(err) {
    res.send(err)
  }
})

app.post("/:key", async (req, res) => {
  const key = req.params.key
  // console.log('key : ', key)
  const data = req.body
  // console.log('data : ', data)
  try {
    const value = await client.set(key, data)
    res.send(value)
    
  } catch(err) {
    res.send(err)
  }
})


const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("app is listening on port " + port)
})