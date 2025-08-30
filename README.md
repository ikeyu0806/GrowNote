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

目標一覧取得
```
curl http://localhost:4000/api/internal/goals
```

slugをキーに目標1件取得
```
curl http://localhost:4000/api/internal/goals/a7a16174-bdaf-424a-a665-9d2eee1780db
```

目標登録
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

slugをキーに更新
```
curl -X PATCH http://localhost:4000/api/internal/goals/a7a16174-bdaf-424a-a665-9d2eee1780db \
  -H "Content-Type: application/json" \
  -d '{"title":"更新テスト","status":"completed"}'
```

slugをキーに削除
```
curl -X DELETE http://localhost:4000/api/internal/goals/a7a16174-bdaf-424a-a665-9d2eee1780db
```

## Prisma
```
npx prisma db pull
npx prisma migrate dev
```

```
npx prisma migrate dev --name add_progress_log
```