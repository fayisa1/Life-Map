Life Map PWA (v32: adhan list, alert sounds, notifications)

DEPLOY
1. Upload this whole folder to any https host (GitHub Pages, Netlify Drop, Cloudflare Pages).
2. Open the https link in Chrome on Android, then menu > Install app.
3. Use the same link every time: your log is stored per link. Back up before moving to a new link.
4. After you edit any file, change V='lifemap-v33' in sw.js (e.g. v33) so phones pick up the update.

ADHAN LIST
- Settings > Adhan sound: pick one adhan for all prayers and another for Fajr, press Preview.
- The list is adhans.json plus the files in the adhan folder. To add one: copy the mp3 into
  the adhan folder, add a line to adhans.json ({"id":"x","name":"Name shown","file":"adhan/x.mp3"}),
  and change the version in sw.js.
- "Add my own file" lets you pick a recording from the phone (stays on that phone only).
- Use only recordings you have the right to use.

ALERTS AND NOTIFICATIONS
- Alert sounds: built-in tones plus the files in the sounds folder (listed in sounds.json). To add one, copy the mp3 into sounds, add a line to sounds.json, and change the version in sw.js.
- Settings > Prayer calculation and alerts: pick an alert sound, volume, press Preview.
- Tap Allow notifications, then Test alert.

PHONE CLOCK ALARM (closed app)
- Settings > Streak, install and alerts > pick a prayer > Set a phone Clock alarm. It opens the Clock app with the next time for that prayer (Android only, one alarm per tap).

IMPORTANT LIMITS (Android / Chrome)
- Sound needs one tap on the page after the app is opened.
- A web app cannot wake itself once Android has closed it. Turn on
  "Stay ready in the background" and "Keep the screen on" for best results, and
  use "Prayer alarms to calendar" for a guaranteed Fajr alarm.
- Notification sound when the app is not playing its own is chosen by Android:
  Settings > Apps > Chrome (or Life Map) > Notifications.

QUOTE POLICY
- The quote list now holds only items checked for authenticity (Quran, or hadith with collection, number and grading) with the Arabic matched to the source and the English matching a named published translation word for word. Anything marked "translation mine", paraphrased, or from a source that could not be verified was removed. Keep a record of what you add and check it before adding.

ADDING QUOTES
- Open quotes.json in any text editor and add an entry. Keep the commas and brackets exactly:
    {"en":"The quote in English","ar":"Arabic text (optional, can be empty)","src":"Source"}
  Put a comma between entries, and no comma after the last one.
- Start src with "Quran" or "Hadith" to place it under those filters (e.g. "Quran 94:6", "Hadith, Bukhari").
  Anything else appears under Companions and scholars.
- Upload the new quotes.json. No version change needed: open the app twice to see the new quotes.
- Quotes with the same first 50 letters as an existing one are skipped.
- You can also add a quote on the phone with "Add my quote" (stays on that phone only).

CHARTS AND FINANCE ANALYSIS (Insights tab)
- Every branch (and General) now has: a 30-day chart you can switch between Bars, Line and Heatmap;
  weekly progress; a habit grid; best days of the week; a 13-week heatmap; and branch measurements
  (Faith: on-time rate per prayer and by group; Family: contacts per week by type;
  Fitness: water and exercise minutes against goal). General adds a four-branch radar and weekly rings.
- Finance tab: income vs spending (week or month bars), cash flow and budget pace with a projection and
  "safe to spend per day", where the money goes with change vs the previous period, the 50/30/20 rule
  (tap a category to set need / want / giving), income sources, spending by weekday, savings runway and goal,
  an optional zakat estimate, a money health score, and CSV export.
- Settings > Daily trackers has new fields: savings balance, savings goal, emergency fund target (months),
  zakat nisab value (optional). Finance charts work without them; runway, goal and zakat need them.


HISN AL-MUSLIM (Learn tab)
- Data is in hisn.json (129 chapters, 261 duas: Arabic, transliteration, English, notes, repeat counts).
- Learn > Open Hisn al-Muslim: quick access, chapter index, search (Arabic, transliteration or English), favourites, tap counters (reset daily), text size and show/hide options under Aa, swipe or Prev/Next between chapters.
- To correct text, edit hisn.json (parts are [kind,text] with kind ar, tr, en or note) and change the version in sw.js.

