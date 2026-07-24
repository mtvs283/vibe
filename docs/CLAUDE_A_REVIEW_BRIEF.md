# Claude 교차검증 지시문 — A열 검수

너는 시나브로 i18n **검수만** 한다. 번역 대량 재작성·구조 변경 금지.

## 파일
`docs/sinavro-i18n.xlsx`

## 네가 검수할 열 (owner=A)
`ja` · `zh-CN` · `zh-TW` · `vi` · `th` · `id` · `mn` · `ru` · `uz` · `kk` · `ky`

## 하지 말 것
- B 언어 열 수정 (`ne my km hi bn ar es fr de sw ha fil`)
- key / category / en / ko_proverb / en_match 수정
- 열·행·시트 추가/삭제

## 검수 기준
1. 빈칸
2. `{n}` 플레이스홀더 누락
3. 영어 문장 거의 그대로인 직역/미번역
4. UI 톤이 게임 문구답지 않게 장황함
5. proverb_map: 의미 안 맞는 속담, `_type` 누락, 억지 대응인데 note 없음
6. zh-TW가 zh-CN과 동일 간체 문자로만 된 경우

## 수정 허용 범위
- 명백한 오역/빈칸/`{n}` 누락/`_type` 누락만 **해당 A열 셀** 수정
- 애매하면 수정하지 말고 issues에만 적기

## 보고 형식만
```
A_REVIEW
- checked languages: ...
- fixed cells: N
- issues:
  - lang | key_or_proverb | problem
- verdict: pass | pass_with_notes | needs_rework
```
