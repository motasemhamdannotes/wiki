🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Get the full BUH BOUNTY PACK in PDF [here](https://buymeacoffee.com/notescatalog/e/528934)

## Your Path to Bug Bounty Hunting
### How to Choose and Master Your First Vulnerability

A great first choice is **Cross-Site Scripting (XSS)**. Why?
- It's one of the most common web vulnerabilities.
- It appears in many different forms (reflected, stored, DOM-based).
- Learning to find it teaches you a ton about how websites process user input and how browsers render content.

Another solid option is **Insecure Direct Object References (IDORs)**, which will teach you about access control and how applications handle user-specific data.

**Let's stick with XSS for this example.** Here’s a structured way to master it:
#### Step 1
Forget aimlessly hunting for a bit. Your primary goal is to understand XSS inside and out. The single best free resource for this is **PortSwigger's Web Security Academy**.

1. **Go to the Cross-site scripting section.**
2. **Read the theory.** Understand what XSS is, the difference between reflected, stored, and DOM-based XSS, and the concept of "contexts" (HTML, attribute, JavaScript, etc.).
3. **Solve the labs.** This is non-negotiable. Do every single lab. The `Apprentice` and `Practitioner` level labs will build your foundation. The `Expert` labs will show you how to bypass filters and use advanced techniques.

This focused practice is the `how` you're missing. It will give you the hands-on experience in a controlled environment where you _know_ a vulnerability exists. This builds confidence and pattern recognition.

#### Step 2
Now, let's connect this back to your recon.

1. **Choose a Program:** Pick a bug bounty program with a broad scope (e.g., a `*.example.com` target).
2. **Run Your Recon:** Do your usual subdomain enumeration with `subfinder` and `httpx`.
3. **Analyze the Output:** Instead of just taking screenshots, look at your list of live domains from `httpx`. Which ones look interesting?
    - Are there any with old-looking titles? (e.g., "Login Portal," "Admin," "UAT," "Test")
    - Which ones have a lot of user-interactive features like search bars, forms, profiles, or comment sections? These are prime targets for XSS.
4. **Manual Inspection is Key:** Pick one or two interesting subdomains and explore them manually. Click every button. Fill out every form. Look at the URL parameters.
5. **Start Hunting for XSS:**
    - **Find Input Points:** Where can you enter data? Search bars, contact forms, username fields, URL parameters (`?q=`, `?id=`, `?redirect_url=`), etc.
    - **Test for Reflections:** Enter a simple, non-malicious string like `cybertest`. Now, look at the page source (`Ctrl+U` or `Cmd+U`). Is your string reflected anywhere?
    - **Understand the Context:**
        - If it's reflected inside an HTML tag like `<h1>cybertest</h1>`, try injecting a simple payload: `<h1><script>alert(1)</script></h1>`.
        - If it's inside an attribute like `<input value="cybertest">`, you might need to break out of the attribute: `"><script>alert(1)</script>`.
        - If it's inside a JavaScript block like `<script>var query = "cybertest";</script>`, you'll need a different payload to break out of the string: `";alert(1)//`.
    - **Check Your DevTools:** Open the browser's developer tools (F12). The **Console** will show you any errors, and the **Network** tab will let you inspect the requests and responses. The **Elements** tab shows you the live DOM, which is crucial for finding DOM XSS.

### Sample Workflow
A more effective workflow that goes beyond just recon:

1. **Recon Phase (Your current workflow):** Enumerate subdomains (`subfinder`), find live hosts (`httpx`).
2. **Triage Phase (The missing link):**
    - Use tools like `gospider` or `katana` to crawl the live hosts and find endpoints/parameters.
    - Manually review the output. Look for parameters with names like `?next=`, `?redirect=`, `?url=`, `?q=`, `?search=`, `?id=`. These are hints!
    - Manually browse the top 5-10 most interesting-looking applications you found. What do they do? How do they work?
3. **Focused Manual Testing Phase (The "Real" Hacking):**
    - Pick **one** application and **one** vulnerability class (e.g., XSS).
    - Test every input point on that application for that specific vulnerability. Use the knowledge you gained from PortSwigger.
    - Take notes on what you tried and what the outcome was. This is crucial for learning.

### How Do You Know You're on the Right Path?
You're on the right path when you can answer "why" you're doing something.
- **Instead of:** "I'm running `subjs` because the workflow told me to."
- **It becomes:** "I'm running `subjs` to extract JavaScript files. I'll then manually read these files to find interesting API endpoints, developer comments, or client-side logic that might lead to a vulnerability like DOM XSS."

**Success isn't just finding a bug.** Success is understanding _why_ a payload worked or _why_ it didn't. When you can explain the context of a reflection and why a specific payload is needed, you've "got it."

## Report Writing
Most learning material in offensive security concentrates heavily on discovering vulnerabilities, yet comparatively little attention is given to the discipline of documenting findings effectively. This imbalance creates a major skill gap, because the ability to discover vulnerabilities alone does not guarantee recognition, reward, or professional credibility. The value of a vulnerability is not realized until it is clearly communicated in a format that enables reproduction, validation, and remediation.

A well-written bug bounty report directly accelerates the triage workflow. Security analysts responsible for vulnerability validation process large volumes of submissions daily, often under strict operational timelines. When a report lacks clarity, contains incomplete steps, or presents technical findings without structure, the analyst must spend additional time interpreting intent, reconstructing missing details, and attempting multiple reproduction paths. This slows resolution cycles and frequently results in unnecessary communication loops between researcher and triage team. Conversely, when a report is structured logically, includes reproducible instructions, and clearly explains impact, triage teams can validate the issue quickly and progress toward remediation without delay. This efficiency significantly reduces friction and shortens response timelines.

High-quality reporting also influences financial outcomes. Reward increases typically occur through three separate mechanisms. First, when reports are complete and self-contained, the researcher spends less time responding to clarification requests and more time identifying new vulnerabilities. This increased productivity naturally improves overall earnings potential. Second, many bug bounty programs provide discretionary bonuses when reports help engineering teams rapidly identify root causes or reduce debugging time. Third, structured reporting improves the likelihood of securing reward eligibility in duplicate scenarios. Many programs award bounties only to the first submission that demonstrates reliable reproduction. If a duplicate report arrives earlier but lacks reproducible steps, a later but fully validated report may still be rewarded.

Professional reputation is also heavily influenced by reporting quality. When reports are publicly disclosed after remediation, they serve as technical proof of capability. These disclosures function as a professional portfolio, demonstrating not only technical discovery skills but also communication discipline and engineering awareness. In hiring contexts, the ability to show real-world vulnerability documentation carries significant weight, particularly when compared to candidates who can only demonstrate theoretical knowledge.

---

### Structural Foundations of Effective Bug Reports

Effective vulnerability documentation relies fundamentally on structure. The organization of information determines whether the recipient can easily interpret the vulnerability lifecycle from identification to exploitation. Poor structure introduces ambiguity, while structured reporting creates clarity and traceability.

Before submitting any report, the central evaluation question should be whether the document can be followed without external explanation. A reliable method for validating clarity involves re-reading the report from the perspective of someone unfamiliar with the application. Any location that introduces confusion must be rewritten until the workflow becomes obvious.

Formatting also plays a decisive role. Most modern bug bounty platforms support Markdown rendering, enabling structured presentation of technical material. Without proper formatting, reports containing raw HTTP requests, scripts, or logs appear visually disorganized and difficult to interpret. Code blocks, numbered lists, and headings transform dense technical content into readable technical narratives.

---

### Respecting Scope : A Critical Operational Discipline
One of the most frequent operational failures among inexperienced researchers involves ignoring program scope definitions. Every bug bounty program publishes a formal policy describing permitted targets, prohibited assets, and excluded vulnerability classes. Failing to consult this document leads to wasted effort and damaged reputation metrics.

When a report is submitted, the first validation step performed by triage teams involves confirming whether the asset exists within the defined scope. If the affected system or vulnerability type falls outside permitted boundaries, the submission is immediately closed. Such closures negatively affect reputation scoring and trust metrics.

Reputation metrics directly influence workflow efficiency. On platforms such as HackerOne, high-reputation researchers bypass certain automated filtering stages designed to reduce noise. This privilege results in faster processing, reduced delays, and increased invitation opportunities to higher-value private programs. Maintaining consistent adherence to scope policies therefore functions as both an operational necessity and a strategic advantage.

---

### Impact : The Core of Reward Justification
A vulnerability without a clearly defined impact has limited practical value. The impact section represents the strongest opportunity to demonstrate severity and justify reward magnitude. This section must describe not only what vulnerability exists, but how it affects system security in measurable terms.

For example, if unauthorized access to cloud storage is possible, the presence of sensitive data must be verified. Demonstrating that confidential records exist within the storage environment significantly increases severity classification compared to listing static or publicly accessible files. Similarly, in subdomain takeover scenarios, simply identifying an unclaimed domain is insufficient. Demonstrating successful domain control establishes tangible exploitability and confirms risk validity.

Impact statements should emphasize real-world consequences such as data exposure, account compromise, service disruption, or infrastructure compromise. The objective is to translate technical findings into operational risk language understandable to decision-makers.

---

### Supporting Evidence : Enhancing Reproducibility
Supporting documentation strengthens credibility and simplifies vulnerability validation. Effective support material removes ambiguity and provides verification checkpoints for analysts.

#### HTTP Requests and Responses
Whenever vulnerabilities involve HTTP communication, both the triggering request and resulting response should be included. The most important elements of these interactions typically include:

- Request method
- Target endpoint
- Vulnerable parameter
- Response indicators

Excessively large payload dumps should be avoided unless required for analysis. Only essential components should be included to preserve clarity.

Proper formatting remains mandatory. HTTP messages must be placed inside Markdown code blocks to visually separate them from descriptive text.

Example structure:
```http
POST /vulnerable-endpoint HTTP/1.1  
Host: target.com  
Content-Type: application/json  
  
{"param":"malicious_payload"}
```

---

#### Screenshots
Screenshots function as visual confirmation tools. They are particularly useful when:

- User interfaces contain complex navigation paths
- Vulnerable input locations are not obvious
- Exploitation results produce visual proof

For instance, screenshots demonstrating successful data extraction or unauthorized access provide immediate validation of exploit success.

---

#### Video Demonstrations
Video documentation becomes necessary when exploitation workflows involve numerous dependent steps. Multi-stage vulnerabilities, chained attacks, or conditional behaviors benefit significantly from short demonstration recordings.

Videos should remain concise, structured, and focused exclusively on reproduction sequences. Spoken narration improves clarity when explaining decision logic or intermediate observations.

---

### Maintaining Professional Conduct
Technical expertise alone does not determine long-term success in vulnerability research. Professional communication behavior directly affects reputation stability and triage cooperation.

Disagreements regarding reproducibility occasionally occur due to environmental differences between researcher and analyst systems. When such issues arise, emotional reactions degrade credibility and may result in premature report closure. Maintaining professionalism ensures that disagreements remain technical rather than interpersonal.

Providing additional evidence, such as video demonstrations or environment configuration details, often resolves reproduction conflicts. Maintaining composure during these interactions preserves professional standing and supports long-term collaboration.

---

### The Standard Bug Bounty Report Template
Structured templates dramatically simplify report creation and improve consistency. The following template represents a widely effective format used across multiple professional engagements.

---

### Title

The report title functions as the initial point of context. It must communicate vulnerability type, affected asset, endpoint location, and vulnerable parameter in a single descriptive line.

Example:
**Reflected Cross-Site Scripting on xyz.com via `/search` endpoint using `query` parameter**

This level of specificity allows triage teams to immediately understand the vulnerability classification and scope.

---

### Summary
The summary provides a concise explanation of the vulnerable functionality. It introduces the application feature involved and describes how the vulnerability manifests at a conceptual level.

This section should remain brief while still providing enough context to prepare readers for detailed reproduction steps.

---

### Description
The description section expands technical depth beyond the summary. Complex vulnerabilities often require additional explanation covering underlying logic flaws, parameter manipulation, or security misconfigurations.

Separating summary and description improves readability by allowing fast scanning while preserving technical completeness.

---

### Steps to Reproduce

This section represents the procedural core of the report. Each step must be reproducible without assumptions. Instructions should follow chronological order and include all required parameters.

Example structure:

### Steps to Reproduce:  
  
1. Navigate to https://target.com/login  
2. Enter payload into username field  
3. Submit the request  
4. Observe response behavior

When scripts are used, they must be included:

### Example script used during exploitation  
```python
import requests  
  
url = "https://target.com/api"  
payload = {"input":"malicious_data"}  
  
requests.post(url, json=payload)
```
Every included instruction must be validated by executing the process from beginning to end.

---

### Supporting Material
Supporting evidence consolidates validation artifacts such as:

- Screenshots
- Video demonstrations
- Script files
- Traffic captures

Embedding screenshots directly within Markdown improves readability and reduces context switching.

Example placeholder:

### Supporting Material:  
Screenshot demonstrating unauthorized access.  
  
Script used during exploitation:  
`script content here`

---

### Impact
This section explains the operational risk created by the vulnerability. It must describe measurable damage scenarios such as data exposure, privilege escalation, remote code execution, or denial of service.

Strong impact explanations significantly influence reward classification.

---

### Mitigation (Optional)
Mitigation suggestions demonstrate advanced analytical depth. If the root cause has been identified, recommending defensive solutions can shorten debugging cycles and improve remediation speed.

Typical mitigation recommendations include:

- Input validation enforcement
- Authentication hardening
- Permission isolation
- Patch deployment

Providing mitigation guidance occasionally results in discretionary bonuses due to engineering time savings.

---

### Example Markdown Report Template

#### Summary:  
An introduction to the application's feature and your vulnerability.  
  
#### Description:  
In-depth technical details in case the bug is complex.  
  
#### Steps to Reproduce:  
1. Step 1  
2. Step 2  

Raw HTTP request and response goes here

  
#### Supporting Material:  
Screenshots, video  

script you have used goes here

  
#### Impact:  
Clearly explain how the vulnerability affects the system.  
  
#### Mitigation:  
Optional remediation guidance.

---

### Core Operational Insight
Technical discovery without documentation discipline results in reduced recognition, delayed validation, and diminished rewards. Structured reporting transforms vulnerability discovery into operational impact, financial gain, and professional credibility.

## Bug Bounty Report Sample Template
# Title

## Issue Description

A generic overview of the issue, I usually use the default text from OWASP as it explains the issue well. Include a more specific description of the issue identified within the application.

## Affected URL/Area
- The affected urls or area of the application where the issue exists.

## Risk Rating
- Risk: **Critical / High / Medium / Low / Informational**
- Difficulty to Exploit: **Low / Medium / High**
- Authentication Required: **Yes / No**
- User Interaction Required: **Yes / No**
- CVSS 3.1 Score: [[https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N]]

### Impact
- What kind of attacker could exploit this? (external, authenticated user, admin)
- What access/privileges do they need?
- What can they achieve? (data theft, privilege escalation, service disruption)
- Who else does it affect? (other users, administrators, the organization)

### Attack Scenario
Describe a realistic attack scenario showing how this vulnerability could be exploited in a real-world situation.

## Steps to Reproduce/PoC
A clear outline of the steps required to execute the payload as an attacker, this can include how to setup the payload and launch it.

1. Step one...
2. Step two...
3. Step three...

### Request
```python
POST /endpoint HTTP/1.1
Host: target.com
Content-Type: application/json

{"example": "payload"}
```

### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"result": "response showing vulnerability"}
```

### Screenshots
- screenshot1.png - Description of what it shows
- screenshot2.png - Description of what it shows

## Affected Demographic/User Base
- Explain who this issue affects?
- Is it everyone or just a select amount of users?
- How can this occur in normal usage?
- What is the potential scale of impact?

## Recommended Fix
- How do you fix the issue?
- What is the recommended remediation actions required to successfully fix issue x?
- Are there any quick mitigations available while a full fix is developed?

## References
Include additional reading for the client to further backup the issues explained or elaborate more on other potential issues chained to the one identified.
- [1] [Reference 1](https://example.com/)
- [2] [Reference 2](https://example.com/)

## Bug Bounty Platforms
- [YesWeHack](https://yeswehack.com/)
- [intigriti](https://intigriti.com/)
- [HackerOne](https://hackerone.com/)
- [Bugcrowd](https://bugcrowd.com/)
- [Cobalt](https://cobalt.io/)
- [Bountysource](https://www.bountysource.com/)
- [Bounty Factory](https://bountyfactory.io/)
- [Coder Bounty](http://www.coderbounty.com/)
- [FreedomSponsors](https://freedomsponsors.org/)
- [FOSS Factory](http://www.fossfactory.org/)
- [Synack](https://www.synack.com/)
- [HackenProof](https://hackenproof.com/)
- [Detectify](https://cs.detectify.com/)
- [Bugbountyjp](https://bugbounty.jp/)
- [Safehats](https://safehats.com/)
- [BugbountyHQ](https://www.bugbountyhq.com/)
- [Hackerhive](https://hackerhive.io/)
- [Hacktrophy](https://hacktrophy.com/)
- [AntiHACK](https://www.antihack.me/)
- [CESPPA](https://www.cesppa.com/)
- [BountyHub](https://bountyhub.dev/)

### Bug Bounty Programs
- [123Contact Form](http://www.123contactform.com/security-acknowledgements.htm)
- [99designs](https://hackerone.com/99designs)
- [Abacus](https://bugcrowd.com/abacus)
- [[mailto:security@acquia.com|Acquia]]
- [[mailto:security@activecampaign.com|ActiveCampaign]]
- [[mailto:security@activeprospect.com|ActiveProspect]]
- [Adobe](https://hackerone.com/adobe)
- [[mailto:security@aerofs.com|AeroFS]]
- [Airbitz](https://cobalt.io/airbitz)
- [Airbnb](https://hackerone.com/airbnb)
- [Algolia](https://hackerone.com/algolia)
- [Altervista](http://en.altervista.org/feedback.php?who=feedback)
- [Altroconsumo](https://go.intigriti.com/altroconsumo)
- [[mailto:security@amara.org|Amara]]
- [[mailto:aws-security@amazon.com|Amazon Web Services]]
- [[mailto:security@amazon.com|Amazon.com]]
- [ANCILE Solutions Inc.](https://bugcrowd.com/ancile)
- [Anghami](https://hackerone.com/anghami)
- [ANXBTC](https://cobalt.io/anxbtc)
- [Apache httpd](https://hackerone.com/ibb-apache)
- [[mailto:Infosec@appcelerator.com|Appcelerator]]
- [[mailto:product-security@apple.com|Apple]]
- [Apptentive](https://www.apptentive.com/contact)
- [[mailto:security@aptible.com|Aptible]]
- [Ardour](http://tracker.ardour.org/my_view_page.php)
- [Arkane](https://go.intigriti.com/arkanenetwork)
- [[mailto:whitehat@polarssl.org|ARM mbed]]
- [[mailto:security@asana.com|Asana]]
- [[mailto:support@asp4all.nl|ASP4all]]
- [AT&T](https://bugbounty.att.com/bugform.php)
- [Atlassian](https://securitysd.atlassian.net/servicedesk/customer/portal/2)
- [[mailto:admin@attack-secure.com|Attack-Secure]]
- [[mailto:security@authy.com|Authy]]
- [Automattic](https://hackerone.com/automattic)
- [[mailto:bugs@avast.com|Avast!]]
- [[mailto:vulnerabilities@avira.com|Avira]]
- [AwardWallet](https://cobalt.io/awardwallet)
- [[https://corp.badoo.com/en/security/#send_bid]]
- [Barracuda](https://bugcrowd.com/barracuda)
- [Base](https://go.intigriti.com/base)
- [[mailto:security@basecamp.com|Basecamp]]
- [Beanstalk](https://wildbit.wufoo.com/forms/wildbit-security-response)
- [BillGuard](https://cobalt.io/billguard)
- [Billys Billing](https://cobalt.io/billys-billing)
- [Binary.com](https://hackerone.com/binary)
- [Binary.com Cashier](https://hackerone.com/binary_cashier)
- [BitBandit.eu](https://cobalt.io/bitbandit-eu)
- [[mailto:security@bitcasa.com|Bitcasa]]
- [BitCasino](https://cobalt.io/bitcasino)
- [BitGo](https://cobalt.io/bitgo)
- [BitHealth](https://cobalt.io/bithealth)
- [BitHunt](https://hackerone.com/bithunt)
- [BitMEX](https://cobalt.io/bitmex)
- [Bitoasis](https://cobalt.io/bitoasis)
- [Bitpagos](https://cobalt.io/bitpagos)
- [Bitrated](https://cobalt.io/bitrated)
- [Bitreserve](https://cobalt.io/bitreserve)
- [Bitspark](https://cobalt.io/bitspark)
- [Bitwage](https://cobalt.io/bitwage)
- [[mailto:request@bitwall.io|BitWall]]
- [BitYes](https://cobalt.io/bityes)
- [BlackBerry](https://global.blackberry.com/secure/report-an-issue/en.html)
- [[mailto:learnsecurity@blackboard.com|Blackboard]]
- [Blackphone](https://bugcrowd.com/blackphone)
- [[mailto:security@blesta.com|Blesta]]
- [Block.io](https://hackerone.com/blockio)
- [Block.io, Inc.](https://cobalt.io/block-io-inc)
- [Blockchain.info](https://cobalt.io/blockchain-info)
- [BlockScore](https://cobalt.io/blockscore)
- [Bookfresh](https://hackerone.com/bookfresh)
- [[mailto:security-reports@box.com|Box]]
- [[mailto:security@braintreepayments.com|Braintree]]
- [Brussels Airlines](https://go.intigriti.com/brusselsairlines)
- [BTC_sx](https://cobalt.io/btc-sx)
- [[mailto:security@bufferapp.com|Buffer]]
- [BX.in.th](https://cobalt.io/bx-in-th)
- [C2FO](https://hackerone.com/c2fo)
- [Campaign Monitor](https://help.campaignmonitor.com/contact)
- [CARD.com](https://bugcrowd.com/card)
- [Catchafire](https://cobalt.io/catchafire)
- [Caviar](https://hackerone.com/caviar)
- [[mailto:bugrewards@ccbill.com|CCBill]]
- [CERT/CC](https://hackerone.com/cert)
- [Certly](https://hackerone.com/certly)
- [ChainPay](https://cobalt.io/chainpay)
- [ChangeTip](https://cobalt.io/changetip)
- [Chargify](https://bugcrowd.com/chargify)
- [Chromium Project](https://code.google.com/p/chromium/issues/entry?template=Security%20Bug)
- [Circle](https://cobalt.io/circle)
- [[mailto:security@circleci.com|CircleCI]]
- [[http://www.cisco.com/web/about/security/psirt/security_vulnerability_policy.html#roosfassv]]
- [ClickUp](https://clickup.com/bug-bounty)
- [[mailto:contact@clojars.org|Clojars]]
- [CloudFlare](https://hackerone.com/cloudflare)
- [Cobalt](https://cobalt.io/cobalt)
- [[mailto:security@codeclimate.com|Code Climate]]
- [CodeIgniter](https://hackerone.com/codeigniter)
- [CodePen](https://bugcrowd.com/codepen)
- [Coin Republic](https://cobalt.io/coin-republic)
- [Coin.Space](https://hackerone.com/coinspace)
- [Coinage](https://cobalt.io/coinage)
- [Coinbase](https://hackerone.com/coinbase)
- [CoinDaddy](https://cobalt.io/coindaddy)
- [[mailto:feedback@coinkite.com?subject=[Vulnerability] - |Coinkite]]
- [Coinport](https://cobalt.io/coinport)
- [coins.ph](https://cobalt.io/coins-ph)
- [Cointrader.net](https://cobalt.io/cointrader-net)
- [Coinvoy](https://cobalt.io/coinvoy)
- [Collishop](https://go.intigriti.com/collishop)
- [Colruyt](https://go.intigriti.com/colruyt)
- [[mailto:security@compose.io|Compose]]
- [concrete5](https://hackerone.com/concrete5)
- [[mailto:vulnerability@constantcontact.com|Constant Contact]]
- [Counterparty](https://cobalt.io/counterparty)
- [[mailto:security@coupa.com|Coupa]]
- [Coursera](https://hackerone.com/coursera)
- [[mailto:security@cpanel.net|cPanel]]
- [[mailto:support@cPaperless.com|cPaperless]]
- [Crix.io](https://cobalt.io/crixio)
- [Cross Border Fines](https://go.intigriti.com/crossborderfines)
- [CrowdShield](https://crowdshield.com/bug-bounty-list.php?bug_bounty_program=crowdshield)
- [Cryptocat](https://github.com/cryptocat/cryptocat/issues)
- [[mailto:security@cupcake.io|Cupcake]]
- [[mailto:admin@customerinsight.ca|CustomerInsight]]
- [Cylance](https://hackerone.com/cylance)
- [[mailto:security%40datocapital.com|Dato Capital]]
- [[mailto:disclosure@detectify.com|Detectify]]
- [De Volkskrant](https://go.intigriti.com/devolkskrant)
- [Delen Private Bank](https://go.intigriti.com/delen)
- [[mailto:security@digitalocean.com|DigitalOcean]]
- [DigitalSellz](https://hackerone.com/digitalsellz)
- [Django](https://hackerone.com/django)
- [[mailto:info@doorkeeper.jp|Doorkeeper]]
- [DoSomething](https://cobalt.io/dosomething)
- [[mailto:security@dpd.zendesk.com|DPD]]
- [Dragon King](https://hackenproof.com/neverdie/dragon-king)
- [Dreambaby](https://go.intigriti.com/dreamland)
- [Dreamland](https://go.intigriti.com/dream)
- [Dropbox](https://hackerone.com/dropbox)
- [Dropbox Acquisitions](https://hackerone.com/dropbox-acquisitions)
- [Drupal](https://www.drupal.org/node/101494)
- [eBay](http://pages.ebay.com/securitycenter/Researchers.html)
- [[mailto:security@eclipse.org|Eclipse]]
- [eHealth Hub VZN KUL](https://go.intigriti.com/ehealthhubvznkul)
- [[mailto:security_alert@emc.com|EMC]]
- [[mailto:security@enanocms.org|Enano]]
- [[mailto:security@engineyard.com|Engine Yard]]
- [Envoy](https://hackerone.com/envoy)
- [Eobot](https://cobalt.io/eobot)
- [[mailto:security@ethnohub.com|EthnoHub]]
- [Etsy](https://www.etsy.com/bounty)
- [[mailto:security@ccpgames.com|EVE]]
- [Event Espresso](http://eventespresso.com/report-a-security-vulnerability)
- [Everitoken](https://hackenproof.com/everitoken/everitoken-blockchain)
- [[mailto:security@evernote.com|Evernote]]
- [EURid](https://go.intigriti.com/eurid)
- [[mailto:gerardo@expatistan.com|Expatistan]]
- [ExpressionEngine](https://hackerone.com/expressionengine)
- [Ezbob](https://cobalt.io/ezbob)
- [Facebook](https://www.facebook.com/whitehat)
- [Faceless](https://hackerone.com/faceless)
- [Factlink](https://hackerone.com/factlink)
- [FanFootage](https://hackerone.com/fanfootage)
- [FastSlots](https://cobalt.io/fastslots)
- [Flash](https://hackerone.com/flash)
- [[mailto:support@flood.io|Flood]]
- [[mailto:security@flowdock.com|Flow Dock]]
- [Flox](https://hackerone.com/flox)
- [[mailto:security@fluxiom.com|Fluxiom]]
- [Fog Creek](http://www.fogcreek.com/contact)
- [[mailto:security@formassembly.com|FormAssembly]]
- [Founder Bliss](https://cobalt.io/founder-bliss)
- [[mailto:security@foursquare.com|Foursquare]]
- [[mailto:security-reporting@freelancer.com|Freelancer]]
- [[mailto:security@galleryproject.org|Gallery]]
- [[mailto:security-alert@intergamma.nl|Gamma]]
- [[mailto:security@gemfury.com|Gemfury]]
- [General Motors](https://hackerone.com/gm)
- [GhostMail](https://hackerone.com/gmguys)
- [GitHub](https://bounty.github.com/submit-a-vulnerability.html)
- [GitLab](https://hackerone.com/gitlab)
- [GlassWire](https://hackerone.com/glasswire)
- [[mailto:security@gli.ph|Gliph]]
- [GlobaLeaks](https://hackerone.com/globaleaks)
- [[mailto:security-patches@google.com|Google PRP]]
- [Google VRP](https://www.google.com/about/appsecurity/reward-program/index.html)
- [Grammarly](https://hackerone.com/grammarly)
- [Gratipay](https://hackerone.com/gratipay)
- [GreenAddress](https://cobalt.io/greenaddress)
- [Greenhouse.io](https://hackerone.com/greenhouse)
- [[mailto:security@groklearning.com|Grok Learning]]
- [HackenProof](https://hackenproof.com/hacken/hackenproof)
- [HackerOne](https://hackerone.com/security)
- [[mailto:security@collectiveidea.com|Harmony]]
- [Heroku](https://bugcrowd.com/heroku)
- [[mailto:bugbounty@hex-rays.com|Hex-Rays]]
- [Hive Wallet](https://cobalt.io/hive-wallet)
- [[mailto:security@hootsuite.com|Hootsuite]]
- [[mailto:security@htc.com|HTC]]
- [[mailto:psirt@huawei.com|Huawei]]
- [Hubdia](https://hackerone.com/hubdia)
- [Humble Bundle](https://bugcrowd.com/humblebundle)
- [IAM KU Leuven](https://go.intigriti.com/kuleuvenlogin)
- [Ian Dunn](https://hackerone.com/iandunn-projects)
- [IBM](https://www.ibm.com/scripts/contact/contact/us/en/security_vulnerabilities)
- [ICEcoder](https://bugcrowd.com/icecoder)
- [[mailto:support@iconfinder.com|Iconfinder]]
- [[mailto:security@ifixit.com|Ifixit]]
- [Imgur](https://hackerone.com/imgur)
- [ImpressPages](https://cobalt.io/impresspages)
- [Indeed](https://bugcrowd.com/indeed)
- [Independent Reserve](https://cobalt.io/independent-reserve)
- [Informatica](https://hackerone.com/informatica)
- [IntegraXor](http://www.integraxor.com/support.html)
- [[mailto:security@internetwache.org|Internetwache]]
- [InVision](https://hackerone.com/invision)
- [IRCCloud](https://hackerone.com/irccloud)
- [itBit Exchange](https://hackerone.com/itbit)
- [[mailto:security@itrp.com|ITRP]]
- [itsme](https://go.intigriti.com/itsme)
- [joola.io](https://hackerone.com/joola-io)
- [Joomla](http://vel.joomla.org/submit-vel)
- [[mailto:security@jruby.org|JRuby]]
- [jsDelivr](https://hackerone.com/jsdelivr)
- [[mailto:sirt@juniper.net|Juniper]]
- [Kadira](https://hackerone.com/kadira)
- [[mailto:security@kaneva.com|Kaneva]]
- [Kayako](http://my.kayako.com/Tickets/Submit)
- [Kenna](https://bugcrowd.com/riskio)
- [Keybase](https://hackerone.com/keybase)
- [Khan Academy](https://hackerone.com/khanacademy)
- [SKB Kontur](https://kontur.ru/.well-known/security.txt)
- [[mailto:bugbounty@kraken.com|Kraken]]
- [Kinepolis](https://go.intigriti.com/kinepolis)
- [Kuna](https://hackenproof.com/kuna/kuna-crypto-exchange)
- [Lancor Income](https://cobalt.io/lancor-income)
- [[mailto:security@lastpass.com|LastPass]]
- [[mailto:security@launchkey.com|LaunchKey]]
- [Lean Testing](https://hackerone.com/leantesting)
- [[mailto:security@librato.com|Librato]]
- [LibSass](https://hackerone.com/libsass)
- [[mailto:security@liferay.com|Liferay]]
- [Line](https://bugbounty.linecorp.com/en/)
- [[mailto:security@linkedin.com|LinkedIn]]
- [LiveEnsure](http://www.liveensure.com/contact.php)
- [LocalBitcoins](https://cobalt.io/localbitcoins)
- [Localize](https://hackerone.com/localize)
- [[mailto:security@logentries.com|Logentries]]
- [[mailto:security@lookout.com|Lookout]]
- [[mailto:security@magento.com|Magento]]
- [[mailto:security@magix.net|MAGIX]]
- [[mailto:security@mahara.org|Mahara]]
- [MaiCoin](https://cobalt.io/maicoin)
- [Mail.Ru](https://hackerone.com/mailru)
- [Mailbird](https://cobalt.io/mailbird)
- [MailChimp](http://mailchimp.com/about/security-response/)
- [ManageBGL](https://cobalt.io/managebgl)
- [[mailto:security@managewp.com|ManageWP]]
- [MapLogin](https://hackerone.com/maplogin)
- [Marietje Schaake](https://go.intigriti.com/marietjeschaake)
- [Marktplatts](https://hackerone.com/marktplaats)
- [Mavenlink](https://hackerone.com/mavenlink)
- [Maximum](https://hackerone.com/maximum)
- [MCProHosting](https://bugcrowd.com/mcprohostings)
- [[mailto:bugs@mega.co.nz|MEGA]]
- [Mercury](https://cobalt.io/mercury)
- [Meteor](https://hackerone.com/meteor)
- [meXBT](https://cobalt.io/mexbt)
- [[mailto:secure@microsoft.com|Microsoft]]
- [[mailto:disclosure@mimecast.com|Mimecast]]
- [Mobile Vikings](https://go.intigriti.com/mobilevikings)
- [Mobile Vikings](https://hackerone.com/mobilevikings)
- [[mailto:security@moduscsr.com|Modus CSR]]
- [[mailto:security@moneybird.com|MoneyBird]]
- [MoneyStream](https://hackerone.com/moneystream)
- [[mailto:security@moodle.org|Moodle]]
- [[mailto:security@motorolasolutions.com|Motorola Solutions]]
- [Mozilla](https://www.mozilla.org/en-US/security/bug-bounty/)
- [mynxt.info](https://cobalt.io/mynxt-info)
- [[mailto:cert@ncsc.nl|NCSC]]
- [Nearby Live](https://hackerone.com/nearby)
- [[mailto:security@nest.com|Nest]]
- [[mailto:security-report@netflix.com|Netflix]]
- [Neverdie Smart Contract](https://hackenproof.com/neverdie/neverdie-smart-contract)
- [Neverdie Web](https://hackenproof.com/neverdie/neverdie-web)
- [Nexmo](https://cobalt.io/nexmo)
- [Nexuzhealth](https://go.intigriti.com/nexushealth)
- [Nexuzhealth Web PACS](https://go.intigriti.com/nexuzhealthwebpacs)
- [Nginx](https://hackerone.com/ibb-nginx)
- [[mailto:security@nitrous.io|Nitrous]]
- [[mailto:security-alert@nokia.com|Nokia Networks]]
- [NoPass](https://cobalt.io/nopass)
- [[mailto:security@nzrs.net.nz|NZRS]]
- [[mailto:security@offensive-security.com|Offensive Security]]
- [ok.ru](https://hackerone.com/ok)
- [OKCoin](https://cobalt.io/okcoin)
- [OkCupid](https://hackerone.com/okcupid)
- [[mailto:security@olark.com|Olark]]
- [OneSpan Mobile](https://go.intigriti.com/vascomobileproducts)
- [OneSpan Server Products](https://go.intigriti.com/vascoserver-sideproducts)
- [Opal Cryptocurrency](https://cobalt.io/opal-cryptocurrency)
- [Openfolio](https://hackerone.com/openfolio)
- [OpenSSL](https://hackerone.com/ibb-openssl)
- [[https://security.openstack.org/#how-to-report-security-issues-to-openstack]]
- [[mailto:otst@opentext.com|OpenText]]
- [Opera](https://bugs.opera.com/wizarddesktop)
- [Optimizely](https://cobalt.io/optimizely)
- [[mailto:secalert_us@oracle.com|Oracle]]
- [ownCloud](https://hackerone.com/owncloud)
- [[mailto:security@pagerduty.com|PagerDuty]]
- [Panasonic Avionics](https://hackerone.com/panasonic-aero)
- [Pantheon](https://bugcrowd.com/pantheon)
- [[mailto:security@panzura.com|Panzura]]
- [Paragon Initiative Enterprises](https://hackerone.com/paragonie)
- [[mailto:security@paychoice.com.au|Paychoice]]
- [[mailto:security@paymill.com|PayMill]]
- [[mailto:https://www.paypal.com/bugbounty/register|PayPal]]
- [Paytm](https://bugbounty.paytm.com/)
- [Perl](https://hackerone.com/ibb-perl)
- [Phabricator](https://hackerone.com/phabricator)
- [PHP](https://bugs.php.net/report.php)
- [[mailto:security@pidgin.im|Pidgin]]
- [[mailto:security@pikapay.com|PikaPay]]
- [[mailto:admin@pinoyhacknews.com|PinoyHackNews]]
- [Pinterest](https://bugcrowd.com/pinterest)
- [Piwik Open Source Analytics](https://cobalt.io/piwik-open-source-analytics)
- [[mailto:security@plone.org|Plone]]
- [[mailto:security@getpocket.com|Pocket]]
- [Poloniex](https://cobalt.io/poloniex)
- [Postmark](https://wildbit.wufoo.com/forms/wildbit-security-response)
- [[mailto:security-bug-bounty@prezi.com|Prezi]]
- [Projectplace](https://hackerone.com/projectplace)
- [[mailto:security@pullreview.com|PullReview]]
- [[mailto:security@puppetlabs.com|Puppet labs]]
- [PureVPN](https://bugcrowd.com/purevpn)
- [[mailto:security@python.org|Python]]
- [QIWI](https://hackerone.com/qiwi)
- [Quadriga CX](https://cobalt.io/quadriga-cx)
- [QuickBT](https://cobalt.io/quickbt)
- [Quora](https://hackerone.com/quora)
- [[mailto:security@rackspace.com|Rackspace]]
- [Rdbhost_service](https://cobalt.io/rdbhost-service)
- [[mailto:site-security@redhat.com|Red Hat]]
- [[mailto:security@reddit.com|Reddit]]
- [[mailto:security@relaso.com|Relaso]]
- [[mailto:security@relateiq.com|RelateIQ]]
- [Release Wire](http://www.releasewire.com/about/contact)
- [Respondly](https://hackerone.com/respondly)
- [Revive Adserver](https://hackerone.com/revive_adserver)
- [Ribose](https://www.ribose.com/feedbacks/security)
- [Ripio](https://cobalt.io/ripio)
- [[mailto:bugs@ripple.com|Ripple]]
- [[mailto:security@riskalyze.com|Riskalyze]]
- [Romit](https://hackerone.com/romit)
- [[mailto:security@ruby-lang.org|Ruby]]
- [Ruby on Rails](https://hackerone.com/rails)
- [[mailto:security@salesforce.com|Salesforce]]
- [Samsung TV](https://samsungtvbounty.com/ReportBug.aspx)
- [Sandbox Escape](https://hackerone.com/sandbox)
- [[mailto:secure@sap.com|SAP]]
- [[mailto:abuse@schubergphilis.com|Schuberg Philis]]
- [[mailto:security@scorpionsoft.com|Scorpion Software]]
- [Secret](https://hackerone.com/secret)
- [[mailto:security@secureworks.com|Secure Works]]
- [Sellfy](http://docs.sellfy.com/contact)
- [Sentiance](https://go.intigriti.com/sentiance)
- [ServiceRocket](https://bugcrowd.com/servicerocket)
- [[mailto:team@sharelatex.com|ShareLaTeX]]
- [Sherpany](https://cobalt.io/sherpany)
- [Shopify](https://hackerone.com/shopify)
- [[mailto:security@sifterapp.com?subject='Security Vulnerability Report'|Sifter]]
- [Silent Circle](https://bugcrowd.com/silentcircle)
- [Simple](https://bugcrowd.com/simple)
- [[mailto:responsible-disclosure@siteground.com|SiteGround]]
- [[mailto:security@skoodat.com|Skoodat]]
- [Skrill](https://cobalt.io/skrill)
- [Skyscanner](https://bugcrowd.com/skyscanner)
- [Slack](https://hackerone.com/slack)
- [Snapchat](https://hackerone.com/snapchat)
- [[mailto:security@userscape.com|Snappy]]
- [[mailto:security@sonatype.com|Sonatype]]
- [Sony](https://secure.sony.net/form)
- [SoundCloud](https://scsecurity.freshdesk.com/support/tickets/new)
- [Spaargids](https://go.intigriti.com/spaargids)
- [SpectroCoin](https://cobalt.io/spectrocoin)
- [Spendbitcoins](https://cobalt.io/spendbitcoins)
- [SplashID](https://bugcrowd.com/splashid)
- [[mailto:security@splitwise.com|Splitwise]]
- [[mailto:security@spotify.com|Spotify]]
- [[mailto:security@sproutsocial.com|Sprout Social]]
- [Square](https://hackerone.com/square)
- [Square Open Source](https://hackerone.com/square-open-source)
- [StatusPage](https://bugcrowd.com/sunrise)
- [StopTheHacker](https://hackerone.com/stopthehacker)
- [Student Assessment System](https://go.intigriti.com/printscan)
- [Studio 100](https://go.intigriti.com/studio100)
- [Subledger](https://cobalt.io/subledger)
- [Subrosa](https://cobalt.io/subrosa)
- [Sucuri](https://hackerone.com/sucuri)
- [Suivo](https://go.intigriti.com/suivoweb)
- [[mailto:secure@symantec.com|Symantec]]
- [Taptalk](https://hackerone.com/taptalk)
- [[mailto:cperciva@tarsnap.com|Tarsnap]]
- [Tata Play](https://www.tataplay.com/bug-bounty-hunter)
- [[mailto:security@teamunify.com|TeamUnify]]
- [[mailto:beveiligingsmeldpunt@tele2.com|Tele2]]
- [[mailto:cert@telekom.de?subject=bug_bounty|Telekom]]
- [Telenet](https://go.intigriti.com/telenet)
- [Test-Aankoop](https://go.intigriti.com/testaankoop)
- [The Internet](https://hackerone.com/internet)
- [The Mastercoin Foundation](https://cobalt.io/the-mastercoin-foundation)
- [ThisData](https://hackerone.com/thisdata)
- [TimeTrex](https://cobalt.io/timetrex)
- [ToyTalk](https://hackerone.com/toytalk)
- [Trello](https://hackerone.com/trello)
- [Tuenti](http://corporate.tuenti.com/en/contact/security)
- [Tweakers](https://go.intigriti.com/tweakers)
- [Twilio](https://bugcrowd.com/twilio)
- [[mailto:security@twitch.tv|Twitch]]
- [Twitter](https://hackerone.com/twitter)
- [[mailto:security-abuse@uber.com|Uber]]
- [Ubiquiti Networks](https://hackerone.com/ubnt)
- [[mailto:security@unitag.io|Unitag]]
- [Urban Dictionary](https://hackerone.com/urbandictionary)
- [Uzbey](https://hackerone.com/uzbey)
- [[mailto:security@valvesoftware.com|Valve Software]]
- [VeChainThor](https://hackenproof.com/vechain/vechainthor)
- [VeChainThor Wallet](https://hackenproof.com/vechain/vechainthor-wallet)
- [[mailto:security-alerts@vce.com|VCE]]
- [[mailto:security@venmo.com|Venmo]]
- [Version Cake](https://hackerone.com/versioncake)
- [[mailto:security@viadeo.com|Viadeo]]
- [Vimeo](https://hackerone.com/vimeo)
- [VK.com](https://hackerone.com/vkcom)
- [Volusion](https://bugcrowd.com/volusion)
- [VPNSox](https://cobalt.io/vpnsox)
- [vulners.com](https://hackerone.com/vulnerscom)
- [Vultr](https://www.vultr.com/bug-bounty/)
- [[mailto:security@webconverger.com|Webconverger]]
- [[http://campaigns.websecurify.com/money-for-bugs/#contact]]
- [Weebly](https://cobalt.io/weebly)
- [WePay](https://hackerone.com/wepay)
- [Whisper](https://hackerone.com/whisper)
- [WHMCS](https://bugcrowd.com/whmcs)
- [Windthorst ISD](http://www.windthorstisd.net/BugReport.cfm)
- [withinsecurity](https://hackerone.com/withinsecurity)
- [[mailto:security@wizehive.com|WizeHive]]
- [Woorank](https://go.intigriti.com/woorank)
- [WordPoints](https://hackerone.com/wordpoints)
- [Wordware](https://cobalt.io/wordware)
- [WP API](https://hackerone.com/wp-api)
- [[mailto:security@xenproject.org|Xen Project]]
- [[mailto:security@lastpass.com|Xmarks]]
- [Yahoo](https://hackerone.com/yahoo)
- [Yandex](https://yandex.com/bugbounty/report)
- [[mailto:support@yanomo.com|Yanomo]]
- [Yatra](https://www.yatra.com/online/bug-bounty)
- [[mailto:security@yesware.com|Yesware]]
- [[mailto:security@zapier.com|Zapier]]
- [Zaption](https://hackerone.com/zaption)
- [[mailto:security@zencash.com|ZenCash]]
- [Zendesk](https://hackerone.com/zendesk)
- [[mailto:support@zetetic.net|Zetetic]]
- [[mailto:security@ziggo.nl|Ziggo]]
- [[mailto:security@zimbra.com|Zimbra]]
- [Zoho](https://bugbounty.zoho.com/bb/info)
- [Zomato](https://hackerone.com/zomato)
- [Zopim](https://hackerone.com/zopim)
- [[mailto:whitehat@zynga.com|Zynga]]
- [Coding Ninjas](https://www.codingninjas.com/bug-bounty)