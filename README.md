# Sinfroad Server

## Domain

### Post

```ts
{
  title: string;
  contents: string;
  address: string;
  images: [
    url: string;
  ];
  created: Date;
  updated: Date;
}
```

## 기능 요구사항

1. 포스트 리스트

   - 포스트 전체 리스트
   - 페이지네이션 10개 단위
   - 타이틀 검색 기능
   - 타이틀, 이미지 1개, created

2. 포스트 상세 조회

   - 포스트 상세 조회
   - 이미지, 타이틀, 내용, 주소, created

3. 포스트 생성
   - 포스트 생성
   - Sinf만 작성할 수 있도록 제한
   - 타이틀, 내용, 주소, 이미지 제출(이미지 최소 1개, 최대 4개)
