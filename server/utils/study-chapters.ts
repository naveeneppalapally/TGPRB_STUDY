import type { StudyChapter } from '../../types/study'
import chapter0 from "../../content/data/study/geography/dams-in-india"
import chapter1 from "../../content/data/study/geography/drainage-system-of-india"
import chapter2 from "../../content/data/study/geography/forests-in-india"
import chapter3 from "../../content/data/study/geography/irrigation-in-india"
import chapter4 from "../../content/data/study/geography/mountains-in-india"
import chapter5 from "../../content/data/study/polity/historical-background-1773-1947"
import chapter6 from "../../content/data/study/polity/making-of-the-constitution"
import chapter7 from "../../content/data/study/polity/parliament"
import chapter8 from "../../content/data/study/telangana/telangana-statehood-movement"
export const CHAPTERS: Record<string, StudyChapter> = Object.fromEntries([chapter0, chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8].map(chapter => [chapter.slug, chapter]))