DUA REMINDERS (Learn > Open Hisn al-Muslim > bell icon)
- Rules: pick a dua (or a whole chapter) and when it should appear: after you log something (meal, Iftar, any prayer, a single prayer, Witr, Tahajjud, Bedtime kept, Daily quiet), at a prayer time plus a delay, or every day at a clock time.
- Priority: High reminders stay on screen, notify with "require interaction" and repeat every 10 minutes (up to 3 times) until you tap Done or Dismiss.
- Done counts the dua and ticks the matching Faith item (Morning azkar, Night azkar, Dhikr after a prayer).
- Starter set: After eating, Breaking the fast, Morning azkar (30 min after Fajr), Evening azkar (30 min after Asr), Before sleeping (22:00) are on; After prayer, After Witr, After quiet time, Anxiety are off.
- Like the prayer alerts, time reminders need the app open or running in the background on Android.


LEARN: HADITH, TAWHEED, SCHOLARS (v29)
- Three cards in Learn are filled from three files. While a file is empty ([]) its card shows "nothing added yet". Edit the file, upload it, and change the version in sw.js.
- Each card gets a search box and opens section by section. Keep the commas and brackets exactly; no comma after the last item. Every field is optional except the title or name.
- hadith.json (grouped by "section"):
    [{"section":"Intentions","title":"","ar":"Arabic text","en":"English text","src":"Bukhari 1","grading":"Sahih"}]
- Tawheed is now a reader: see TAWHEED READER below (tawheed.json is no longer used).
- scholars.json (one item per scholar, with their books):
    [{"name":"Scholar name","ar":"","era":"d. 751 AH","bio":"Short note","books":[{"title":"Book title","note":"","file":"books/name.pdf"}]}]
- Check every Arabic text and translation against the source before adding, as in the quote policy above.
- Al-Fawaid (Ibn al-Qayyim) was removed from Learn. Add it back as a book under Scholars if you wish.

HADITH COLLECTIONS READER (Learn > Hadith collections; v29, forties added in v31)
- Shows Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i and Ibn Majah: tap a book, then a chapter. Arabic, narrator and English are shown, with a search box per chapter that ignores vowel marks. Chapters load on demand and are saved for offline after first opening.
- The data is NOT included. Build it once on a computer with Python:
    1. Download the repo AhmedBaset/hadith-json (pin a release tag, e.g. v1.2.0).
    2. python3 tools/convert_hadith.py PATH/db/by_book/the_9_books ./hadith --forties tools/hadith_source/forties
    3. Upload the new hadith folder beside index.html and raise the version in sw.js.
- Grading: the AhmedBaset dataset has none, so the four Sunan books take their grades from Jammooly1/hadiths-json-files (see GRADING below). Bukhari and Muslim show a note about the book, not a grade on each hadith.
- The data is scraped from Sunnah.com; check its terms and the translators' rights before sharing the app publicly. Personal use on your own phone is the safe case.
- Not done: search across all books at once (needs a separate index file).


TAWHEED READER (v30, Learn > Tawheed)
- Each book is a list of chapters; tap a chapter to read its segments (Arabic and English, with type and reference), your scholar commentary under the segment it explains, and any numbered commentary points. A search box per chapter ignores vowel marks.
- Add content one chapter file at a time, in the book_metadata + chapter format you already use (segments, plus scholarly_commentary with either "explanations" tied to a target_segment or numbered "points").
    1. Put the chapter files in tools/tawheed_source/ (any file name; book_id groups them into a book; chapter_number or chapter_id gives the order).
    2. python3 tools/build_tawheed.py tools/tawheed_source ./tawheed   (it warns about a commentary that points at a missing segment_id)
    3. Upload the tawheed folder, and raise the version in sw.js.
- Included: Kitab at-Tawheed chapter 1 and Thalathat al-Usool chapter 1.
- Check the Arabic, the translation and every commentary against the printed book or the scholar's published explanation before adding, as in the quote policy above.

