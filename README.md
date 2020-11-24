# Event Sourced Video Streaming Sample App

## Requirements

- NodeJS v 12.xxx - I'm using 12.18.3
- docker & docker compose
- something to export environment variables
  - I'm using https://direnv.net/ and a .envrc file. Dotenv can also be used.


## Running

```
docker-compose rm -sf && docker-compose up

npm install

npm run start-dev-server
```

That's all folks.
