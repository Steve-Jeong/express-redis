import redis from "redis";
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

await client.connect()

client.set("whoami", "I am Steve", redis.print);
client.get("whoami", redis.print);