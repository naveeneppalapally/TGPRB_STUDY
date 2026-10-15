# Content improvement queue

Read when asked to process the improvement queue.

Content Improvement Queue Processing
For **"Process improvement queue"**:
1. Run `python3 scripts/export_improvement_queue.py` to retrieve pending queue items.
2. For each item, inspect `note_id` and `section_id` to locate target code. Apply changes based on `item_type` (`replace_image`, `fix_fact`, `add_table`, `add_topic`).
3. Mark done: `python3 scripts/export_improvement_queue.py mark-done <item_id> "Brief description"`.
4. Never silently skip items; record reasons in admin notes.
