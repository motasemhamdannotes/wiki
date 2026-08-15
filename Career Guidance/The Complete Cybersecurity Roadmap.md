# Where to Actually Start

Cybersecurity has a discoverability problem. Ask ten different practitioners how they got started and you'll get ten different answers ; a CTF here, a certification there, a computer science degree somewhere in the mix. For a newcomer, that's not inspiring. It's paralyzing. There's no shortage of advice; there's a shortage of _direction_.

This roadmap exists to fix that. Before you touch a single tool or sign up for a single course, the real first question isn't "what should I learn?" — it's "what am I actually trying to get out of this?" Are you in it for the thrill of solving puzzles nobody else can crack? Are you trying to land a job as fast as realistically possible? Do you want the credibility of a formal degree behind your name? Your answer changes everything downstream, so let's start there.

## Before You Start: Which Path Is Right for You?

| Path                    | Best For                                                          | What You're Optimizing For             |
| ----------------------- | ----------------------------------------------------------------- | -------------------------------------- |
| **Scouts**              | Curious beginners who want to explore without commitment pressure | Skill-building at your own pace        |
| **Fast-Track**          | People who need a job in the field, fast                          | Speed to employment (~10 months)       |
| **Bug Bounty Hunter**   | Self-directed learners drawn to independent, results-based work   | Real-world findings and payouts        |
| **Certification Geeks** | People who want structured, employer-recognized validation        | Credibility and HR-checkbox compliance |
| **Academics**           | Those who want a formal Bachelor's behind their name              | Long-term credentialing and options    |

None of these paths are mutually exclusive ; plenty of people start as hobbyists and drift into certifications once they realize they're serious. Treat this table as a starting compass, not a life sentence.

---

## Path 1: Scouts : Hacking for the Love of It
If you're exploring cybersecurity purely out of curiosity ; no job pressure, no exam deadline, just the itch to understand how systems break , this is your on-ramp. The goal here is simple: go from "script kiddie" (someone who runs tools without understanding them) to a practitioner who actually knows _why_ an exploit works.

### Step 1: Learn the Basics on TryHackMe
**Objective:** Build a foundational understanding of hacking concepts in a guided, low-pressure environment.

- Sign up for a TryHackMe account.
- Work through introductory rooms and learning paths, including:
    - The Complete Beginner path
    - Introduction to Cyber Security
    - Web Fundamentals
    - Red Teaming
    - Jr Penetration Tester

TryHackMe earns its reputation as a starting point for a reason — it's built specifically for people who've never touched a terminal with hostile intent before. Guided walkthroughs mean you're never stuck without a safety net.

### Step 2: Enroll in PortSwigger's Web Security Academy

**Objective:** Deepen your understanding of web application security specifically.

- Explore the free courses on Burp Suite's Web Security Academy.
- Work through material covering:
    - Web application security fundamentals
    - Using Burp Suite for web pentesting
    - Advanced web exploitation techniques

This is, without much argument, the best free web security education available anywhere online. It pairs theory with practical labs in a way few platforms manage.

### Step 3: Practice Hands-On Challenges on Hack The Box

**Objective:** Gain practical experience solving unguided, real-world-style challenges.

- Register on the Hack The Box platform.
- Start with beginner-friendly machines to apply what you learned on TryHackMe.
- Progress to harder machines as your skills mature.

Here's the shift that matters: TryHackMe holds your hand, HTB doesn't. That's intentional. Struggling through a machine without a walkthrough is where real problem-solving instincts get built.

### Step 4: Keep Expanding : This Field Doesn't Sit Still

**Objective:** Stay current with evolving trends, tools, and techniques.

- Participate in communities like Reddit's r/hacking or Hack Forums.
- Follow security blogs, podcasts, and YouTube channels.
- Regularly challenge yourself with new tasks, puzzles, and CTFs.

Cybersecurity punishes complacency. The tools and techniques that work today will be patched, deprecated, or replaced within a year or two — staying plugged into the community isn't optional, it's maintenance.

