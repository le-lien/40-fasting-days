Fasting & Prayers Website

Git repo:
https://github.com/le-lien/40-fasting-days.git

How to open the website

1. Open this folder:
   D:\40_days_fasting_prayer

2. Double-click index.html.

3. The website will open in your browser.


How to update the website after changing text files

Use this whenever you edit any file named day01.txt, day02.txt, day03.txt, and so on.

1. Save your changes in the text file.

2. Double-click this file:
   Update Content Data.bat

3. A black command window will open.

4. Wait until it says:
   Done. You can refresh index.html in your browser now.

5. Press any key to close the black command window.

6. Go back to the browser and refresh the page.


What the batch file does

Update Content Data.bat rebuilds content-data.js from the day01.txt through day40.txt files.

This is needed because the website reads from content-data.js when you open index.html directly from the folder.


Important notes

- Do not edit content-data.js by hand.
- Edit the day text files instead.
- After editing any day text file, run Update Content Data.bat again.
- If you upload changes to GitHub, include the updated content-data.js file too.
