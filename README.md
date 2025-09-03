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

目標に紐づく進捗一覧取得
```
curl -X GET http://localhost:4000/api/internal/goals/cdd9cda6-4d43-45f9-8fa1-70d8f96dac71/progress_logs
```

目標進捗登録
```
curl -X POST http://localhost:4000/api/internal/goals/cdd9cda6-4d43-45f9-8fa1-70d8f96dac71/progress_logs \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2025-08-31T12:00:00Z",
    "content": "今日は2時間アルゴリズム問題を解いた。",
    "studyTime": 120,
    "progressRate": 40,
    "mood": "good"
  }'
```

## Prisma

prismaファイルのフォーマット
```
prisma format
```

DBの内容をprismaに反映
```
npx prisma db pull
```

prismaの内容をDBに反映
```
npx prisma db push
```

migration実行
```
npx prisma migrate dev
```

```
npx prisma migrate dev --name add_progress_log
```