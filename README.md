# Example Project

## 커밋 템플릿 적용 방법

```bash
# 로컬 환경에서 커밋 템플릿 적용
git config --local commit.template .gitmessage.txt

# 커밋 템플릿으로 커밋
git commit
```

## 처음 로컬 환경에서 도커 시작

```bash
# 빌드 후 시작
docker compose up --build
```

## 앱 시작

```bash
# 로컬 환경 시작
$ docker compose up

# 백그라운드 환경에서 시작
docker compose up -d
```
