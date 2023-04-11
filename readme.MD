Using Redis from a Node.js Express App via Docker Compose
=========================================================

https://nabeelvalley.co.za/docs/javascript/redis-from-express/

await client.connect() // connect()함수를 써서 명시적으로 연결해야 한다.

도커 시작

도커로 전환하기전에는 redis로 잘 돌아갔는데,
docker-compose로 전환한 후에는 redis에 접속이 안된다. ㅜㅜ

docker-compose up -d --build와 같이 --build옵션을 넣고,
docker-compose.yml에 web과 redis 서비스에
network_mode: bridge를 넣었는데도 안된다.

docker logs redis -f로 보면 redis는 정상 작동하는 것 같다.
docker logs web -f로 보면 여전히  redis 접속을 못한다.

4/11
도커 컴포즈를 사용하지 않고,
docker run -p 6379:6379 -d --name redis redis:latest
-> redis:7.0.10 컨테이너가 만들어졌다.
redis 컨테이너만 실행한 상태에서 프로그램이 잘 돌아감.


