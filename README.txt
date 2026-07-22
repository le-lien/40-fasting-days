Fasting & Prayers Website

Git repo:
https://github.com/le-lien/40-fasting-days.git

How to open the website

1. Open this folder:
   D:\40_days_fasting_prayer

2. Double-click index.html.

3. The website will open in your browser.


Text file names

Use these file names for each language:

- English:
  day01.txt, day02.txt, day03.txt, and so on

- German:
  day01_de.txt, day02_de.txt, day03_de.txt, and so on

- Vietnamese:
  day01_vn.txt, day02_vn.txt, day03_vn.txt, and so on

The website has flag buttons for English, Deutsch, and Vietnamese.

When you change languages, the day title changes too:

- English: Day 1, Day 2, Day 3
- German: Tag 1, Tag 2, Tag 3
- Vietnamese: Ngày 1, Ngày 2, Ngày 3

The page title also changes:

- English: 40 Days Fasting & Prayers
- German: 40 Tage Beten & Fasten
- Vietnamese: 40 Ngày Cầu Nguyện & Kiêng Ăn


How to update the website after changing text files

Use this whenever you add or edit any English, German, or Vietnamese text file.

1. Save your changes in the text file.

2. Double-click this file:
   Update Content Data.bat

3. A black command window will open.

4. Wait until it says:
   Done. You can refresh index.html in your browser now.

5. Press any key to close the black command window.

6. Go back to the browser and refresh the page.


What the batch file does

Update Content Data.bat rebuilds content-data.js from these files:

- day01.txt through day40.txt
- day01_de.txt through day40_de.txt
- day01_vn.txt through day40_vn.txt

This is needed because the website reads from content-data.js when you open index.html directly from the folder.


Important notes

- Do not edit content-data.js by hand.
- Edit the day text files instead.
- After editing any day text file, run Update Content Data.bat again.
- If you upload changes to GitHub, include the updated content-data.js file too.
