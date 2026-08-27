
The blue team certification space just got a new entrant, and predictably, the marketing wars have started. TryHackMe launched SAL 2 recently and immediately started throwing shade at BTL2 in their comparison tables. Having spent real time with all three of these certifications, I'm going to give you the unfiltered breakdown — including where the vendor marketing gets it embarrassingly wrong.

---

## Three Certs, One Tier — Sort Of

Let's establish the playing field first. SAL 2, HTB CDSA, and BTL2 all occupy roughly the same career level: mid-to-advanced SOC analysts who have moved past the entry-level fundamentals and want a credential that actually reflects operational capability. If you're fresh out of a Security+ and wondering which of these to chase first, the answer is none of them — go get SAL 1 or BTL1, build your foundation, and come back.

For everyone else, here's how to think about the competitive landscape before we go cert by cert.

---

## SAL 2 (TryHackMe): The New Kid With Something to Prove

SAL 2 is the newest of the three, barely weeks old at the time of this writing. THM is marketing it as an "advanced hands-on certification" targeting mid-tier SOC analysts, and the format delivers on the hands-on promise: 12 multi-stage blue team scenarios across DFIR, log analysis, and AD analysis, with a 72-hour exam window and a mandatory report submission at the end.

The $510 price tag for premium subscribers (or $657 without membership) is reasonable for what you get — the learning modules are included, and there's one free retake built in. For preparation, staying inside THM's own ecosystem makes the most sense here. The SOC Level 2 pathway covers log analysis, Splunk, Elastic Stack, and detection engineering — the core domains you'll need. If your fundamentals need refreshing, pair it with SOC Level 1. If you want to push further, the Advanced Endpoint Investigation and Security Engineering paths are worth adding.

My honest take: SAL 2 sits comfortably between entry-level and genuinely advanced. If you already hold BTL2, you probably don't need it. But if you have BTL1 and want to level up before taking on BTL2's full weight, SAL 2 is a sensible stepping stone — and it may mature into something more widely recognized as THM builds track record around it.

The bigger issue is that THM published a comparison table positioning SAL 2 as superior to BTL2 in several categories. Let's address that directly.

---

## The Comparison Table THM Doesn't Want You to Think Too Hard About

THM's own marketing claimed SAL 2 beats BTL2 on industry recognition, judgment and communication assessment, and coverage depth. Every one of these claims needs correction.

On **recognition**: BTL2 is trusted by military units and law enforcement agencies. SAL 2 is two weeks old. There's no version of this comparison where SAL 2 currently wins on recognition.

On **judgment and communication**: BTL2 has a notoriously heavy focus on reporting quality and analyst judgment. If you've sat the BTL2 exam, you know the reporting component isn't a formality — it's a core evaluation axis. THM claiming SAL 2 beats BTL2 here is, at best, premature and, at worst, deliberately misleading.

On **coverage depth**: BTL2 includes advanced malware analysis (static analysis, dynamic analysis, portable executable headers, binary instruction extraction) and memory forensics with Volatility — domains that SAL 2 and CDSA touch only lightly, if at all. The claim that SAL 2 offers wider or deeper coverage than BTL2 doesn't survive five minutes of curriculum comparison.

Vendor comparison tables exist to sell product. Read them accordingly.

---

## HTB CDSA: Underestimated, and Deliberately Underpriced

CDSA gets described as an entry-level SOC analyst certification, which technically accurate but practically misleading. Yes, the stated target audience includes entry-level analysts, IT administrators, and junior personnel. But the actual difficulty — broad coverage of processes, tactical analytics, log analysis, threat hunting, and AD analysis — means many people find it on par with SAL 2 in terms of what it demands from you in the exam.

The exam format is a 7-day window with two real incident investigations and flag collection, plus mandatory reporting evaluated by a live HTB instructor. That instructor-reviewed component matters: unlike SAL 2's automated grading system, CDSA's human evaluator brings actual professional judgment to your report quality. Results come back within 20 business days.

The preparation path is clearly defined: complete the 15-module SOC Analyst job role path on HTB Academy, work through relevant Sherlocks (the forensics-focused challenges), and add the forensics and reverse engineering challenge categories for depth. Unlike SAL 2, where staying inside THM's ecosystem is the strategy, HTB's challenge variety gives you more surface area to build genuine competency.

