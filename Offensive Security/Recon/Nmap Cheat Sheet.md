[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

#### Conducting Normal Probing
##### Basic scan to reveal services with their version
You can control the intensity with `--version-intensity LEVEL` where the level ranges between 0, the lightest, and 9, the most complete. `-sV --version-light` has an intensity of 2, while `-sV --version-all` has an intensity of 9.
```bash
nmap -sV 10.10.10.3
```
It is important to note that using `-sV` will force Nmap to proceed with the TCP 3-way handshake and establish the connection. The connection establishment is necessary because Nmap cannot discover the version without establishing a connection fully and communicating with the listening service. In other words, stealth SYN scan `-sS` is not possible when `-sV` option is chosen.
##### Performing a scan on a list of targets IPs/Domains
```bash
nmap -iL targets.txt
```
##### Scan services with OS detection
```bash
nmap -sV -O 10.10.10.3
```
##### Enabling fast mode 
```bash
nmap -sV -F -O 10.10.10.3
```
##### Aggressive scan to reveal all details 
```bash
nmap -A 10.10.10.3
```
##### Using scripting engine to scan for vulnerabilities
 You can choose to run the scripts in the default category using `--script=default` or simply adding `-sC`
 ```bash
 nmap --script=default vuln 10.10.10.4
 ```
 Checking for vulnerabilities on the target we use the category `vuln`
```bash
nmap --script vuln 10.10.10.4
```
Some scripts belong to more than one category. Moreover, some scripts launch brute-force attacks against services, while others launch DoS attacks and exploit systems. Hence, it is crucial to be careful when selecting scripts to run if you don’t want to crash services or exploit them.

You can also specify the script by name using `--script "SCRIPT-NAME"` or a pattern such as `--script "ftp*"`, which would include `ftp-brute`. 
##### Performing service detection scan with full scripting engine scan
```bash
nmap -sC -sV 10.10.10.5
```
##### Performing a TCP connect scan on all ports, specifying a min number of packets and output the results to a file
```bash
nmap -sT -p- --min-rate 10000 -oA scan-results.txt 10.10.10.5
```
##### Performing UDP scan with aggressive speed
UDP is a connectionless protocol, and hence it does not require any handshake for connection establishment. We cannot guarantee that a service listening on a UDP port would respond to our packets. However, if a UDP packet is sent to a closed port, an ICMP port unreachable error (type 3, code 3) is returned. 

If we send a UDP packet to an open UDP port, we cannot expect any reply in return. Therefore, sending a UDP packet to an open port won’t tell us anything.

We expect to get an ICMP packet of type 3, destination unreachable, and code 3, port unreachable. In other words, the UDP ports that don’t generate any response are the ones that Nmap will state as open.
```bash
nmap -sU -T4  10.10.10.5
```
`-T4` is optional above.
##### Performing host discovery scan using APP Packets
```bash
nmap -PR -sn 10.10.210.6/24
```
##### Performing ICMP timestamp request to discover live hosts
```bash
nmap -PP -sn 10.10.210.6/24
-PE: ICMP mask request
-PE: ICMP echo request
```
##### Performing TCP+ICMP scan to discover live hosts
```bash
nmap -PS -sn 10.10.210.6/24  S: SYN
nmap -PA -sn 10.10.210.6/24  A: Acknowledgement
nmap -PU -sn 10.10.68.220/24 U: UDP 
```
You can go with [T0] but it would be very slow.
Acknowledgments scan are also useful for firewall evasion.
```bash
nmap -sA -T1 -f 10.10.10.5
```
##### Scanning Most Common 100 Ports on Fast Mode
If you want to scan the most common 100 ports, add `-F`. Using `--top-ports 10` will check the ten most common ports.
```bash
nmap --top-ports 100 -F IP
```
#### Firewall Detection 
It is essential to note that the ACK scan and the window scan are very efficient at helping map out the firewall rules. However, it is vital to remember that just because a firewall is not blocking a specific port, it does not necessarily mean that a service is listening on that port. For example, there is a possibility that the firewall rules need to be updated to reflect recent service changes. Hence, ACK and window scans are exposing the firewall rules, not the services.
##### Using TCP ACK Scan
An ACK scan will send a TCP packet with the ACK flag set. Use the `-sA` option to choose this scan. The target would respond to the ACK with RST regardless of the state of the port. This kind of scan would be helpful if there is a firewall in front of the target. Consequently, based on which ACK packets resulted in responses, you will learn which ports were not blocked by the firewall.
```bash
nmap -sA 10.10.224.131
```
##### Using TCP Windows Scan
The TCP window scan is almost the same as the ACK scan; however, it examines the TCP Window field of the RST packets returned. On specific systems, this can reveal that the port is open
```bash
sudo nmap -sW IP
```
##### A Null scan 
```bash
nmap -sN  10.10.210.6
```
##### Performing FIN 
```bash
nmap -FN 10.10.210.6
```
##### Using Nmap scripting engine
We can use http-waf-
detect script to detect if there is a WAF in place.
```bash
nmap --script=http-waf-detect ip
```
#### Firewall & IDS/IPS Evasion
##### Performing stealth and slow scan
```bash
nmap -sS -T1 -f 10.10.10.5
```
##### Performing Decoy scan to bypass firewall and IDS
```bash
nmap -D ip1,ip2,yourip TARGET-IP
```
You can pickup any IP address and you can put as many as you want.
The below specifies `RND` to indicate that the third and fourth IP addresses will be randomly generated.
```bash
nmap -D 10.10.0.1,10.10.0.2,RND,RND,yourip TARGET-IP
```
##### Spoofed Scan
For this scan to work and give accurate results, the attacker needs to monitor the network traffic to analyze the replies.
```bash
nmap -e eth0 -Pn -S SPOOFED_IP TARGET-IP
```
The above tells Nmap explicitly which network interface to use and not to expect to receive a ping reply. This scan will be useless if the attacker system cannot monitor the network for responses.

When you are on the same subnet as the target machine, you would be able to spoof your MAC address as well. You can specify the source MAC address using `--spoof-mac SPOOFED_MAC`. This address spoofing is only possible if the attacker and the target machine are on the same Ethernet (802.3) network or same WiFi (802.11).
##### Fragmented Scan
In this scan, The IP data will be divided into 8 bytes or less. Adding another `-f` (`-f -f` or `-ff`) will split the data into 16 byte-fragments instead of 8. You can change the default value by using the `--mtu`; however, you should always choose a multiple of 8.
```bash
nmap -sS -F IP
```
Note that if you added `-ff` (or `-f -f`), the fragmentation of the data will be multiples of 16. In other words, the 24 bytes of the TCP header, in this case, would be divided over two IP fragments, the first containing 16 bytes and the second containing 8 bytes of the TCP header.
##### Changing useragent for firewall and IDS evasion
```bash
nmap -sV --script-args http.useragent="useragenthere" ip
```
##### Controlling the speed of the scan
You can control the scan timing using `-T<0-5>`. `-T0` is the slowest (paranoid), while `-T5` is the fastest.
To avoid IDS alerts, you might consider `-T0` or `-T1`. For instance, `-T0` scans one port at a time and waits 5 minutes between sending each probe, so you can guess how long scanning one target would take to finish. If you don’t specify any timing, Nmap uses normal `-T3`. Note that `-T5` is the most aggressive in terms of speed; however, this can affect the accuracy of the scan results due to the increased likelihood of packet loss. Note that `-T4` is often used during CTFs and when learning to scan on practice targets, whereas `-T1` is often used during real engagements where stealth is more important.
Alternatively, you can choose to control the packet rate using `--min-rate <number>` and `--max-rate <number>`. For example, `--max-rate 10` or `--max-rate=10` ensures that your scanner is not sending more than ten packets per second.
##### Spoofed MAC Address
We can use the below command to spoof the source MAC address but make sure you are conducting such a scan from the same network that you and the target are connected to.
```bash
nmap -sS -Pn --spoof-mac MAC_ADDRESS IP-Target
```
##### Protocol/Port Modification
Depending on the target security solution, you can make your port scanning traffic resemble web browsing or DNS queries. In the below command, we used the option `-g PORT_NUMBER` (or `--source-port PORT_NUMBER`) to make Nmap send all its traffic from a specific source port number.
```bash
nmap -sS -Pn -g 80 -F IP
```
If you are interested in scanning UDP ports, use the below command that makes the traffic appear to be exchanged with a DNS server
```bash
nmap -sU -Pn -g 53 -F IP
```
##### Sending Invalid Packets
We can send invalid packets using `nmap` and `hping3`
Nmap makes it possible to create invalid packets in a variety of ways. In particular, two common options would be to scan the target using packets that have:
- Invalid TCP/UDP checksum
- Invalid TCP flags
Nmap lets you send packets with a wrong TCP/UDP checksum using the option `--badsum`. An incorrect checksum indicates that the original packet has been altered somewhere across its path from the sending program.
Nmap also lets you send packets with custom TCP flags, including invalid ones. The option `--scanflags` lets you choose which flags you want to set.
- `URG` for Urgent
- `ACK` for Acknowledge
- `PSH` for Push
- `RST` for Reset
- `SYN` for Synchronize
- `FIN` for Finish
```bash
nmap -sS -Pn --badsum IP
```
##### Changing Routes
In many cases, you can use source routing to force the packets to use a certain route to reach their destination. Nmap provides this feature using the option `--ip-options`. Nmap offers loose and strict routing:
Loose routing can be specified using _L_ 
The below command requests that your scan packets are routed through the two provided IP addresses.
```bash
nmap --ip-options "L 10.10.10.50 10.10.50.250" IP
```
Strict routing can be specified using _S_
The below command specifies that the packets go via these three hops before reaching the target host.
```bash
nmap --ip-options "S 10.10.10.1 10.10.20.2 10.10.30.3" IP
```
##### Using Proxy Servers
Nmap offers the option `--proxies` that takes a list of a comma-separated list of proxy URLs. Each URL should be expressed in the format `proto://host:port`.
Valid protocols are HTTP and SOCKS4; moreover, authentication is not currently supported.
Example is below
```bash
nmap -sS HTTP://PROXY_HOST1:8080,SOCKS4://PROXY_HOST2:4153
IP
```
This way, you would make your scan go through HTTP proxy host1, then SOCKS4 proxy host2, before reaching your target. It is important to note that finding a reliable proxy requires some trial and error before you can rely on it to hide your Nmap scan source.
##### Using customized data length
You can set the length of data carried within the IP packet using `--data-length VALUE`. Remember that the length should be a multiple of 8.
```bash
map -sS -Pn --data-length 800 IP
```
## Done !
Check out other cheat sheets and study notes using the below link
```
https://shop.motasem-notes.net
https://buymeacoffee.com/notescatalog
```