- The forty-hadith collections (an-Nawawi 42, Qudsi 40, Shah Waliullah 40) are included, under a "Forty Hadith" heading in the same card. Their source files are in tools/hadith_source/forties. Each has one chapter, so it opens straight to the hadith.
- The card "My hadith" is the separate list you fill yourself in hadith.json.

GRADING (v32)
- Run: python3 tools/convert_hadith.py PATH/db/by_book/the_9_books ./hadith --forties tools/hadith_source/forties --grades-src FOLDER_WITH_THE_4_JAMMOOLY_FILES
- The Jammooly1 files are: sunan_abi_dawud.json, jami_at_tirmidhi.json, sunan_an_nasai.json, sunan_ibn_majah.json.
- Whose grades: Abu Dawud = Al-Albani. Tirmidhi, Nasa'i and Ibn Majah = the Darussalam edition (not Al-Albani). The badge always names the source. Scholars sometimes differ on a ruling.
- The two datasets number hadith differently, so grades are matched by the Arabic text (then English), not by number. Unmatched or conflicting ones get no grade. See hadith/grading_report.txt for the counts.
- Colours: green = Sahih or Hasan, amber = Da'if, red = Maudu', Munkar or Shadh; grey = anything else (e.g. Maqtu', a statement of a follower). About 300 Abu Dawud grades are qualified rulings written only in Arabic by Al-Albani (e.g. 'Sahih except one phrase'); they are shown as written, in grey, with the abbreviations he uses (ق = Bukhari and Muslim, خ = Bukhari, م = Muslim).
- Bukhari and Muslim: no per-hadith grade; the book note says it was compiled on the condition of authenticity and accepted by the scholars. Please review that wording.

v33 — Fasting calendar, Jumu'ah, forty-hadith quotes
- forty_quotes.json: 43 Sahih/Hasan hadith from An-Nawawi's Forty, Hadith Qudsi (Forty) and Shah Waliullah's Forty,
  shown in Today's quote under the "Hadith" tab (each with collection and grade). Rebuild: python3 tools/build_forty_quotes.py
- sunnah.json: evidence (Qur'an, hadith with grade) for every fasting ruling and Friday act. Rebuild: python3 tools/build_sunnah.py
- Today > "Fasting & Jumu'ah": Hijri-based fasting status (wajib Ramadan; qada owed; sunnah Mon/Thu, white days 13-15, Shawwal six,
  Arafah, Dhul-Hijjah 1-8, Tasu'a/Ashura, Sha'ban; not allowed: Eids, Tashreeq; better to avoid: Friday alone, 1-2 days before Ramadan).
- Scoring: Ramadan fast counts as a daily item only on Ramadan days (Excused = not counted, adds to qada); make-up fast is weekly while owed;
  Jumu'ah is weekly and can be set N/A (woman / traveller); Friday sunnahs (ghusl etc., Kahf, salawat & dua) are weekly items.
- Priority reminders: appear in the Now list and as banners while the app is open (settings on the card).
- Hijri dates are calculated; confirm Ramadan and Eid by local moon sighting.

v34 — Names of Allah
- names.json (from tools/names_source.json via tools/build_names.py): Learn > Names of Allah (search, mark learned) and Today > Name of the day. The unsourced 'virtue' lines were left out on purpose.

v35 — Quran (Mushaf) reader
- Learn > Quran (Mushaf): 604-page Madani layout (QPC V1 glyphs), swipe/buttons, go to page/surah/juz, bookmarks, last page remembered.
- Needs two folders next to index.html (too big for the app zip, shipped as mushaf-qpc1-assets.zip): mushaf/QPC1/page-001..604.json and
  fonts/QPC1/p001..p604.woff2 + QPC1BSML.ttf. Data/fonts from github.com/zonetecde/mushaf-layout (branch v2). mushaf/index.json is included in the app.
- Pages and fonts are cached by the service worker as you read them (first view of a page needs internet unless the files are bundled).
- The QPC fonts are the King Fahd Complex's; the repo notes complete redistribution terms are not bundled: fine for personal use, check before publishing.
- tools/build_mushaf_index.py rebuilds mushaf/index.json.
