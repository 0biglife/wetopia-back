# 📦 Wetopia Backend - Nest.js (Node.js)

주가 데이터 수집 및 제공을 위한 **Nest.js 기반 백엔드 프로젝트**입니다. 현재는 **Twelve Data API**를 통해 주식 종목 데이터를 수집하고 PostgreSQL에 저장합니다. Next.js 프론트엔드와 연동되어 실시간 주식 차트를 제공합니다.

---

## Tech Stack

- **Language**: TypeScript (ES2022+)
- **Framework**: [Nest.js](https://nestjs.com)
- **Database**: PostgreSQL (Neon.tech)
- **ORM**: TypeORM
- **Scheduler**: `@nestjs/schedule`
- **Config**: `@nestjs/config` + `.env`
- **HTTP Client**: `@nestjs/axios`
- **API Docs**: Swagger (`@nestjs/swagger`)
- **Hosting**: AWS App Runner

---

## Directory Structure

```bash
wetopia-backend
├── src
│   ├── app.module.ts         # 루트 모듈
│   ├── main.ts               # 앱 진입점
│   ├── config                # 환경변수 설정 모듈
│   │   └── config.module.ts
│   ├── stocks                # 주가 관련 도메인
│   │   ├── dto               # 요청 및 응답 DTO
│   │   ├── entities          # TypeORM 엔티티
│   │   ├── stocks.module.ts
│   │   ├── stocks.service.ts
│   │   ├── stocks.controller.ts
│   ├── external              # 외부 API 연동 (TwelveData)
│   │   └── twelve-data.service.ts
│   ├── common                # 공용 유틸, 필터, 예외 등
│   │   ├── filters
│   │   ├── interceptors
│   │   ├── utils
├── test                     # 테스트 코드
├── .env                     # 환경 변수 파일
├── tsconfig.json
├── package.json
```

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/wetopia-backend.git
cd wetopia-backend
yarn install
```

### 2. .env 설정

```dotenv
DATABASE_URL="postgres://..."
TWELVE_DATA_API_KEY="your_api_key"
```

### 3. Run

```bash
yarn start:dev
```

서버는 기본적으로 `http://localhost:3000` 에서 실행됩니다.

---

## API Endpoints(삭제 예정)

### ✅ POST `/api/stocks/history`

> 특정 종목의 기간별 주가 히스토리 조회

#### Request Body (JSON)

```json
{
  "symbol": "AAPL",
  "interval": "1day",
  "range": "1y"
}
```

#### Response

```json
{
  "status": "success",
  "data": [
    {
      "symbol": "AAPL",
      "date": "2024-05-01",
      "open": 182.34,
      "close": 185.76,
      "high": 187.12,
      "low": 181.9,
      "volume": 123456789
    }
  ]
}
```

## Architecture

- **Domain Driven Structure**: 모듈별 디렉토리 구성 (Controller, Service, DTO, Entity)
- **환경 설정 분리**: `@nestjs/config` 기반 설정 관리
- **모듈화된 외부 API 연동**: `external` 디렉토리 기반 API 분리
- **범용 유틸리티 제공**: 날짜 변환 등 유틸 모듈화
- **타입 안정성 및 검증**: `class-validator`, DTO 기반 구조화

---

## 환경 변수

```env
DATABASE_URL=postgres://...
TWELVE_DATA_API_KEY=your-api-key
```

AWS App Runner에 배포 시 해당 변수를 환경 변수 설정에 입력해주세요.

---

## Deployment (AWS App Runner)

- **런타임**: Node.js 20
- **소스 디렉토리**: `/`
- **빌드 명령어**:
  ```bash
  yarn install && yarn build
  ```
- **시작 명령어**:
  ```bash
  node dist/main.js
  ```
- **포트**: 3000
- **환경 변수 등록 필수**

## Commit Convention

- `feat: 신규 API 구현`
- `fix: 외부 API 오류 수정`

## Contact

- Maintainer: [@0biglife](https://github.com/0biglife)
- PR & Issue는 언제든지 환영합니다!
