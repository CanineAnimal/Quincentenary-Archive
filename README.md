# Quincentenary-Archive
For archiving threads on the Forum 7 board that reach the maximum page limit.

Maintained by CanineAnimal (The Ice States on NationStates).

Archives prior to August 2022 are obtained from ["Project Langolier-Proofing"](https://www.nationstates.net/page=dispatch/id=1543370), created by the amazing Valentine Z.

The build can be accessed [here](https://canineanimal.github.io/Quincentenary-Archive/pages/).

Please note that this repository only contains source code. The actual archives, except for the JSON Archive, are in the repository ["QA-Archives"](https://github.com/CanineAnimal/QA-Archives). Archives prior to mid-2022 may be woefully incomplete.

In addition, while threads will, of course, be archived within seven days, threads are uploaded to QA-Archives in batches whenever I feel like it. That a thread is not uploaded does not necessarily mean that I have not saved it -- feel free to ask me if you want to know whether I have saved a thread.

This repository also contains [The Martial Repositories](https://canineanimal.github.io/Quincentenary-Archive/martialarchives/pages), for saving threads in the various roleplay boards (N&IR + P2TM). The criteria for a thread to be saved for the Martial Repositories is less stringent than for the Quincentenary Archives; I am happy to archive a thread regardless of whether it has been finished, as long as the roleplay is substantial; for example, godmoddy one-liner roleplay will not be archived, nor will two posts with no substantial storyline; and more than one player has posted in the thread. Archival requests are also subject to my own discretion.

## Saving a Page

1. When an NS Forum 7 thread hits 500 pages, the save.py script: https://github.com/CanineAnimal/Quincentenary-Archive/tree/main/src
2. Upload saved artifacts to this repository: https://github.com/CanineAnimal/QA-Archives
3. Go to the archived version of the thread on the website (https://htmlpreview.github.io/?https://github.com/CanineAnimal/QA-Archives/blob/main/SHORT NAME OF THREAD/0.html), Ctrl+Shift+I and run this: https://github.com/CanineAnimal/Quincentenary-Archive/blob/main/src/jsongenerator.js, a textarea with code will be generated.
4. Copy-paste the code generated in Step Three into this: https://github.com/CanineAnimal/Quincentenary-Archive/blob/main/pages/quincentenaryarchive.json