### Step 5: Try CTFs and Bug Bounties

**Capture The Flag Competitions:**

- Join platforms like Hack The Box, OverTheWire, or picoCTF.
- Tackle both beginner and advanced challenges.
- Collaborate with others on harder problems — you'll learn as much from teammates as from the challenge itself.
- Read write-ups for anything you couldn't solve. Understanding someone else's approach is often more valuable than solving it yourself.

**Bug Bounty Programs:**

- Register on platforms like HackerOne, Bugcrowd, or Synack.
- Choose programs aligned with your interests ; web, mobile, or network testing.
- Report vulnerabilities ethically and within each program's disclosure guidelines.
- Keep an eye on new programs and feedback on your submissions.

---

## Path 2: The Fast-Track Path : Job-Ready in Under 10 Months

If your goal is employment, not exploration, this path trades breadth for speed. It's an aggressive timeline and it comes with a caveat worth stating plainly: **there are no guarantees in this field.** What this path offers is the most efficient publicly available sequence to get you in front of hiring managers — not a promise of a job offer at the end of it.

### 1. TCM Security : Practical Ethical Hacker Course (~2 months)

- Register with TCM Security and subscribe.
- [TCM PNPT Study Notes](https://buymeacoffee.com/notescatalog/e/422421)
- Complete **Practical Ethical Hacking**.
- Optionally complete **Practical Web Hacking** for deeper web-focused skill.

### 2. Hack The Box Academy : Penetration Tester Pathway (~2–3 months)

- Sign up through the HTB Academy platform.
- Acquire credits and a voucher for course enrollment.
- Complete the **Penetration Tester** job-role path.

### 3. OSCP : PEN-200: Penetration Testing with Kali Linux (~3 months)

This certification is close to a gold standard in offensive security , it's respected enough that it regularly bypasses standard HR keyword screening.

- Enroll in the PEN-200 course through Offensive Security.
- Purchase the 90-day lab access package.
- [OSCP Study Notes](https://buymeacoffee.com/notescatalog/e/165578)
- Study the course materials and Kali Linux documentation thoroughly.
- Practice extensively in the lab, exploiting real vulnerabilities.
- Review deliberately before the exam , don't wing this one.
- Schedule and sit the exam.
- Pass it.

### 4. Search for and Report CVEs

Finding vulnerabilities in open-source projects is more achievable than it sounds, and it's a genuine differentiator. Two candidates with identical certifications are not equal if one of them has a CVE credit demonstrating they can _apply_ what they learned, not just pass an exam on it.


**Worth knowing:** communities built around this roadmap often offer free resume reviews or informal conversations with working ethical hackersusually gated behind a Discord server and a scheduled appointment. If that kind of mentorship is available to you, take it. Free feedback from someone already doing the job is worth more than another course.

---

## Path 3: The Bug Bounty Hunter's Path

Bug bounty hunting doesn't have a finish line. There's no single certificate or milestone that signals "you're ready now" which is exactly why so many newcomers struggle to find their footing. This path is built to give that structure back.

### 1. Adopt the Hunter's Mindset

Before the technical stuff: bug bounty hunting rewards perseverance, creativity, and a refusal to quit. You will fail — repeatedly — before you find anything. Every rejected report and every dead-end is data, not a verdict on your ability.

You don't need to be an expert programmer, but you do need to understand how code behaves well enough to spot where it misbehaves. And because new vulnerability classes and techniques emerge constantly, this isn't a field where you finish learning. Join forums, watch creators who publish their methodology, and stay in the conversation.

### 2. Build a Real Foundation

If you're new to IT, start here — skipping this step just means you'll circle back to it later, frustrated. You need working knowledge of:

- **Networking** — TCP/IP, DNS, HTTP.
- **Web Technologies** — HTML, JavaScript, CSS, and server-side languages.
- **Common Vulnerabilities** — the OWASP Top Ten, cold.

All of this is available for free on TryHackMe:

- Complete the **Complete Beginner** path.
- Complete **Web Fundamentals**.
- Explore further if curiosity pulls you there.

### 3. Choose Your First Program Carefully

Don't start with Google or Facebook. Their bug bounty programs are picked over by thousands of far more experienced hunters, and you'll burn motivation faster than you build skill. Instead, start with lower-competition platforms like **OpenBugBounty**, where the learning curve is gentler and the field is thinner.

Look for programs with a broad scope — multiple URLs, login systems, purchasing flows, search functionality — since a wider attack surface means more opportunities to practice. And read the program's policy before you touch anything; staying inside the rules isn't optional.

- Register on OpenBugBounty and pick a program with meaningful scope.
- Work through relevant PortSwigger Academy paths as you go, including:
    - Server-side vulnerabilities
    - Cross-site scripting (XSS)
    - File upload vulnerabilities
    - Clickjacking (UI redressing)
    - Path traversal
    - Server-side request forgery (SSRF)
    - Cross-site request forgery (CSRF)
    - Cross-origin resource sharing (CORS)
    - API testing
    - Web cache deception
    - SQL injection
    - NoSQL injection
    - Authentication vulnerabilities
    - WebSocket vulnerabilities
- Apply each concept directly against your chosen program as you learn it — theory without application evaporates fast.

### 4. Understand the Four Phases of a Hunt

- **Reconnaissance** — Map the attack surface and identify entry points.
- **Scanning** — Use tools like Nmap and Burp Suite to surface weaknesses.
- **Exploitation** — Prove impact, not just existence, once you find a vulnerability.
- **Reporting** — Write it up clearly. A great find with a poor report gets triaged as a mediocre one.

### 5. Start Small, Then Climb

Chase the low-hanging fruit first — it builds real confidence, not false confidence:

- **Cross-Site Scripting (XSS)** — injecting malicious scripts into pages viewed by others.
- **Security Misconfigurations** — unnecessary services enabled, default credentials left active.
- **Insecure Direct Object References (IDOR)** — accessing data you shouldn't by manipulating identifiers in the URL.

From there, the progression looks like this: start small on low-competition platforms → deepen your skills through PortSwigger Academy → take on more complex vulnerabilities on bigger programs → stay current on emerging techniques → collaborate wherever you can.

### 6. Don't Hunt Alone

Collaboration accelerates everything. Partnering with more experienced hunters exposes you to techniques, tooling, and even co-authored reports you wouldn't have found solo. Forums, CTFs, and community events are where these relationships actually form — they rarely happen by accident.

### 7. Manage Your Time, Manage Your Expectations

Bug bounty hunting eats time if you let it. Protect yourself with structure:

- **Set clear goals** for each session — a number of leads, a completed recon phase, whatever's concrete.
- **Time-box your work** to avoid burnout.
- **Track your progress** so motivation has something to point to besides "did I find a bug today."

And be honest with yourself about the timeline: your first valid bug might take weeks or months to land. That's normal, not a sign you're in the wrong field. Celebrate the small wins, expect the setbacks, and treat both as part of the same learning curve.

---

## Path 4: The Certification Seeker's Ladder

Certifications won't make you a hacker on their own — no piece of paper does that — but they do two things well: they structure your learning, and they signal competence to employers who can't otherwise evaluate your skills directly. Think of this ladder as a way to build both knowledge and credibility at the same time. Pair every certification here with actual hands-on practice, or the paper becomes hollow.

### 1. CompTIA A+ — Basic IT Skills

Covers foundational IT knowledge: hardware, software, networking, and troubleshooting. This is where most cybersecurity careers quietly begin, whether people admit it or not.

- Purchase the A+ voucher bundle (Core 1 and Core 2).
- Study using Professor Messer's free video courses.
- Pass Core 1.
- Pass Core 2.

### 2. Linux Essentials (LPI) — Linux Fundamentals

Security tooling lives disproportionately on Linux. Skipping this step just means learning it the hard way later, mid-project.

- Purchase the LPI Linux Essentials voucher.
- Study using resources like Shawn Powers' course material.
- Pass the exam.

### 3. CompTIA Network+ — Networking Knowledge

You cannot secure what you don't understand. Network+ covers infrastructure, operations, and networking security concepts that show up constantly in later, harder material.

- Purchase the Network+ voucher.
- Study with Professor Messer.
- Pass the exam.

### 4. CompTIA Security+ — Cybersecurity Fundamentals

The most widely recognized entry-level security certification in the industry, and often a literal HR requirement for junior roles.

- Purchase the Security+ voucher.
- Study with Professor Messer.
- Pass the exam.

### 5. CompTIA PenTest+ — Specializing in Offensive Security

For those leaning toward offensive roles, PenTest+ covers penetration testing methodology and vulnerability assessment specifically.

- Purchase the PenTest+ voucher.
- Study with ACI Learning.
- Pass the exam.

### 6. CompTIA CySA+ — Cyber Defense Skills

The defensive counterpart — threat detection, analysis, and response. If your interests lean blue team, this is where the ladder starts branching that direction.

- Purchase the CySA+ voucher.
- Study with Certify Breakfast on YouTube, and supplement with practice exams via mobile apps.
- Pass the exam.

### 7. OSCP — Proof You Can Actually Do the Work

Not a traditional multiple-choice certification, and that's exactly the point. The OSCP demands you compromise real systems in a lab environment and document your process — it's less a credential and more a demonstration.

Consider it the capstone once the foundational certifications are behind you.

---

## Path 5: The Degree Pursuer's Shortcut

A formal degree still opens doors that certifications alone don't — some employers and countries require one outright. But there's a smart way and an expensive way to get one, and the difference between them is significant.

The core strategy: complete the majority of your coursework _outside_ your university, transfer those credits in, and enroll only once you're 50–65% done. Done right, you can finish your remaining coursework in a single term, which minimizes both cost and time. This particular path is built around a **Bachelor of Science in Cybersecurity and Information Assurance (BSCSIA)** through Western Governors University (WGU), a competency-based school that accepts substantial outside transfer credit.

### Base Courses (Transferable Credit)

**Through Sophia Learning:**

- ENG1002 (SOPH-0030)
- PHIL1005 (SOPH-0065)
- COMM1002 (SOPH-0024)
- CA1001 (SOPH-0001)
- STAT1001 (SOPH-0005)
- HLTH1010 (SOPH-0063)
- CS1011 (SOPH-0047)
- CS1101 (SOPH-0062)
- CS1100 (SOPH-0058)
- PM1001 (SOPH-0013)

**Through Study.com:**

- Political Science 102 (SDCM-0042)
- Biology 101L (SDCM-0188)
- Computer Science 108 (SDCM-0213)
- Computer Science 110 (SDCM-0215)

**Other:**

- CS1001 — completed most cost-effectively through Google IT Support certification.

### Certifications (Double as Degree Credit)

Complete the following — each one covered in detail in the Certification Seeker's Ladder above:

- CompTIA A+
- Linux Essentials (LPI)
- CompTIA Network+
- CompTIA Security+
- CompTIA CySA+
- CompTIA PenTest+

### Enrolling at WGU

- Transfer your transcripts — high school diploma, completed certifications, and outside coursework.
- Enroll and complete your remaining coursework.
- If you get stuck navigating the process, unofficial WGU communities (Discord and otherwise) are active and genuinely helpful — most people on this path aren't figuring it out alone.

---

## The Bottom Line

None of these five paths is objectively "better" than the others — they optimize for different outcomes, and the right one depends entirely on what you're actually chasing: curiosity, a paycheck, bounty payouts, credibility, or a degree. What they all share is the same underlying truth about this field: nobody hands you competence. You build it, room by room, machine by machine, report by report — and the roadmap only works if you actually walk it.