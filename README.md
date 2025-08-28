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

## Nestjs

コード生成コマンド
```
nest g module goals
nest g service goals
nest g controller goals
```

サンプルリクエスト
```
curl -X POST http://localhost:4000/api/internal/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "フルマラソン",
    "description": "12月のフルマラソンに向けて練習",
    "target_date": "2025-12-01",
    "status": "ongoing"
  }'
```

## Prisma
```
npx prisma db pull
npx prisma migrate dev
```
