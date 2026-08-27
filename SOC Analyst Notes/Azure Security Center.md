

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)
### Secure Cloud vs Cloud Security

| Term | Meaning |
|---|---|
| **Cloud security** | The security services, controls, monitoring, and architecture available in the cloud platform. |
| **Secure cloud** | The actual secured state of your cloud environment after you apply identity, network, data, monitoring, and governance controls. |
| **Azure Security Center / Defender for Cloud** | The Azure-native security management and monitoring layer used to assess resources, generate recommendations, detect threats, and guide remediation. |

### What Azure Security Center Is For

Use it to:

- Maintain a central view of cloud resource security health.
- Apply and monitor cloud security policies.
- Review automated recommendations.
- Detect threats using analytics, behavioral profiling, anomaly detection, and threat intelligence.
- Deploy integrated partner security solutions.
- Improve security posture across Azure infrastructure, especially IaaS and PaaS workloads.
- Shorten the time between compromise, detection, and remediation.

---

## 2. Shared Responsibility Model

The most important cloud security lesson: **moving to Azure does not remove your security responsibilities. It changes them.**

| Model | Microsoft Handles More Of | Customer Still Owns |
|---|---|---|
| **On-premises** | Nothing below the physical stack unless outsourced. | Everything: applications, data, runtime, OS, virtualization, servers, storage, network, governance. |
| **IaaS** | Physical datacenter, hardware, core virtualization, underlying cloud infrastructure. | Applications, data, identity, OS hardening, patching, network rules, access control, monitoring. |
| **PaaS** | More runtime, OS, and platform management. | Application security, data protection, identity, configuration, access governance. |
| **SaaS** | Most application/platform infrastructure. | Data governance, identity, user access, compliance configuration, business processes. |

### High-Risk Misunderstanding

Do **not** assume Azure automatically secures:

- VM operating systems.
- Public IP exposure.
- Inbound RDP/SSH rules.
- Weak identity practices.
- Poor application code.
- Secret leakage.
- Data classification.
- Misconfigured storage.
- Shadow IT subscriptions.
- Third-party marketplace appliances.

---

## 3. Azure Security Center / Defender for Cloud Capabilities

### Main Operational Areas

| Area                     | Purpose                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| **Security policy**      | Defines what security checks and controls apply to your subscription.          |
| **Security assessment**  | Reviews resource configuration and posture.                                    |
| **Recommendations**      | Shows security weaknesses and remediation guidance.                            |
| **Security alerts**      | Shows suspected attacks or suspicious behavior.                                |
| **Data collection**      | Collects VM, network, OS, and security event telemetry.                        |
| **Partner integrations** | Adds tools like WAF, NGFW, endpoint protection, and vulnerability assessment.  |
| **Threat intelligence**  | Correlates observed activity with known malicious infrastructure and behavior. |

### Advanced Detection Examples

Azure Security Center uses multiple detection methods:

- **Anomaly detection**: statistical baselines and unusual behavior.
- **Behavioral analytics**: known malicious behavior patterns.
- **Threat intelligence**: known malicious IPs, domains, infrastructure, and campaigns.
- **Kill-chain synthesis**: connecting related events into attack timelines.
- **Brute-force detection**: SSH/RDP login attacks and failed exploitation attempts.
- **Web application exploitation detection**: signs of app-layer compromise.
- **Command-and-control monitoring**: suspicious outbound communication.

---
