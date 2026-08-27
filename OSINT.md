[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

Full OSINT notes are available from here, heck out this [[ [☕ Membership](https://buymeacoffee.com/notescatalog/membership|link]])

You can also access the FREE OSINT course from [here](https://buymeacoffee.com/notescatalog/e/285114)

### What is OSINT
OSINT stands for open source intelligence and it's the process of gathering information about the target's system, network and defenses without engaging it directly. In other instances, the target may be an individual or a group of individuals.

OSINT includes data from publicly available sources, such as DNS registrars, web searches, social media, security-centric search engines like Shodan and Censys. 

Another type of open source intelligence is information about vulnerabilities and other security flaws, including sources like the Common Vulnerabilities and Exposures (CVE) and
Common Weakness Enumeration (CWE) resources.

**Examples of information that can be gathered during an OSINT engagement**
- Domain names and subdomains
- IP Address ranges
- Email addresses
- Physical locations
- Staff list and organization chart.
- Documents' meta data.
- Social media information
- Technologies and infrastructure.

### OSINT Stages
#### Planning
An analyst should identify their investigative needs, lay out the questions they are trying to answer, and note any unique circumstances that may arise because of the target, the situation, or the platforms that might be used during the planning and direction phase of the OSINT intelligence cycle.

**What question(s) need to be answered?**
As part of the investigation, write down any questions that need to be answered. Refrain from deviating from the main topic in order to prevent spending unnecessary time on side projects. 
Sub-questions like "What is their name?," "What country are they in?," "What is their approximate age?," and "Are they on any other platforms?" could be included in the main inquiry of "Who is behind this account?" 

**What platform(s) that need to be accessed?**
Before starting the investigation, make sure you purchase any additional software or hardware and set up any necessary online accounts.

It might not be feasible to ascertain a target's preferred platforms at first. On the other hand, based on the target's currently available information, it is usually a good idea to try and discover potential platforms and any requirements needed to access them. 

The majority of popular social media sites will have similar requirements, which typically include an account and sometimes an email or phone number for validation. But, if you're looking at a platform where there's a small, close-knit community that keeps to themselves and is wary of outsiders, they can have higher standards for new members. 

Before enabling new members to join, certain groups require new members to be vetted by an existing member, which will need more setup and preparation.

**Know your target**
It's critical to evaluate a target's technical capabilities and whether this could make you more likely to be discovered throughout the course of the investigation. 

A target's likelihood of making technical errors may also be inferred from their level of technology competence. Answers to questions like these aren't always available at the planning phase, but they might become more apparent as the intelligence cycle progresses. 

Although it never hurts to assume that a target possesses sophisticated technological abilities, not every analyst will be able to take state actor level security measures for every target. Generally speaking, I advise being more cautious than a target seems to be technically capable of being.

**Have your goals set-up**
Write down your realistic expectations and goals for the investigations. What is the investigation's anticipated conclusion? Will it lead to a formal report, a notification to the authorities, or another outcome? 

The OSINT inquiry will be guided more effectively if the end goal is known in advance. Determining the final objective or goals helps steer an investigation in the right direction and will aid with decision-making in subsequent phases where the investigation may depend on the end goals.

Example Goals of an OSINT case include full profile, locate for apprehension, identify associates, collect digital evidence, etc. (are you collecting intel or evidence for court?).

### Data Collection
**No Personal Accounts During OSINT**
One would think that by now this wouldn't need to be said again, but personal accounts are still used by investigators—even professionals—for OSINT investigations. It is always advised to avoid using a personal account for an OSINT investigation, even though each person has their own unique threat model.

Furthermore, a lot of data is collected by apps and social networking sites that can be utilized to identify and link persons across several accounts. Use virtual computers, specialized hardware, or a VPN service wherever possible to make sure you are not connected to any other accounts. Keep all interactions between your genuine accounts and OSINT accounts to a minimum. 

By taking these precautions, you reduce the possibility of making more errors or overlooking something important, such forgetting to switch LinkedIn viewing mode to private or inadvertently clicking "like" on a target's post while browsing through their feed.

***Tips for creating your investigative accounts***
1. Avoid VPNs during account creation, most of their IP ranges are flagged.
2. Dynamic IP devices work quite well for account creation and cellular data connections as well.
3. Public networks (Starbucks Wi-Fi) but be aware that you are being exposed and cross-correlated with other users on that network.
4. A real non-VOIP phone number will save you a lot of hassle.
5. We usually make FB, IG, and Twitter at once and tie them in as one covert profile. Each adds depth and veracity to the others (intentional cross correlation).
6. Keep notes on your covert details either in a paper notebook or a digital format like a password manager orspread sheet, having your security requirements in mind.
7. If it is a sensitive or deep infiltration case make sure to compartmentalize this profile from the get-go (connection, browser, device (use VM to isolate), etc.).
8. Another technique is to get a free tier AWS EC2 or Digital Ocean VM and use it to make the account as then you will have an AWS IP, this is more advanced but works pretty well if you are comfortable with VMs and learning to navigate AWS. Some groups even run full investigative VMs on AWS, but again this is a more advanced setup that takes some work to sort out.
9. No Gmail, Hotmail, yahoo, or other top free mail.
10. Private domains work best, grab a Namecheap or GoDaddy domain and webmail for cheap and make a bunch of account with them.
11. Sudomail and Protonmail addresses work ok, not as good as a private domain though
12. You might get lucky and not get the phone number requirement, but also sometimes it won’t require it at first but then a couple hours or days in it will throw it at you as a security requirement. Follow below tips for phone number usage:
```
No VOIP – most number blocks are flagged and Mint test kits and an unlocked phone are a cheap way to get 7 days on a real number

a. Make sure you have Mint coverage in your area
b. https://www.amazon.com/Mint-Mobile-Starter-Verify-Compatibility/dp/B0786RD524 ($5 for
two sims)
c. You might then port the number over to google voice
d. Some groups buy these in bulk
e. You can also use an extra # on a real account (i.e.: Verizon) and then port it over to google voice and then draw a new # for that Verizon account
f. Some people will also use hotel phones and the like when traveling to roll accounts, but that is kind of
```
13. Once we get into our new account, start making it feel real right away
14. Choose a name that is generic, but not too generic
15. Name, gender, city, employer (school) should make sense, remember a real person at FB will likely look at your profile if it is reported as suspicious, we want to pass the smell test
16. Join Groups – anything that has large groups that accept anyone.
17. If you are doing a deep infiltration you may have to research your targets groups, don’t join her/his groups directly, join similar and work your way in slowly after you have some history.
18. Do some liking and commenting in groups for a day or two then https://www.facebook.com/find-friends/browser/ and let FB recommend friends. We never cold call friends anymore, we let FB tell who it’s already cross correlated with our profile. This reduces chances of getting flagged significantly.
19. Avoid political chat and comments. Politics and social issues are high on the radar of the FB watchdogs due to the fake news and voter tampering concerns.
20. Keep track of covert accounts in a spread sheet or better yet a password manager.
21. Sim jacking Twitter accounts is very popular so use long passphrases even on your sock accounts and consider 2-factor if they are mature or otherwise valuable accounts.
22. Be cautious when using stock images as some social media algorithms can detect their use, potentially leading to account suspension or scrutiny.

**Save First and Analyze Later**
 Save whatever you uncover that is pertinent to the investigation, then carry on. If you are worried that you will forget something later, it is acceptable to star or quickly note it; nevertheless, save the actual analysis for the time when all the pertinent data becomes accessible. Include a data point if there is any doubt as to its value for the research.
 Use note taking apps to save collected data. Set up your note-taking and data collection to track your work - paper notebook, One-Note, Hunch.ly, directory on encrypted flash drive, etc.
 **Start with Broad Search Then Narrow Down**
 When gathering information, I usually search platforms or search engines more than once. With fewer or no keywords or search constraints at first, and then additional ones as needed, each pass becomes increasingly limited or filtered down compared to the previous one. Never start a search with too few results because they can miss important results that aren't exact matches. Extend your search and give it another go if the quantity of results is excessively low or if anything you expected to find appears to have been missed. It is much better to sort through false positives than to lose important information due to a false negative.
 
  ### Data Processing 
 We can summarize this stage of OSINT into the following tips:
 - Translating, decoding, or decrypting collected data into a format that is comprehensible to humans is the analyst's responsibility. Get the content of videos and other media transcribed so the analyst may skim it for names, keywords, and so on without having to watch the full video or audio clip. 
 - Since not all of the data that was initially gathered will be relevant for analysis, one goal of the processing phase is to minimize the quantity of raw data that is sent to the analyst. Just 10–20 relevant tweets may be found among a target's 10,000 tweets in a csv or pdf file. When at all feasible, remove all extraneous information and just keep the pertinent information. Reducing the amount of data or sources the analyst needs to sift through can also be accomplished by grouping comparable or relevant intelligence into a single PDF or spreadsheet. This makes it possible for an investigator to undertake analyses without having to go through a plethora of extraneous material or open numerous papers pertaining to pertinent intelligence.
 - The raw acquired intelligence may be viewed by analysts, and it should be kept available to them in case they have any queries or want to make sure the translation and transcription are accurate. To facilitate later searches, make sure your files and folder hierarchies have descriptive naming conventions.
 - The intelligence acquired during the gathering stage could have date or time information that makes it possible to plot the data on a timeline. Placing relevant intelligence in a timeline aids with tracking major events and may assist in showcasing overall activity and the relationships between events that would otherwise not be discernible due to intelligence gaps. A chronology also aids in approximating a time and date for other events that may not have initially included such information by cross-referencing the known sequence of events.
### Data Analysis
After we gathered the data, filtered out the non-relevant intelligence and sorted the required info, its time to analyze the findings.
- Analyzing the processed intelligence to address the questions raised in the planning stage and any other newly raised problems is a significant portion of the analysis and production phase. When creating your analytical product, utilize these questions as a guide to stay on task and avoid becoming bogged down in irrelevant details.  Providing answers to these questions will also help you format and divide your analytical work into sections that make sense. 
- While an investigator will provide all of the information they are aware of during the analysis and production phase, they should also specifically identify any pertinent intelligence gaps, including any unresolved questions. Identifying the intelligence gaps aids in determining what further needs to be researched and what questions need to be answered before the next intelligence cycle is completed. 
- Because not all intelligence is created equal, you should always take into account the validity, relevance, dependability, and potential bias of the information you have gathered. When providing the best and most comprehensive information possible, an OSINT intelligence analyst may need to note any background information that could imply the intelligence under analysis is not entirely reliable. In order to give your audience background information about your intelligence sources and their potential for bias or credibility, try to prioritize these specific categories in relation to your intelligence product. Regarding your analysis, keep in mind the possibility of misinformation and disinformation efforts as well.
- Not all data must be presented at a granular level. High-level information, like patterns and trends, can be presented visually to provide readers a "quick glance" at information that, if presented in its totality, would take up too much space in your intelligence product. For those who would like to view the raw data, the entire set can be found in an appendix. However, most people who use the intelligence product are typically more interested in the big trends or patterns than in the specific data points. Ultimately, the analyst's responsibility is to combine the data and provide it in a readable format.
### Dissemination and Distribution
This stage involves distributing an analytical product in its final form for consumption by others. Remember that this does not imply that the analysts may just go on to their next task and that the intelligence cycle finishes here.

- Bottom Line Up Front: This succinct synopsis should include all of the product's salient features and demonstrate to readers why they should be interested in it. This is the part where you "sell" your target audience on the advantages this document will offer them, as well as the reasons they should open and read it.  

Remember that you are fighting for the time of many in your target audience who probably obtain their intelligence from multiple analysts and sources. If you are unable to persuade your intended audience to really open the intelligence product, they might not give it enough time to be reviewed or provided with feedback.

- Redact and mask sensitive and personal data.

### OSINT Suites, Frameworks & Other Tools
- **OSINTframework**
```
https://osintframework.com/

https://map.malfrats.industries/
```
- **Vortimo Extension**
Vortimo is a collection of OSINT tools packed in a browser extension. 
It allows you to do the following:
- Reverse image search on images using Yandex/Google/Bing/TinEye.
- Exif on images using Vortimo’s own online Exif viewer.
- Find old instances of the pages you’re on using WayBack machine and other tools.
- Find pages that use the same tracking codes using BuiltWith and other tools.
- You can extract names, email addresses, phone numbers, hashtag, alias, GPS coordinates, IP address and others from the page.
Link of the tool is below
```
https://www.osint-tool.com/
```
- **EPIOS**
This tool allows you to extract all social media and other online accounts starting from an email address or phone number. Signing up may be required.
```
https://epieos.com/
```
- **IntelligenceX**
This tool built by an independent European technology company allows you to perform all sorts of searches starting from a domain name, IP, Bitcoin address, URL, Email and usernames.
```
https://intelx.io/
```
- **Worldwide OSINT tools map**
Global overview of phonebooks, cadastral maps, venicle numbers databases, business registries, passengers lists, court records and much more.
```
https://cybdetective.com/osintmap/
```
- **SearchSystems** (Works mainly in the US)
Finding public record information online in over 70,000 databases organized by type and location to help you find property, criminal, court, birth, death, marriage, divorce records, licenses, deeds, mortgages, corporate records, business registration, and many other public record resources.
```
https://publicrecords.searchsystems.net/
```
- **192.com** (mainly works in the UK)
Searching for someone's address in the UK, phone number and who they live with according to electoral rolls.
```
https://www.192.com/
```
- **Hunchly (free trial 30 days)**
Hunchly is a browser extension that automatically collects, documents, and annotates every web page you visit. 
Hunchlycreates a transparent audit trail for your online investigations.
```
https://hunch.ly/
```
- **RedHunt Labs Online IDE Search**
This Custom Search Tool by @RedHuntLabs Team looks for keywords/strings in following Online IDEs, Paste(s) sites and Code Sharing Platforms.
All you have to do is provide a keyword/string and the tool will list all links in paste sites containing this keyword.
Very useful if you want to search through pastebin.com using a keyword.
```
https://redhuntlabs.com/online-ide-search
```
- **Pasta**
Pasta is a python 3 tool which performs PasteBin scraping without the use of PasteBin's scraping API. This makes Pasta free and doesn't require an acccount making it suitable for everyone.
It is not as powerful as the PastaBin scraping API but should suffice with providing enough information to look for usernames, passwords, emails, IP addresses and maybe more.
***Install and Download***
```bash
git clone https://github.com/Kr0ff/Pasta

cd pasta

chmod +x pasta.py

./pasta -h
```
***Help Menu***
```python
 ______ _______  ______ _______ _______
(_____ (_______)/ _____|_______|_______)
 _____) )______( (____     _    _______
|  ____/  ___  |\____ \   | |  |  ___  |
| |    | |   | |_____) )  | |  | |   | |
|_|    |_|   |_(______/   |_|  |_|   |_|

ver: 0.3


usage: pasta.py [-h] [-s] [-r RANGE_STR] [-c CHECK] [-g] [-d] [-e] [-u USERBIN] [-p PAGE] [-f FILE] [-t THREADS]

Pasta - A PasteBin Scraper

optional arguments:
  -h, --help            show this help message and exit
  -s, --search          Search PasteBin with a set of strings
  -r RANGE_STR, --range_str RANGE_STR
                        How many strings to generate
  -c CHECK, --check CHECK
                        Check contents of a specific PasteBin entry
  -g, --get_archive     Get most recent PasteBin archive
  -d, --scrape          Scrape the most recent archive and save each Pastebin
  -e, --sensitive       Search for sensitive info from downloaded Pastebins
  -u USERBIN, --userbin USERBIN
                        Retrieve the PasteBin posts of a user
  -p PAGE, --page PAGE  Page number of user's PasteBins
  -f FILE, --file FILE  Search PasteBin with a set of strings
  -t THREADS, --threads THREADS
                        How many threads to use
```
***Usage Examples***
Scrape the most recent archive of PasteBin.
```python
./pasta.py -d -t 22
# -t: setting number of threads
```
Look for sensitive information in downloaded pastebins [emails, usernames, IP addresses]
```python
./pasta.py -e
```
Retrieve all pastebins of user's account from all available pages
```python
./pasta.py -u username -p 5 -t 22
# -p: specifying the page number
```
***Similar tools to pasta***
```
https://github.com/gnebbia/sniff-paste
```
### OSINT Resources & Websites
```
https://www.bellingcat.com/
https://www.osintdojo.com/resources/
https://start.me/p/Pwy0X4/osint-inception
https://start.me/p/rxRbpo/cti
https://github.com/hslatman/awesome-threat-intelligence
https://www.osintessentials.com/
https://github.com/hgascon/security-datasets
https://wiki.theosintion.com/
https://hatless1der.com/
https://sector035.nl/
https://www.secjuice.com/tag/osint/
https://inteltechniques.com./
```
