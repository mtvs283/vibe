# B열 검증 리포트 (Cursor)

**Verdict:** `pass_with_notes`

## 요약
- **완성도:** B 12개 언어 전부 strings 123/123, proverbs 42/42
- **`{n}` 플레이스홀더:** 실패 0
- **치명 이슈:** 없음
- **주의:** 속담 중 paraphrase/loose 비율 언어당 약 15~30% (고정 속담 없는 항목)

## 언어별 paraphrase 비율
| lang | paraphrase | loose note |
|------|------------|------------|
| es | 6/42 | 13 |
| fr | 10/42 | 11 |
| de | 8/42 | 10 |
| ar | 10/42 | 10 |
| hi/bn/ne | 11/42 | 13 |
| fil | 9/42 | 11 |
| km/my/sw/ha | 8/42 | 9~11 |

## UI 샘플 (es/fr/de) — 합격
- 슬로건/히어로/CORRECT·WRONG 톤 자연스러움
- `misses_line`에 `{n}` 유지 확인

## 속담 샘플
- **제 무덤…** → es/fr/de/ar/hi 모두 “자기 무덤 파기” 계열 idiom — 좋음
- **똥 묻은 개…** → es sartén/cazo, fr hôpital, de Esel — 좋은 로컬 속담
- **호랑이 담배…** → `En mis tiempos` / `De mon temps` / `Zu meiner Zeit` — Back in my day로 적절
- **설마…** → 대부분 paraphrase+loose (Famous last words 대응 속담 부족) — 허용
- **벼는 익을수록…** → 겸손 paraphrase+loose 다수 — 의미 OK, 속담성 약함
- **참새 방앗간…** → moth-to-flame 계열 유지 — OK

## 권장 후속 (블로커 아님)
1. `ha` / `sw` / `my` / `km` 원어민 샘플 검수 (스크립트·톤)
2. paraphrase 항목 중 학습 핵심 카드만 더 센 로컬 속담으로 보강
3. A열은 클로드가 `docs/CLAUDE_A_REVIEW_BRIEF.md`로 교차검수

## 총평
초안으로서 **사용 가능**. 앱 적용 전에 A↔B 교차검증만 마치면 됨.