And then there's pricing. With an HTB Academy annual subscription, the CDSA exam voucher comes in at approximately $210. That is not a typo. For a fully practical, instructor-graded, industry-recognized certification at this capability level, $210 is genuinely one of the best value propositions in cybersecurity certifications. If you're budget-constrained and want a credential that will open doors while you build toward BTL2, CDSA is almost a no-brainer.

One additional observation: if you hold CDSA, your chances of passing SAL 2 go up considerably. The domain overlap is real, and the hands-on discipline transfers directly.

---

## BTL2: The One That Actually Costs You Something — And Is Worth It

BTL2 is the most difficult, most expensive, and most recognized of the three. There is no shortcut to framing this differently.

The 72-hour exam window simulates a full corporate network intrusion investigation across multiple systems. You're not resolving isolated scenarios — you're working through a coordinated attack chain as it would appear in a real SOC environment. The reporting requirement isn't a checkbox; it's a substantial evaluation component that distinguishes BTL2 from certs where you submit flags and call it done.

What makes BTL2 technically heavier than the other two:

**Malware analysis is serious here.** Where SAL 2 and CDSA ask you to extract basic IOCs from endpoints, BTL2 expects you to operate at the level of static and dynamic analysis, understanding PE headers, and reading binary-level instruction output. This is not beginner malware analysis.

**Memory forensics is a core domain.** You need to be comfortable with Volatility — not familiar, comfortable. Investigating a real network intrusion means you'll encounter scenarios where endpoint logs and network captures aren't enough. Memory artifacts fill the gaps, and BTL2 tests whether you can actually work them.

**The prerequisites are real prerequisites.** Two to four years of hands-on SOC experience is listed as a requirement, and it functions as one. Attempting BTL2 on the back of certifications alone — even strong ones like CDSA and SAL 2 — without real-world SOC time is how people fail and walk away confused about why. The exam is designed for people who have seen live incidents, not people who have read about them extensively.

Results take up to 30 working days because everything is hand-marked. At roughly $2,600 including training and exam, it is the most expensive of the three — but the official course includes 231 lessons, 28 browser labs, and five months of access. Employer funding is the ideal path here. If you're paying out of pocket and you have the legitimate experience to back it, the career ROI still justifies it.

---

## The Technical Essentials Across All Three

Regardless of which certification you're targeting, two tool categories will be assessed in all of them: **Splunk** and **Elastic Stack**. These aren't optional electives in your prep — they're the core SIEM platforms the entire blue team industry runs on, and your proficiency with both will directly determine your exam performance. Get comfortable with query syntax, dashboard creation, and alert logic in both environments before you attempt any of these exams.

Malware analysis is the differentiator. SAL 2 and CDSA require basic static analysis capability to extract indicators of compromise. BTL2 requires substantially more. Know where you're targeting and calibrate your prep accordingly — don't overprepare for SAL 2 malware analysis, but do not underestimate what BTL2 demands.

---

## Salary Expectations: What the Market Actually Pays

Based on SOC analyst salary data published recently, here's the realistic picture for holders of each certification in the US market:

For **SAL 2 and CDSA** holders (Tier 1-2 analysts, 0–5 years experience): national averages run $55,000–$75,000 for Tier 1, stepping up to $75,000–$100,000 at the Tier 2 level for analysts with 2–5 years experience. Metro markets push this toward $65,000–$115,000. If you're holding one of these certifications and your current compensation sits outside this range, you have a documented basis for a compensation conversation with your employer.

For **BTL2 holders**: the salary picture tracks with senior and advanced analyst roles, which reflects the 3–4 years of genuine SOC experience the certification expects you to bring. The numbers climb accordingly, and the recognition in government, military, and enterprise security contexts opens roles that the other two certs simply don't touch.

---

## The Verdict

Here's my actual recommendation framework, stripped of vendor framing:

**Tight budget, want recognition quickly**: CDSA at ~$210 is the clearest value play in this space. The difficulty is real, the credential is growing, and the price-to-signal ratio is unmatched.

**Building toward BTL2, want structured mid-tier practice**: SAL 2 is a reasonable investment if you already hold SAL 1 or BTL1. It won't move the needle on recognition the way CDSA or BTL2 will — yet — but it forces disciplined blue team thinking at a higher complexity level than entry certs.

**Want the most respected blue team credential available**: BTL2, but only when you've earned the prerequisites honestly. Don't attempt it because you've stacked paper certifications. Attempt it when you've worked real incidents in a real SOC and want the credential that reflects that.

The certification isn't the shortcut. The experience is. The certification is what makes the experience legible to a hiring manager.