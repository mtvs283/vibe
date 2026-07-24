# Claude 작업 지시문 — 시나브로 i18n (B 언어)

아래 내용을 클로드에게 **그대로 복붙**하세요.

---

## 역할
너는 시나브로(SINAVRO) 카드게임의 **다국어 번역만** 한다.  
코드 수정, 파일 구조 변경, 새 포맷 제안, JSON 변환, 리팩터 **전부 금지**.

## 작업 파일
`docs/sinavro-i18n.xlsx`

## 담당 언어 (owner = B) — 이미 열/행이 준비됨
| order | code | name |
|------:|------|------|
| 13 | ne | 네팔어 |
| 14 | my | 버마어 |
| 15 | km | 크메르어 |
| 16 | hi | 힌디어 |
| 17 | bn | 벵골어 |
| 18 | ar | 아랍어 |
| 19 | es | 스페인어 |
| 20 | fr | 프랑스어 |
| 21 | de | 독일어 |
| 22 | sw | 스와힐리어 |
| 23 | ha | 하우사어 |
| 24 | fil | 타갈로그(Tagalog) |

이 12개 코드의 열만 채운다.  
`ja, zh-CN, zh-TW, vi, th, id, mn, ru, uz, kk, ky` (owner=A) 와 `en` / `key` / `category` / `ko_*` 는 **절대 수정 금지**.

## 번역 대상 / 비대상

### 번역함
- `strings`: UI, meaning, scenario, era, format, alt
- `proverb_map`: 담당 언어 속담/관용구 + `_type` + `_note`

### 번역하지 않음
- 한국어 신조어/리믹스, 한국어 속담 원문, 로마자
- 기관명 `한국어교육AI연구개발원`, 브랜드 `SINAVRO`
- `strings`의 `key`, `category`, `en`
- `proverb_map`의 `ko_proverb`, `en_match`, `en_type`(비어 있으면 그대로)

## 시트별 규칙

### strings
- 담당 언어 코드 열만 입력
- `{n}` 플레이스홀더 유지
- 자연스러운 짧은 게임 UI 문장

### proverb_map
- 그 언어의 실제 속담/관용구 우선
- 없으면 paraphrase + `{code}_note`에 `loose` 또는 `no native proverb`
- `{code}_type`: `idiom` | `proverb` | `saying` | `paraphrase` 만
- 한 셀 = 한 표현

### locales
- 담당 언어 `done`만 `yes`로 변경 가능
- code/name/order/owner 변경 금지

## 금지
- 열/행 추가·삭제·이름 변경 (이미 준비되어 있음)
- 새 시트 생성, README 수정
- A 언어 열 손대기
- 한국어 원문 변경

## 작업 순서
1. `locales`에서 owner=B 코드 확인 (`ne`~`fil`)
2. `strings` B 열 채우기
3. `proverb_map` B 열/`_type`/`_note` 채우기
4. 해당 `locales.done = yes`
5. 아래 형식으로만 보고

## 보고 형식
```
DONE
- languages: ne, my, km, hi, bn, ar, es, fr, de, sw, ha, fil
- strings filled: N
- proverb_map filled: N
- loose/paraphrase count: N
- issues: (있으면만)
```

지금 바로 `docs/sinavro-i18n.xlsx`의 B 언어 열을 채워라.
