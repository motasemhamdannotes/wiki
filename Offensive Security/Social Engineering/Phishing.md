[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

==Full phishing notes can be found under the full premium membership==

**Definition**
Phishing is a form of social engineering delivered through email to trick someone into either revealing personal information, credentials or even executing malicious code on their computer. These emails will usually appear to come from a trusted source, whether that's a person or a business. They include content that tries to tempt or trick people into downloading software, opening attachments, or following links to a bogus website.

**Email Basics**
There are 3 specific protocols involved to facilitate the outgoing and incoming email messages, and they are briefly listed below.
- ***SMTP*** (Simple Mail Transfer Protocol) - It is utilized to handle the sending of emails. 
- ***POP3*** (Post Office Protocol)- Is responsible transferring email between a client and a mail server. 
- ***IMAP (Internet Message Access Protocol)*** - Is responsible transferring email between a client and a mail server.
***IMAP vs POP3***
`POP3`
- Emails are downloaded and stored on a single device.
- Sent messages are stored on the single device from which the email was sent.
- Emails can only be accessed from the single device the emails were downloaded to.
- If you want to keep messages on the server, make sure the setting "Keep email on server" is enabled, or all messages are deleted from the server once downloaded to the single device's app or software.
`IMAP`
- Emails are stored on the server and can be downloaded to multiple devices.
- Sent messages are stored on the server.
- Messages can be synced and accessed across multiple devices.

**Email Flow**
1. Alexa composes an email to Billy (`billy@johndoe.com`) in her favorite email client. After she's done, she hits the send button.
2. The ***SMTP*** server needs to determine where to send Alexa's email. It queries ***DNS*** for information associated with `johndoe.com`. 
3. The ***DNS*** server obtains the information `johndoe.com` and sends that information to the ***SMTP*** server. 
4. The ***SMTP*** server sends Alexa's email across the Internet to Billy's mailbox at `johndoe.com`.
5. In this stage, Alexa's email passes through various ***SMTP*** servers and is finally relayed to the destination ***SMTP*** server. 
6. Alexa's email finally reached the destination ***SMTP*** server.
7. Alexa's email is forwarded and is now sitting in the local ***POP3/IMAP*** server waiting for Billy. 
8. Billy logs into his email client, which queries the local ***POP3/IMAP*** server for new emails in his mailbox.
9. Alexa's email is copied (***IMAP***) or downloaded (***POP3***) to Billy's email client.

**Email Parts**
We need to understand that there are two parts to an email:
- the email ***header*** (information about the email, such as the email servers that relayed the email)
- the email ***body*** (text and/or HTML formatted text).
Some Important Components of an Email headerf;
1. ***From*** - the sender's email address
2. ***Subject*** - the email's subject line
3. ***Date*** - the date when the email was sent
4. ***To*** - the recipient's email address
5. ***X-Originating-IP*** - The IP address of the email was sent from (this is known as an **[X-header](https://help.returnpath.com/hc/en-us/articles/220567127-What-are-X-headers-)**)
6. ***Smtp.mailfrom/header.from*** - The domain the email was sent from (these headers are within Authentication-Results)
7. ***Reply-To*** - This is the email address a reply email will be sent to instead of the From email address.

**Types of Phishing Emails**
***Spear Phishing***
Spear phishing is targeting an individual, business or organization rather than just anybody as mass.
***Vishing, or Voice Phishing***
Social engineering over the phone system. It often relies on caller ID spoofing tools to make the calls more believable.
***Short message service (SMS) phishing*** 
Phishing via SMS messages.
***Whaling***
targets high-profile or important members of an organization, like the CEO or senior vice presidents.
***Watering Holes***
A social engineering technique where the attacker finds a commonly visited website and compromises it to include malware that will infect the target visitors.
**Components of phishing emails**
We have three things to work with regarding phishing emails: the sender's email address, the subject and the content.
- Ideally, the sender's address would be from a domain name that spoofs a significant brand, a known contact, or a coworker.
- You should set the subject to something quite urgent, worrying, or piques the victim's curiosity, so they do not ignore it and act on it quickly. Below are examples of subjects used widely.
```
1. Your account has been compromised.
2. Your package has been dispatched/shipped.
3. Staff payroll information (do not forward!)
4. Your photos have been published.
```
- If impersonating a brand or supplier, it would be pertinent to research their standard email templates and branding (style, logo's images, signoffs etc.) and make your content look the same as theirs, so the victim doesn't expect anything. If impersonating a contact or coworker, it could be beneficial to contact them; first, they may have some branding in their template, have a particular email signature or even something small such as how they refer to themselves.
- If you've set up a spoof website to harvest data or distribute malware, the links to this should be disguised using the **[anchor text](https://en.wikipedia.org/wiki/Anchor_text)** and changing it either to some text which says "Click Here" or changing it to a correct looking link that reflects the business you are spoofing.

**Components of phishing infrastructure***
- Domain name: You'll need to register either an authentic-looking domain name or one that mimics the identity of another domain. Buying expired Domains which have some history may lead to better scoring of your domain when it comes to spam filters. Additionally you can use typosquatting which is when a registered domain looks very similar to the target domain you're trying to impersonate. Typosquatting can be done by using misspelled domain names, adding periods in the domain name, switching numbers for letters or adding additional word.
- SSL/TLS: Creating SSL/TLS certificates for your chosen domain name will add an extra layer of authenticity to the attack.
- Email server/hosting: You'll need to either set up an email server or register with an SMTP email provider.
- DNS: Setting up DNS Records such as SPF, DKIM, DMARC will improve the deliverability of your emails and make sure they're getting into the inbox rather than the spam folder.
- Web page hosted on a webserver: You'll need to set up webservers or purchase web hosting from a company to host your phishing websites. Adding SSL/TLS to the websites will give them an extra layer of authenticity.

**Typical Characteristics of Phishing Emails**
- The sender email name/address will masquerade as a trusted entity (**[email spoofing](https://www.proofpoint.com/us/threat-reference/email-spoofing)**)
- The email subject line and/or body (text) is written with a sense of urgency or uses certain keywords such as Invoice, Suspended, etc. 
- The email body (HTML) is designed to match a trusting entity (such as Amazon)
- The email body (HTML) is poorly formatted or written (contrary from the previous point)
- The email body uses generic content, such as Dear Sir/Madam. 
- Hyperlinks (oftentimes uses URL shortening services to hide its true origin)
- A [malicious attachment](https://www.proofpoint.com/us/threat-reference/malicious-email-attachments) posing as a legitimate document

**Phishing Frameworks**
***GoPhish***
[GoPhish][https://getgophish.com/] is a web-based framework to make setting up phishing campaigns more straightforward. GoPhish allows you to store your SMTP server settings for sending emails, has a web-based tool for creating email templates using a simple WYSIWYG (What You See Is What You Get) editor. You can also schedule when emails are sent and have an analytics dashboard that shows how many emails have been sent, opened or clicked.

==Installation==
You can download it from [https://github.com/gophish/gophish/releases/tag/v0.11.0](https://github.com/gophish/gophish/releases/tag/v0.11.0)

Download and decompress it inside `/opt/gophish` and execute `/opt/gophish/gophish`  
You will be given a password for the admin user in port 3333 in the output. Therefore, access that port and use those credentials to change the admin password. You may need to tunnel that port to local:
```bash
ssh -L 3333:127.0.0.1:3333 <user>@<ip
```

==Configuration==

**TLS certificate configuration**
Before this step you should have **already bought the domain** you are going to use and it must be **pointing** to the **IP of the VPS** where you are configuring **gophish**.
```bash
DOMAIN="<domain>"
wget https://dl.eff.org/certbot-auto
chmod +x certbot-auto
sudo apt install snapd
sudo snap install core
sudo snap refresh core
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
certbot certonly --standalone -d "$DOMAIN"
mkdir /opt/gophish/ssl_keys
cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" /opt/gophish/ssl_keys/key.pem
cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" /opt/gophish/ssl_keys/key.crt​

```

**Mail configuration**
Start installing: `apt-get install postfix`

Then add the domain to the following files:
- **/etc/postfix/virtual_domains**
- **/etc/postfix/transport**
- **/etc/postfix/virtual_regexp**

**Change also the values of the following variables inside /etc/postfix/main.cf**
```bash
myhostname = <domain>
mydestination = $myhostname, <domain>, localhost.com, localhost
```


Finally modify the files **`/etc/hostname`** and **`/etc/mailname`** to your domain name and **restart your VPS.**

Now, create a **DNS A record** of `mail.<domain>` pointing to the **ip address** of the VPS and a **DNS MX** record pointing to `mail.<domain>`

Now lets test to send an email:
```bash
apt install mailutils echo "This is the body of the email" | mail -s "This is the subject line" test@email.com
```

**Gophish configuration**
Stop the execution of gophish and lets configure it.  
Modify `/opt/gophish/config.json` to the following (note the use of https):
```json
{
        "admin_server": {
                "listen_url": "127.0.0.1:3333",
                "use_tls": true,
                "cert_path": "gophish_admin.crt",
                "key_path": "gophish_admin.key"
        },
        "phish_server": {
                "listen_url": "0.0.0.0:443",
                "use_tls": true,
                "cert_path": "/opt/gophish/ssl_keys/key.crt",
                "key_path": "/opt/gophish/ssl_keys/key.pem"
        },
        "db_name": "sqlite3",
        "db_path": "gophish.db",
        "migrations_prefix": "db/db_",
        "contact_address": "",
        "logging": {
                "filename": "",
                "level": ""
        }
}

```

**Configure gophish service**
In order to create the gophish service so it can be started automatically and managed a service you can create the file `/etc/init.d/gophish` with the following content:
```bash
#!/bin/bash
# /etc/init.d/gophish
# initialization file for stop/start of gophish application server
#
# chkconfig: - 64 36
# description: stops/starts gophish application server
# processname:gophish
# config:/opt/gophish/config.json
# From https://github.com/gophish/gophish/issues/586

# define script variables

processName=Gophish
process=gophish
appDirectory=/opt/gophish
logfile=/var/log/gophish/gophish.log
errfile=/var/log/gophish/gophish.error

start() {
    echo 'Starting '${processName}'...'
    cd ${appDirectory}
    nohup ./$process >>$logfile 2>>$errfile &
    sleep 1
}

stop() {
    echo 'Stopping '${processName}'...'
    pid=$(/bin/pidof ${process})
    kill ${pid}
    sleep 1
}

status() {
    pid=$(/bin/pidof ${process})
    if [["$pid" != ""| "$pid" != "" ]]; then
        echo ${processName}' is running...'
    else
        echo ${processName}' is not running...'
    fi
}

case $1 in
    start|stop|status) "$1" ;;
esac

```

Finish configuring the service and checking it doing:
```bash
mkdir /var/log/gophish
chmod +x /etc/init.d/gophish
update-rc.d gophish defaults
#Check the service
service gophish start
service gophish status
ss -l | grep "3333\|443"
service gophish stop

```

==Configuring mail server and domain==
The older a domain is the less probable it’s going to be caught as spam. Then you should wait as much time as possible (at least 1week) before the phishing assessment. moreover, if you put a page about a reputational sector the reputation obtained will be better.

Note that even if you have to wait a week you can finish configuring everything now.

==Configure Reverse DNS (rDNS) record==
Set a rDNS (PTR) record that resolves the IP address of the VPS to the domain name.

==Sender Policy Framework (SPF) Record==
You must **configure a SPF record for the new domain**.

You can use [https://www.spfwizard.net/](https://www.spfwizard.net/) to generate your SPF policy (use the IP of the VPS machine)

![[Cyber Cheatsheets/Offensive Security/Social Engineering/1.png]]

This is the content that must be set inside a TXT record inside the domain:
```
v=spf1 mx a ip4:ip.ip.ip.ip ?all
```


==Domain-based Message Authentication, Reporting & Conformance (DMARC) Record==
You must **configure a DMARC record for the new domain**.

You have to create a new DNS TXT record pointing the hostname `_dmarc.<domain>` with the following content:
```
v=DMARC1; p=none
```

==DomainKeys Identified Mail (DKIM)==
You must **configure a DKIM for the new domain**. If you don’t know what is a DMARC record [**read this page**](https://hacktricks.wiki/en/network-services-pentesting/pentesting-smtp/index.html#dkim)

> Tip
> 
> You need to concatenate both B64 values that the DKIM key generates:
> 
> `v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0wPibdqPtzYk81njjQCrChIcHzxOp8a1wjbsoNtka2X9QXCZs+iXkvw++QsWDtdYu3q0Ofnr0Yd/TmG/Y2bBGoEgeE+YTUG2aEgw8Xx42NLJq2D1pB2lRQPW4IxefROnXu5HfKSm7dyzML1gZ1U0pR5X4IZCH0wOPhIq326QjxJZm79E1nTh3xj" "Y9N/Dt3+fVnIbMupzXE216TdFuifKM6Tl6O/axNsbswMS1TH812euno8xRpsdXJzFlB9q3VbMkVWig4P538mHolGzudEBg563vv66U8D7uuzGYxYT4WS8NVm3QBMg0QKPWZaKp+bADLkOSB9J2nUpk4Aj9KB5swIDAQAB`

==Test your email configuration score==
You can do that using [https://www.mail-tester.com/](https://www.mail-tester.com/)  
Just access the page and send an email to the address they give you:
```bash
echo "This is the body of the email" | mail -s "This is the subject line" test-iimosa79z@srv1.mail-tester.com
```
You can also **check your email configuration** sending an email to `check-auth@verifier.port25.com` and **reading the response** (for this you will need to **open** port **25** and see the response in the file _/var/mail/root_ if you send the email a as root).  
Check that you pass all the tests:
```bash
==========================================================
Summary of Results
==========================================================
SPF check:          pass
DomainKeys check:   neutral
DKIM check:         pass
Sender-ID check:    pass
SpamAssassin check: ham

```
You could also send **message to a Gmail under your control**, and check the **email’s headers** in your Gmail inbox, `dkim=pass` should be present in the `Authentication-Results` header field.
```bash
Authentication-Results: mx.google.com;
       spf=pass (google.com: domain of contact@example.com designates --- as permitted sender) smtp.mail=contact@example.com;
       dkim=pass header.i=@example.com;

```

==​Removing from Spamhouse Blacklist==
The page [www.mail-tester.com](https://www.mail-tester.com/) can indicate you if you your domain is being blocked by spamhouse. You can request your domain/IP to be removed at: ​[https://www.spamhaus.org/lookup/](https://www.spamhaus.org/lookup/)

==Removing from Microsoft Blacklist==
​​You can request your domain/IP to be removed at [https://sender.office.com/](https://sender.office.com/).