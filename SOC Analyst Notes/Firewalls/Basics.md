[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

### Definition
A firewall is software or hardware that monitors the network traffic and compares it against a set of rules before passing or blocking it. The most basic firewall should be able to inspect at least the packet's protocol, source and destination port and IP addresses.
### Firewall types based on packet filtering
 - `Packet filtering firewalls` or dubbed as stateless firewalls. These firewalls inspect each data packet as it travels through a network. They decide whether to block a specific packet based on the configured rules.
 - `Application-layer firewalls` can be a physical appliance using its own hardware or software-based installed on another machine, like a plug-in or a filter. These types of firewalls target applications and monitor their behavior. For example, if placed in front of a web server, they can inspect requests for HTTP connections and block abnormal floods of traffic indicating a DOS attack.
- `Circuit-level firewalls` check whether TCP and UDP connections across a network are valid before data is exchanged. For example, this type of firewall might first check whether the source and destination addresses, the user, the time, and the date meet certain defined rules. Data is exchanged between parties without further investigation when these checks pass, and a session starts.
- `Proxy server firewalls`  or called as web application firewalls. They control the information that goes in and out of a network. This ability means the server can monitor, filter, and cache data requests to and from a network. Firewall proxy servers provide safe and secure internet access to all devices on a network. As depicted in the image below, there can be no communication between the client machine and the internet without the proxy server.
-  `Stateful firewalls` inspect connections on a network. As traffic hits the firewall, it monitors all packets that go through it and stores a combination of information about the packets in a state table. The state table tracks sessions by recording port numbers as sessions start from inside the network and are transmitted outside of the network. Gathering this information helps the firewall recognize what legitimate traffic with the correct port numbers should look like upon its return, thus allowing legitimate replies back into the network. 
- `Next-generation firewalls` perform many of the same functions as stateful firewalls but with more functions from other types of firewalls, such as packet filtering and VPN support. This type of firewall also investigates packets more thoroughly compared to stateful firewalls. For example, a next-generation firewall can examine the payload for each packet and inspect it for suspicious characteristics and malware. Examples include the Juniper SRX series and Cisco Firepower
### Firewalls Classifications
1. Hardware Firewall: An appliance firewall is a separate piece of hardware that the network traffic has to go through. Examples include Cisco ASA (Adaptive Security Appliance), WatchGuard Firebox, and Netgate pfSense Plus appliance.
2. Software firewall: This is a piece of software that comes bundled with the OS, or you can install it as an additional service. MS Windows has a built-in firewall, Windows Defender Firewall, that runs along with the other OS services and user applications. Another example is Linux iptables and firewalld.

### Proxy and Proxy Types
#### Proxy
A proxy server is a variation of an application-level firewall or circuit-level firewall. A proxy server is used to mediate between clients and servers. Proxies are most often used in the context of providing clients on a private network with internet access while protecting the identity of the clients. 

Often a proxy serves as a barrier
against external threats to internal clients by accepting requests from clients, altering the source address of the requester, maintaining a mapping of requests to clients, and sending the altered request packets out. Once a reply is received, the proxy server determines which client it is destined for by reviewing its mappings and then sends the packets to the originally requesting client.
#### Proxy Types
`A forward proxy` is a standard or common proxy that acts as an intermediary for queries of external resources. A forward proxy handles queries from internal clients when accessing outside services.

`A reverse proxy` provides the opposite function of a forward proxy; it handles inbound requests from external systems to internally located services. A reverse proxy is similar to the functions of port forwarding and static NAT. A reverse proxy is sometimes used on the border of a screened subnet to use private IP addresses on resource servers but allows for visitors from the public internet.
### Firewall Rules
A firewall is  configured with many different rules, and together they create a firewall policy. The rules are per interface and direction. 

Rules are created using a list of elements that a firewall can check. These include:
- ***Source address*** – where the data has come from. This is typically an IP address but can also be a fully qualified domain name or FQDN. An FQDN is the name of a device on the internet, verified by an external DNS server. 
- ***Destination address*** – where the data is going. This is usually an IP address but can also be a fully qualified domain name (FQDN).
- ***Port and protocol numbers*** – the services that applications require.
- ***The interface***– rules can be associated with a particular interface or port on a firewall.
- ***Direction*** – whether the traffic is inbound or outbound.
- ***Time*** –specify when the data will or won't be permitted.
- ***The decision*** – whether to permit or deny the packet.
When creating firewall protocols, it's important to remember the following three rules:
- ***Top-down processing*** – a firewall starts at the top of a policy list, making its way down to the bottom, so the order of the rules is critical.
- ***Rule matched*** – if any incoming traffic matches the criteria of a firewall rule, the firewall will apply the specified allow or deny action without proceeding to the next rule. Any of the other rules below the matched rule will not be considered because firewalls implements top-down processing.
- ***Implicit deny*** – also known as deny all. This is typically an invisible rule applied when a firewall is initially set up, and it blocks all traffic from the start. It enables a firewall to protect the network as soon as it's activated. This rule remains active the whole time, so many firewall policies have permit statements (also known as allow statements) to allow necessary traffic through. Implicit deny is always the last rule on the rules list. And because it's active by default and invisible, it's important to remember it's there.

### Firewall configuration
***Configuring a firewall in Windows***
To configure new firewall rules and policies, follow the steps below:
Step 1: Open Windows Defender firewall
1. Navigate to the **Control Panel**. 
2. Select **System** and **Security**.
3. Select **Windows Defender Firewall.**
 Step 2: Adjust firewall settings.
4. On the left pane, select **Advanced settings**. Here, you can create inbound and outbound rules.
Step 3: Set new rule
5. Select **New Rule**, and choose the type of rule (program, port, etc.).
6. Follow the prompts to specify the conditions for the rule.
Step 4: Define action
7. Decide whether to allow or block the connection under specified conditions.
Step 5: Confirm the new rule
8. Give your rule a name, and provide an optional description. 
9. Select **Finish** to activate the rule.
***Configuring a firewall on macOS (Ventura)***
Step 1: Turn on firewall
10. Navigate to **System Preferences**, then **Network.**
11. Select the **Firewall** option. 
12. If the firewall is not already enabled, select **Turn on Firewall**.
 Step 2: Access advanced settings
13. To set up specific firewall rules, select **Options**.
Step 4: Set up new rule
14. Under **Options**, you can add or remove applications from the list and decide whether incoming connections should be allowed. 
15. Select **+** to add an application, select the application, and then select **Add**.
Step 5: Enable stealth mode (optional)
Enabling **Stealth Mode** makes your computer less visible to hackers by preventing it from responding to probing requests. When stealth mode is on, your Mac does not respond to ping requests or connection attempts from a TCP or UDP network.
Step 6: Save settings
16. Once you have made your changes, select **OK** to save. 
17. and then lock the panel again to prevent further changes.
