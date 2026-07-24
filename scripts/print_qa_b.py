# -*- coding: utf-8 -*-
import json
from pathlib import Path

d = json.loads(Path(r"c:\시나브로-vibe\docs\_qa_B_review.json").read_text(encoding="utf-8"))
lines = []
for ko, v in d["samples_proverb"].items():
    lines.append(f"==== {ko} | {v['en']}")
    for lang in ["es", "fr", "de", "ar", "hi", "fil", "sw", "ha", "ne", "my", "bn"]:
        x = v[lang]
        lines.append(f"  {lang}: [{x['type']}] {x['t']} ({x['note']})")
lines.append("==== UI")
for key in ["ui.brand_slogan", "ui.result.misses_line", "card.p1-01.meaning"]:
    lines.append(key)
    lines.append(json.dumps(d["samples_ui"].get(key), ensure_ascii=False, indent=2))
Path(r"c:\시나브로-vibe\docs\_qa_B_readable.txt").write_text("\n".join(lines), encoding="utf-8")
print("wrote readable")
