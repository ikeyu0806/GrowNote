## Docker開発関連

バックエンド接続
```
docker exec -it grownote-nestjs bash
```

フロントエンド接続
```
docker exec -it grownote-frontend bash
```

DB接続

```
docker compose exec grownote-db psql -U devuser -d grownote
```

## Prisma
```
npx prisma db pull
npx prisma migrate dev
```
