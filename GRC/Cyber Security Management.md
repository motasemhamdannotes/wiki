[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## Why Security Is Far More Than Technology
When people first enter the cybersecurity field, they often imagine security as a technical discipline centered around firewalls, intrusion detection systems, encryption, and vulnerability management. Those technologies certainly matter, but they represent only one part of the picture.

Cybersecurity management is fundamentally about reducing the impact of attacks on an organization. Technology plays an important role in achieving that goal, but effective security depends just as heavily on procedures, governance, culture, and people.

Security controls come in many forms. Some are technical, such as access controls, monitoring systems, or endpoint protection platforms. Others are procedural, including policies, vetting processes, audit programs, logging requirements, and governance frameworks. Together, these controls form the defensive structure that organizations rely on to protect information and maintain resilience.

The reality is that cybersecurity is built on people. Technology can enforce rules, detect anomalies, and automate responses, but people design those systems, operate them, approve access, assess risk, and ultimately decide how much security an organization is willing to invest in.

## The Real Goal of Cyber Security
For most organizations, cybersecurity is not an end in itself.

The purpose of security is to support the business.

That distinction is critical because it shapes every security decision that follows.

Security professionals often describe their mission through the CIA triad: confidentiality, integrity, and availability.

Confidentiality ensures information is only accessible to authorized individuals.

Integrity ensures information remains accurate, trustworthy, and protected from unauthorized modification.

Availability ensures systems and data remain accessible when needed.

These principles form the foundation of modern information security, but maintaining them is never free. Every control introduces cost, complexity, friction, or operational overhead.

This is why cybersecurity management is fundamentally a risk management discipline.

Organizations are constantly balancing protection against business objectives, operational requirements, financial constraints, and user needs.

The question is rarely:

"Can we secure this?"

The more important question is:

`How much security makes sense given the risk?`

## Three Security Principles Behind Most Controls

### Least Privilege
Users, services, applications, and processes should receive only the privileges required to perform their role.

**Practical checks:**
- No shared admin accounts.
- No standing global admin access unless justified.
- Service accounts have scoped permissions.
- Privileged access is time-bound where possible.
- Access reviews are performed regularly.

### Separation of Duties
No single person should control all parts of a critical process.

**Examples:**

- Developer cannot approve their own production release.
- Payment creator cannot approve payment.
- System admin cannot also approve audit log deletion.
- Security exception requester cannot approve the exception.

### Defense in Depth
Security should use multiple layers so one failed control does not collapse the entire program.

**Example layered model:**
```text
Identity control -> endpoint control -> network control -> application control -> logging -> detection -> response -> recovery
```

## What Is a Security Control?
A security control is a **mechanism, policy, process, or procedure** that reduces risk, counters a threat, fixes a vulnerability, prevents harm, detects failure, or helps recover from an incident.

Controls are not just tools. A control can be:

- A firewall rule.
- A formal approval process.
- A password policy.
- A backup procedure.
- A training program.
- A change-management workflow.
- A log review process.
- A physical door lock.
- A quarterly access review.

### Control Quality Test
A good control should answer:

```text
What risk does it reduce?
What asset does it protect?
Who owns it?
How does it operate?
How often does it run?
What evidence proves it works?
What happens if it fails?
Who reviews the result?
```

## Understanding Risk Before Building Controls
One of the most common mistakes organizations make is implementing security controls before fully understanding what they are trying to protect.

Effective security begins with context.

Before evaluating risks, an organization must understand its assets.

Before selecting controls, it must understand the threats facing those assets.

Before determining acceptable safeguards, it must understand its own risk appetite.

These concepts sound simple, but they drive nearly every strategic security decision.

A financial institution, for example, may tolerate very little risk when it comes to customer data.

A startup operating in a highly competitive market may accept greater technical risk in exchange for speed and innovation.

Neither approach is inherently correct or incorrect.

The appropriate level of security depends on organizational priorities and the consequences of failure.

## Why Asset Ownership Matters
Security becomes difficult when nobody knows who owns something.

For this reason, mature security programs typically assign ownership to assets wherever possible.

An asset may be a system, database, application, process, service, dataset, or even a business capability.

The challenge is that the term "asset" can be surprisingly ambiguous.

Modern organizations operate complex environments where ownership is often shared across departments, teams, and vendors. Defining clear accountability is not always easy.

Despite that complexity, establishing ownership remains important because security decisions ultimately require someone responsible for understanding risk, approving controls, and making informed decisions about protection.

Security without ownership often becomes security without accountability.

## Security Management Is Never Finished
Many organizations treat security frameworks as projects.

They achieve compliance, complete an audit, or finish a certification exercise and consider the work done.

That mindset creates problems.

An Information Security Management System (ISMS) should function as a living system rather than a static document.

Threats evolve.

Technologies change.

Business priorities shift.

Attackers develop new techniques.

A security program that was appropriate last year may be insufficient today.

Effective cybersecurity management requires continuous reassessment, adaptation, and improvement.

The threat landscape never stands still.

Neither can the security program.

## Does Every Security Professional Need Deep Technical Expertise?
This question generates debate across the industry.

On one side are those who argue that modern security controls are increasingly technical and therefore require deep knowledge of systems, networks, programming, and infrastructure.

There is certainly truth in that argument.

Many security roles require significant technical expertise.

But extending that requirement to everyone involved in cybersecurity quickly becomes problematic.

Cybersecurity is broader than technical implementation.

The employee reporting a phishing email contributes to security.

The manager approving budgets contributes to security.

The legal team handling regulatory obligations contributes to security.

The executive leadership team establishing risk tolerance contributes to security.

In fact, one could argue that the individual ultimately responsible for cybersecurity is often the CEO or board of directors, many of whom do not come from technical backgrounds.

Cybersecurity is everyone's responsibility.

For some people, it is their profession.

For everyone else, it remains part of their role within the organization.

The most mature security programs recognize both realities simultaneously.

## Standards
Security standards exist because organizations face many of the same challenges repeatedly.

Rather than reinventing solutions, standards provide common frameworks for governance, risk management, and control implementation.

One useful distinction is between de facto and de jure standards.

De facto standards emerge organically because they solve real problems or become widely adopted by industry leaders. Organizations follow them because they work.

De jure standards, by contrast, originate from official standards bodies and formal regulatory processes.

Interestingly, many de facto standards eventually become de jure standards once they receive formal recognition.

This pattern appears repeatedly throughout technology history.

The internet itself operates largely because of standards developed through open, collaborative processes rather than purely regulatory mandates.

## The Documentation Debate
One criticism frequently directed at security frameworks is that they generate excessive documentation.

Risk assessments, policies, procedures, governance records, audits, and compliance reports all consume time and resources.

Critics argue that organizations would be better served by spending that effort on actual security improvements.

This argument creates a false choice.

Documentation alone does not improve security.

An organization can produce hundreds of pages of policies and still remain vulnerable.

At the same time, organizations that implement controls without documenting them create a different set of problems. Knowledge becomes tribal, decision-making becomes opaque, and critical context disappears when key personnel leave.

Documentation should support action.

Action should be documented.

Neither extreme creates an effective security program.

The objective is balance.

## Understanding Threats, Risks, and Controls
A threat is anything capable of undermining confidentiality, integrity, or availability.

An attacker reading information without authorization threatens confidentiality.

An attacker modifying information threatens integrity.

An attacker deleting, encrypting, or overwhelming systems threatens availability.

These concepts appear simple, yet they form the foundation of modern risk management.

Security controls exist to reduce either the likelihood or impact of those threats.

Some controls prevent attacks.

Others detect them.

Others enable recovery when prevention fails.

Because prevention eventually fails for every organization, resilience becomes just as important as protection.

The most mature security programs assume incidents will occur and prepare accordingly.

## Beyond the CIA Triad
The CIA triad remains one of the most useful conceptual models in information security, but many practitioners argue that it does not fully capture everything modern organizations require.

Concepts such as accountability and non-repudiation become increasingly important in complex environments.

After all, understanding what happened, when it happened, and who performed an action often determines how effectively an organization can respond to an incident.

Perfect confidentiality, integrity, and availability are unattainable goals.

Security management is therefore not about achieving perfection.

It is about building resilience when perfection inevitably fails.

## Security Culture Is the Hidden Control
Technology can enforce rules.

Policies can define expectations.

Governance frameworks can establish accountability.

But culture often determines whether any of those things work.

Security culture is frequently described as the attitudes, values, and beliefs people hold about security.

In reality, it extends much further.

Culture shapes how people perceive risk.

It influences which behaviors are rewarded and which are discouraged.

It determines whether employees report suspicious activity or ignore it.

It affects whether security becomes part of everyday decision-making or remains someone else's problem.

What makes culture particularly interesting is that it is not fixed.

Organizations often treat culture as an immutable characteristic when it is actually a social construct shaped by incentives, leadership, communication, education, and shared experience.

The same forces that influence broader human behavior also influence security behavior.

Positive reinforcement.

Social pressure.

Structural incentives.

Leadership examples.

Training.

Communication.

All contribute to shaping how security is viewed throughout an organization.

## Security Is Ultimately About People
As security professionals gain experience, many discover a surprising truth.

The most difficult security problems are rarely technical.

They are organizational.

Technology can usually be purchased, deployed, or configured.

Changing human behavior is far harder.

This is why cybersecurity management extends far beyond firewalls, encryption, and access controls.

At its core, cybersecurity management is the practice of helping an organization understand risk, make informed decisions, build resilience, and foster a culture capable of supporting security over the long term.

The technology matters.

The controls matter.

The standards matter.

But in the end, every one of those things depends on people.

## Security Management, Risk, and the Human Side of Cybersecurity
Many people enter cybersecurity expecting to spend their time dealing with firewalls, malware, penetration tests, and technical controls. Yet as organizations mature, an interesting realization emerges: cybersecurity is rarely limited by technology. More often, it is limited by governance, risk management, leadership, communication, and human behavior.

Security management sits above the technical layer. It provides the structure that allows security controls, policies, processes, and people to work together in support of business objectives. Without that structure, even the most advanced technical defenses eventually become fragmented, inconsistent, and difficult to sustain.

Understanding security management means understanding standards, risk, compliance, people, and organizational decision-making. Technology remains important, but it becomes only one component of a much larger system.

## Security Frameworks Are Different Tools for Different Organizations
One of the first questions many organizations face is whether to adopt frameworks such as NIST or ISO 27001.

The answer is rarely straightforward because the two approaches solve slightly different problems.

The NIST Cybersecurity Framework provides a practical and flexible structure for identifying, protecting, detecting, responding to, and recovering from security threats. It is often favored by organizations seeking operational guidance and continuous improvement rather than formal certification.

ISO/IEC 27001 approaches security from a management-system perspective. The framework focuses on governance, risk management, policy development, and ongoing organizational oversight. For many organizations, one of its biggest attractions is the ability to obtain formal certification through independent auditing.

Choosing between the two often depends on organizational maturity, regulatory requirements, customer expectations, and business objectives.

If certification is a strategic requirement, ISO 27001 often becomes the preferred path.

If operational flexibility and iterative improvement are the priority, NIST may provide a better fit.

Many mature organizations ultimately use both.

## Security Policies Must Support Business Goals
One of the most common mistakes in security governance is treating policies as isolated security requirements rather than business tools.

A security policy that conflicts with organizational objectives will eventually be ignored, bypassed, or weakened.

Consider a policy built around strict need-to-know access principles.

On paper, this sounds sensible.

But what happens when the organization simultaneously encourages experimentation, innovation, and cross-functional collaboration?

A conflict emerges immediately.

If everyone needs access to data in order to innovate effectively, an overly restrictive policy begins working against the business rather than supporting it.

Good security policies align with organizational goals.

They should enable secure business operations rather than simply impose restrictions.

The best policies provide guidance without creating unnecessary friction.

## Understanding ISO 27001 and ISO 27002
Many newcomers assume ISO 27001 and ISO 27002 are interchangeable.

They are not. ISO 27001 defines the requirements for establishing and operating an Information Security Management System (ISMS). It specifies what organizations must do to demonstrate compliance.

ISO 27002 provides implementation guidance for security controls. It explains how organizations may address security risks through practical safeguards and operational measures.

One of the most important concepts connecting these standards is the Statement of Applicability.

The Statement of Applicability explains which controls an organization has chosen to implement, which controls have been excluded, and the reasoning behind those decisions.

This document becomes one of the central artifacts within a mature ISMS because it demonstrates that security controls were selected intentionally rather than arbitrarily.

## The Difference Between ISO and NIST Philosophies

A fascinating distinction exists between ISO and NIST approaches.

NIST often feels modular and iterative. Its publications are loosely connected, frequently updated, and designed to evolve alongside changing threats and technologies.

ISO frameworks tend to emphasize consistency, governance, compliance, and certification.

Neither philosophy is inherently superior. They simply reflect different priorities.

Organizations seeking external validation, formal audits, and structured governance often gravitate toward ISO.

Organizations seeking practical guidance and operational flexibility frequently find NIST more approachable.

Understanding this distinction helps explain why security professionals often reference both ecosystems simultaneously.

## Certification Is More Than Passing an Audit
Many people imagine certification as a single event. In reality, achieving ISO 27001 certification is a process.

The journey usually begins with a gap analysis, where the organization's existing security practices are compared against the requirements of the standard.

Any deficiencies are identified and remediated before formal assessment begins.

The formal certification process itself typically occurs in multiple stages.

Auditors first verify that required policies, procedures, and governance mechanisms exist.

Afterward, they evaluate whether those controls actually operate effectively in practice. This distinction matters enormously. Documentation alone is not enough.

Organizations must demonstrate that controls are functioning and producing the intended outcomes.

Even after certification is awarded, ongoing surveillance audits ensure that compliance remains active rather than becoming a one-time exercise.

Certification is therefore less about passing a test and more about demonstrating sustained security management over time.

## Risk Management Is the Foundation of Security
Before an organization can manage security, it must understand risk. Before it can understand risk, it must understand threats. And before it can understand threats, it must understand the assets being protected.

This sequence is important because risk does not exist in isolation. A weak password is not a risk by itself. A vulnerability is not a risk by itself.

Risk emerges when a vulnerability affecting an asset can be exploited by a threat actor in a way that creates meaningful consequences.

This distinction often separates mature security programs from immature ones.

Security is not about eliminating every vulnerability.

It is about understanding which vulnerabilities actually matter.

## The Organization Boundary No Longer Exists
Traditional security models assumed a clear distinction between internal and external environments.

Employees worked inside offices. Systems lived inside data centers. Perimeters separated trusted users from untrusted users. That world has largely disappeared.

Cloud computing, remote work, SaaS platforms, mobile devices, contractors, partners, and distributed teams have fundamentally blurred organizational boundaries.

Modern security management must therefore operate under a different assumption: The organization extends far beyond its physical walls. Risk assessments must reflect that reality.

Trust relationships, third-party dependencies, cloud services, and external integrations all become part of the security landscape.

## Risk Assessments Are About Consistency
ISO 27001 places significant emphasis on risk assessment processes.

Not because risk assessments themselves improve security, but because consistent decision-making improves security.

Organizations must define:
- Risk criteria
- Risk acceptance thresholds
- Assessment methodologies
- Analysis procedures
- Evaluation processes
- Treatment strategies
    

The objective is not to eliminate uncertainty. The objective is to create repeatable and defensible decision-making. Different teams assessing the same risk should reach similar conclusions. Without consistency, security becomes subjective and difficult to manage at scale.

## Significant Changes Require New Risk Assessments
Risk management is not a one-time exercise. Organizations change continuously.

Infrastructure evolves. Business priorities shift. New technologies appear. Acquisitions occur. Cloud migrations happen. Office locations move.

Each of these changes may alter the organization's risk profile significantly. This is why risk assessments must be revisited whenever major changes occur. A security program that fails to reassess risk eventually drifts away from reality.

## Risk Treatment Is More Complicated Than It Looks
Once a risk has been identified and evaluated, organizations must decide what to do about it.

Common treatment strategies include:
- Mitigation
- Transfer
- Avoidance
- Acceptance
    

At first glance these options appear simple. In practice, they create secondary risks. Consider cyber insurance.

An organization may transfer financial exposure to an insurer, reducing its direct risk. But what happens if the insurer becomes insolvent?

The transferred risk suddenly returns. Every treatment introduces new assumptions that must themselves be evaluated.

Risk management therefore becomes a continuous process rather than a final decision.

## The Problem With Numerical Risk Scores
Organizations love numerical risk scoring systems. They create dashboards, charts, rankings, and metrics that appear objective. The challenge is that many risk assessments are fundamentally qualitative. When subjective judgments are converted into numerical values, the mathematics can create misleading conclusions.

For example, reducing a likelihood score from two to one may appear to reduce risk by twenty-five percent under one calculation method and fifty percent under another.

Which figure is correct?
The answer depends entirely on the assumptions embedded within the scoring model.
Numbers create an illusion of precision that may not actually exist. This is why experienced risk practitioners treat numerical scores as decision-support tools rather than objective truths.

## Security Is a Socio-Technical System
Perhaps the most important lesson in modern security management is that security is neither purely technical nor purely human.

It is socio-technical.

Technology influences people.

People influence technology.

Policies influence behavior.

Behavior influences risk.

Every security control ultimately operates within a human context.

Age, education, language proficiency, disability status, social background, technical literacy, and personal experiences all influence how people interact with security controls.

Ignoring those factors often produces ineffective security outcomes.

The strongest technical solution can fail if users cannot understand it, access it, or incorporate it into their daily work.

## Positive Security vs. Negative Security
Traditional security thinking focuses heavily on protection from harm.

This can be thought of as negative security.

Users are protected from attackers, fraud, compromise, or unauthorized access.

Positive security takes a different perspective.

Instead of asking what users are protected from, it asks what users are enabled to do.

A spam filter, for example, does more than block malicious emails.

It enables users to focus on productive work without constant interruptions.

The distinction matters because effective security should not only reduce risk.

It should also improve people's ability to achieve their goals safely.

## Security Controls Must Be Designed Around People
Many organizations implement security controls with the assumption that users will simply adapt.

Reality rarely works that way. A control that ignores human needs often generates workarounds rather than compliance.

Effective security design requires:

- Leadership support
- Clear communication
- Accessible documentation
- Understanding user experiences
- Consideration of different user groups
- Alignment with business objectives
    
The objective is not merely to deploy controls. The objective is to create controls people can actually use successfully.

## Trust Is a Security Control
Trust occupies a unique position within security management. It is difficult to measure, difficult to quantify, and yet essential to almost every successful security program.

Organizations often attempt to solve insider threats through increased monitoring. While monitoring has value, excessive surveillance can erode trust and damage organizational culture.

History has repeatedly shown that monitoring alone does not eliminate insider threats. Highly monitored environments have still experienced some of the most significant information leaks in modern history.

Trust and verification are not mutually exclusive. The most effective security programs balance transparency, accountability, communication, and technical controls without creating adversarial relationships between security teams and employees.

## IT Governance
The installation of a strategic governance infrastructure will quite often represent a radical change in the way the organization does business. 

Accordingly, the most straightforward way to overcome that resistance is to initiate the governance from the top. Top-down effectively describes the strategic approach and purposes of information governance. Moreover, it is this strategic concept that drives the deployment of the type of control systems we are discussing in this book. As such, we need to spend some time explaining what the general principles embodied in information governance are and how they work. 

The term information governance was coined to describe the strategic function that underwrites due professional care in the management of the organization’s information resources. 

It is a novel concept in the well-established world of enterprise governance, in that the strategic management of the information and communication system function has traditionally been seen as a corporate side-show with limited strategic relevance when compared with investment or marketing strategies.

However, with the increasing impact of cyber-crime and computers in general, and the overall reliance of business on effective IT functioning information governance, has taken its place as a separate but integral part of the strategic management process (Ponemon Institute Research Report, 2013). This presupposes that the information control function must meet the same expectations and criteria for quality, fiduciary, and operational integrity as every other aspect of the business. It also assumes that the business’s information and related technology processes must support its larger goals in an explicit and traceable way.
Information technology governance accomplishes its aims by building a comprehensive structure of rational procedures and relationships, which can be employed to direct and control information assets. As a result, IT governance establishes a tangible link between the company’s IT resources and its information and business strategy. Ideally, it does this in such a way that it adds value to the enterprise’s purposes.

![](1.png)

It should be noted that information governance is not the same as enterprise governance. Enterprise governance assures stakeholders that the business will be profitable and productive. It embodies the strategic and tactical means to monitor that issues vital to business success will be effectively identified and dealt with. 

The aim of IT governance is to ensure information’s
◾◾Effective use
◾◾Efficient use
◾◾Confidentiality
◾◾Integrity
◾◾Proper distribution
◾◾Compliance with regulations
◾◾Continuous availability

The overall aim of organizational governance is to build a tangible control and accounting structure in order to maintain accountability for specific organizational functions. While IT governance is enabled by specification of policies; organizational structures, practices, and procedures are required to achieve particular ends. 

That includes the definition of explicit control elements for any given requirement. Properly stated, this insures that due professional care is exercised in the management, use, design, development, maintenance, or operation of information systems and information assets. This is comprehensive and coherent for the aspect being controlled. It is based on explicit control objectives, the outcome of which is observable.

This control is integrated with other controls to achieve a general accountability. IT governance involves a number of related processes to explicitly account for and manage an identified resource on a systematic and ongoing basis, for example, money, parts, and so on. 

Assessment is exploratory and often done for the purpose of finding out something specific about an organizational function, for example, its level of risk or asset categorization. Thus, the role of information governance is to know the precise status of an asset at all times. In the case of process assessment, this is usually a snapshot and requires periodic reviews.

## Information Audit and Control
The investigation and evidence gathering activity that supports this overall control process is called `information audit`. Generally speaking, the audit function is well known to most IT managers. It can be conducted both externally (audit) or internally (internal audit). Audits are normally held at preplanned times or at predetermined milestones as specified in a project plan. Audits are performed based on audit criteria, and the company’s management has to agree on all outcomes and responsibilities for any action item and closure criteria. The purpose of the audit process is to gather sufficient reliable, pertinent, and practical evidence to demonstrate that the defined security and performance control objectives have been satisfied.

At the point where the audit is deemed completed, any and all objective data and conclusions obtained must be authenticated by means of a suitable analysis, and justified through a careful consideration of the meaning of that evidence. 

Audits are different from reviews and assessments in that they provide objective third-party certification of conformance to regulations and/or standards. 

Items that may be audited include:
◾◾Plans
◾◾Contracts
◾◾Complaints
◾◾Procedures
◾◾Reports and other documentation
◾◾Deliverables

Audits are normally demanded by external organizations, such as regulatory bodies to verify compliance with requirements. Audits might also be conducted by the organization itself in order to verify compliance with internal plans, regulations, and guidelines, or to do a third-party verification of compliance with external standards or regulations. 

The auditor is by definition a disinterested third party, even if the actual audit is conducted internally.
Audits are done in order to determine to what extent a given function or system
◾◾Achieves its objectives
◾◾Adheres to corporate requirements
◾◾Complies with regulatory requirements
◾◾Meets customers’ contractual requirements
◾◾Conforms to a recognized standard
◾◾ Verify that it continues to meet requirements

Audits are always carefully planned. That planning assigns the tasks of the various participants in the audit. There are basically four types of participants as follows:
◾◾Auditee—The organization being audited
◾◾Lead auditor—The chief auditor
◾◾Auditor—Other auditors on the audit team
◾◾Client—The organization that engaged the auditors

Because they are more expensive than reviews and assessments, audits are always carefully planned and resourced. Since they are formal they require careful scheduling, resourcing, and funding assurance. The selection of the auditor and the assignment of roles and responsibilities is also a formal process. The aim is to assure audit integrity.

### Reasons for Conducting an Audit
An organization may initiate an audit because a regulatory agency requires an audit. Audits are also conducted because a previous audit indicated that a follow-up audit was needed. Companies will also carry out internal audits on a regular basis to improve system performance or to achieve business objectives.

Information system assurance audits always operate within an explicit asset accounting and control framework that is comprehensive and coherent for the aspect being controlled. They must be based on explicit objectives the outcome of which is observable. Information system security audits are normally based around an accounting and control model such as COBIT or ISO 27000 in the private sector and NIST 800-53 in the public sector.

At the highest level, the general audit approach is supported by the selected control model, especially the process classification and the definition of the requirements for the audit process itself. That includes the guidelines for the conduct of the IT process auditing and the general principles of control, which are normally specified in the model. The detailed audit guidelines for each IT process are typically specified in the main body of the publication.

The guidelines are presented in a standard template form. This template details the generic IT audit guidelines as well as to the detailed audit approach. Using this template, the auditor can tailor the specific audit process to meet local conditions including the selection of detailed control objectives through
◾◾ Sector specific criteria
◾◾ Industry standards
◾◾ Platform specific elements
◾◾ Detailed control techniques employed

It is important to note that in its specific application all of the control objectives in the template are not necessarily applicable always and everywhere. Therefore, a high-level risk assessment is often carried out in order to determine which objectives need to be specifically adapted for audit purposes and which may be ignored.

The objectives of the overall auditing and control formulation process are to provide management with reasonable assurance that control objectives are being met and where there are significant vulnerabilities identified, to substantiate the process for addressing the resulting risks and advise management on the corrective actions required. 

The generally accepted approach to control formulations and conduct of the audit is to:
◾◾ Identify and document areas for control
◾◾ Evaluate control effectiveness
◾◾ Undertake compliance testing where appropriate
◾◾ Undertake substantive testing of targeted areas where required

In order to do this successfully, the organization must obtain an understanding of business requirements related risks and relevant control measures, and then evaluate the appropriateness of stated controls. That might include assessing compliance by testing whether the stated controls are working as prescribed, consistently, and continuously. It also involves substantiating the risk of control objectives not being met. This is done by using analytical techniques and/or consulting alternative sources.

### Conducting an Audit
The first step is to determine the correct scope of the audit. This requires investigation, analysis, and definition of the business processes concerned. Platforms and information systems, which are supporting the business process as well as connections with other systems. The IT roles and responsibilities also need to be defined, including what has been in- or outsourced. That connects the audit to all associated business risks and strategic choices.

The next step is to identify the information requirements which are of particular relevance with respect to the business processes. Then, there is a need to identify the inherent IT risks as well as overall level of control that can be associated with the business process. To achieve this, there is a need to identify all recent changes in the business environment having an IT impact and any recent changes to the IT environment, such as new developments. Finally, there is the need to identify all recent incidents relevant to the controls and business environment.

On the basis of the information obtained, it is possible to select and tailor out the relevant control processes from the overall audit template selected as well as to target the business resources that apply to them. 

This could require certain parts of the business operation to be audited several times, each time for a different platform or system.
Finally, all the steps, tasks, and decision points to perform the audit need to be considered. That requires the business to define the explicit audit scope and the business processes concerned. It requires the business to identify all platforms, systems, and their interconnectivity, supporting the process as well as the roles, responsibilities, and organizational structure of the personnel resources. 

Finally, the business must identify the information requirements relevant to the execration of the process. In addition, the relevance of the audit target to the business process has to be justified, which includes all of the following:
◾◾ Inherent IT risks and overall level of control
◾◾ Recent changes and incidents in business and technology environment
◾◾ Prior results of audits, self-assessments, and certification
◾◾ All relevant monitoring controls applied by management
◾◾ nAll processes and platforms to audit
◾◾ All relevant business processes
◾◾ Requisite resources
◾◾ Controls by risk
◾◾ Decision points

### Auditing Process Steps
The auditing process is built around a number of logical sequential steps. The first step is to determine the correct scope of the audit. This requires investigation, analysis, and definition of the business processes concerned. Platforms and information systems, which are supporting the business process, are audit targets as well as connections with other systems. The IT roles and responsibilities that might be investigated include in- or outsourced organizational objects and functions and the associated business risks and strategic choices.

The next step is to identify the information requirements which are of particular relevance with respect to the business processes. 

Along with that identification comes the need to identify the inherent IT risks as well as overall level of control that can be associated with the business process. To carry this out properly, there is a need to identify the following:
◾◾ Recent changes in the business environment having an IT impact
◾◾ Recent changes to the IT environment, new developments, and so on
◾◾ Recent incidents relevant to the controls and business environment
◾◾ IT monitoring controls applied by management
◾◾ Recent audit and/or certification reports
◾◾ Recent results of self-assessments

Depending on the information that is obtained, it is possible to target the relevant processes for investigation as well as the resources that apply to them. This could require that certain key processes might be audited several times, each time for a different platform or system. The audit strategy should be determined on the basis of how the detailed audit plan should be further elaborated. Finally, all the steps, tasks, and decision points to perform the audit need to be considered. That includes the following 16 considerations:
1. Definition of audit scope
2. Identification of the business process concerned
3.  Identification of platforms, systems and their interconnectivity, supporting the process
4. Identification of roles, responsibilities, and organizational structure
5. Identification of information requirements relevant for the business process
6. Identification of relevance to the business process
7. Identification of inherent IT risks and overall level of control
8. Identification of recent changes and incidents in business and technology environment
9. Identification of the results of prior audits, self-assessments, and certification
10. Identification of monitoring controls applied by management
11. Selection of relevant processes and platforms to audit
12. Identification of the overall process architecture
13. Itemization of resources
14. Establishment of audit strategy
15. Itemization of controls, by risk
16. Identification of decision points
17. 
The first 10 items are primarily oriented toward process understanding and determining ownership. 

![](3.png)

The general principles of control can also supply additional insight on how to conduct a pepper audit. These principles are primarily focused on process and control responsibilities, control standards, and control information flows. Control, from a management point-of-view, is defined as determining what is being accomplished. That is, evaluating the performance and if necessary applying corrective measures so that the performance takes place according to plan.

The control process consists of four steps. First, a standard of desired performance is specified for a process. Second, a means of sensing what is happening in the process is developed. 

Third, the entity responsible for ensuring management control compares the process information with the requirements of the standard. Fourth, if what is actually happening does not conform to the standard, the entity responsible for ensuring management control directs that corrective action be taken. This is also conveyed as information back to the control formulation process.

For this process to work, the responsibility for the business or IT process must be clear and that accountability must be unambiguous. If not, control information will not flow and corrective action will not be acted upon. 

The evaluation can be based on a very wide variety of criteria, from high-level plans and strategies to detailed measurable key performance indicators and critical success factors. Clearly documented, maintained, and communicated control objectives are a must for a good control process.

Clear responsibility for custodianship of these standards also is a requirement for good control. In essence, the control process must be well documented with clear responsibilities. An important aspect in this is the explicit definition of what constitutes a nonconformity, that is, what are the limits of deviation. 

Finally, the timeliness, integrity, and appropriateness of control information, as well as other information, are basic to the good functioning of the control system and are something the auditor must address.
Both control information and corrective action information will have requirements as to evidence in order to establish accountability after the fact. 

The following audit steps are performed to document the activities underlying the control objectives as well as to identify the stated control measures/procedures in place. 

Interview appropriate management and staff to gain an understanding of
◾◾ Business requirements and associated risks
◾◾ Organization structure
◾◾ Roles and responsibilities
◾Policies and procedures
◾◾Laws and regulations
◾◾Control measures in place
◾◾Management reporting (status, performance, action items)

Auditors will document the process-related IT resources particularly affected by the process under review in order to obtain the requisite information. The aim is to confirm the understanding of the process under review as well as the key indicators of the adequate performance of the process and the control implications. 

Effectiveness and appropriateness of control measures for the process under review, or the degree to which the control objective is achieved, can be evaluated using the following criteria:
◾◾Documented processes exist
◾◾Appropriate deliverables exist
◾◾Responsibility and accountability are clear and effective
◾◾Compensating controls exist, where necessary
◾◾The degree to which the control objective is met

A different set of audit steps are necessary in order to ensure that the control measures established are working as prescribed. These require the auditor to obtain direct or indirect evidence to ensure that the audit procedures themselves have been complied properly for the period under review. Therefore, using both direct and indirect evidence the auditor will perform a limited review of the adequacy of the process deliverables. In addition, the auditor will determine the level of substantive testing and additional work needed to provide assurance that the IT process is adequate.

Finally, there are audit steps that need to be performed to substantiate the risk of the control objective not being met. The objective of these steps is to support the audit report and to `shock` management into action where necessary. 

Needless to say, auditors have to be creative in finding and presenting this often sensitive and confidential information:
◾◾Document the control weaknesses, and resulting threats and vulnerabilities.
◾◾Identify and document the actual and potential impact; for example, through root-cause analysis.
◾◾Provide comparative information, for example, through benchmarks.
When assessing control mechanisms, reviewers should be aware that controls operate at different levels in the operation and also in the lifecycle and that they have intricate relationships. 

The control framework that is selected will provide some indication as to different control processes, levels, and interrelationships, but actual implementation or assessment of control systems needs to take this added complex dimension into account.

### Information Security Governance
It is the responsibility of the board and the executive management to develop and practice corporate governance. The aim of corporate governance is to provide strategic direction, ensure that business objectives are achieved, manage risk appropriately, and ensure the organization’s resources are used responsibly. Information security governance is a subset of corporate governance and the most fundamental purpose of an information security program is to help ensure the preservation of the organization and its ability to operate. In a properly governed organization, information assurance activities support the organizational goals and objectives while identifying and reducing risk to definable and acceptable levels. Increasing predictability, improving trust in customer relationships, and protecting the organization’s reputation are significant benefits of good governance. 

As senior managers are considered ultimately responsible and legally liable for losses due to cybersecurity breaches, it is vital that they understand the significance of and implement effective information security governance.

To exercise effective IT governance, boards of directors and executive management must have a clear understanding of what to expect from their enterprise’s information security program.

Effective information security governance should result in six outcomes to include (Information Systems Audit and Control Association [ISACA], 2012) the following:
1. `Strategic alignment`—security activities must be aligned with the business strategy to support the organization objectives. Security solutions take into account the governance style, organizational culture, technology deployed, and the structure of the organization.
2. `Risk management`—risk mitigation should be based on the organization’s risk profile, acceptable levels of risk, understanding of risk exposure, and the potential impact/consequences of residual risk.
3. `Business process management/value delivery`—this includes the integration of all relevant information assurance processes and practices to maximize the effectiveness and efficiency of security activities.
4. `Resource management`—efficient and effective use of information security knowledge and infrastructure to ensure knowledge is captured and available to develop and document security processes and practices.
5. `Performance management`—develops a measurement process, aligned with strategic objectives, to aid in effective decision making. This includes continuous monitoring and reporting of information security processes and independent external assessments and audits.
6. `Integration`—ensures that processes function as intended from end to end.

Information security governance requires strategic direction and commitment, and as such, members of the board need to be involved in setting and approving policy, appropriate resource allocation, and assigning responsibility for information security management. The organization’s executive management team is then responsible for ensuring the needed infrastructure, resources, and organizational functions are made available to carry out the directives of the board and any governmental regulatory agency that is required. Many organizations have created the position of chief information security officer (CISO) and have given it the responsibility and authority over the full scope and breadth of information security activities. 

The CISO develops, oversees, and manages the information security program and initiatives to include strategic, personnel, infrastructure, policy enforcement, emergency planning, security training, and awareness. The CISO also leads the evaluation and assessment of the security program to ensure that all aspects are in compliance with security requirements.
Security affects all aspects of the organization and to be effective it must be pervasive throughout the organization. Ideally, information security will be managed in such a way as to create an organizational security culture.