

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

**The full macOS security guide can be unlocked by subscribing to the membership**

## Encryption
#### Encrypting Entire Drive/Partition with LUKS
Many modern Linux distributions ship with LUKS (Linux Unified Key Setup)
##### Installation
```
apt install cryptsetup [debian]
yum install cryptsetup-luks [redhat]
dnf install cryptsetup-luks [fedora]
```
##### Encrypting a new partition with without format
###### Set up the partition for LUKS encryption
The below command will prompt you for a passphrase, choose a strong passphrase.
```
cryptsetup -y -v luksFormat /dev/sdb1
```
Replace `/dev/sdb1` with the partition name you want to encrypt.
`Note`
You can find the partition names using one of the below commands
```
fdisk -l
lsblk
blkid
```
###### Create a mapping to access the partition
```
cryptsetup luksOpen /dev/sdb1 value-01
```
###### Accessing the encrypted value
The below command decrypts the storage device and lets you access it back.
```
sudo cryptsetup -v open /dev/sdb vault-01
sudo mount /dev/mapper/vault-01 vault-01/
```
OR
```
sudo cryptsetup -v luksOpen /dev/sdb vault-01
sudo mount /dev/mapper/vault-01 vault-01/
```

##### Encrypting a new partition with with format
Repeate step 1 and 2 and continue with below steps
###### Overwrite existing data with zero
```
dd if=/dev/zero of=/dev/mapper/vault-01
```
###### Format the partition
```
mkfs.ext4 /dev/mapper/vault-01 -L "Strategos USB"
```
###### Mount it and start using it like a usual partition
```
mount /dev/mapper/vault-01 /media/vault-01-secured
```
###### Unmounting the encrypted partition
```
sudo umount /dev/mapper/vault-01-secured
```
##### Check the LUKS setting
```
cryptsetup luksDump /dev/sdb1
```
##### Changing the passphrase of an encrypted drive/partition
```
cryptsetup -v luksChangeKey /dev/sdb
```
## Remote Access
### SSH 
The configuration of the OpenSSH server can be controlled via the `sshd_config` file, usually located at `/etc/ssh/sshd_config`

To secure SSH access, we strive to follow below steps
- Disable remote login as `root`; force login as non-root users. Add the below line in the config file
```
PermitRootLogin no
```
- Disable password authentication; force public key authentication instead.
To implment public key authentication, follow below steps
1- Generate a key pair:
```
ssh-keygen -t rsa
```
There will be a private key `id_rsa` and public key `id_rsa.pub`
2- To authenticate to the server you need to add the public key `id_rsa.pub` to the `authorized_keys` directory or you can execute the below command
```
ssh-copy-id username@server.
```
where `username` is your username, and `server` is the hostname or IP address of the SSH server.
3- Then add the below to ``/etc/ssh/sshd_config`
```
PasswordAuthentication no
```
## Software and Services
### Disable Unnecessary Services
Remove or disabe unneeded services and packages. In simple terms, we need to minimise the number of installed system packages as every package carries some risk, and we cannot know when a related vulnerability will be discovered. The best policy is to avoid installing unneeded packages.
For example, if you don’t need a web server, you should ensure you don’t install one. If you needed to run a web server at one point but no longer need it now, you should remove it or at least disable it. Otherwise, you will be exposing yourself to unnecessary risk.
### Block Unneeded Network Ports
It is critical to set your firewall rules accordingly. If you don’t have a web server, there is no reason to allow packets to TCP ports 80 and 443. The reasoning behind this is that if the attacker manages to start a disabled service, the firewall will block its traffic, and the attacker won’t be able to access its TCP port(s).
### Avoid Legacy Protocols
The SSH protocol is now widely available. For example, the Secure File Transfer Protocol (SFTP) protocol provides a great alternative to the TFTP protocol. The critical point is that a secure alternative is selected and used.
### Remove Identification Strings
Whenever you connect to a remote server, it usually replies with its version number. This information would reveal various information to the attacker, such as the name of the server/program, the version number, and the host operating system.
## Patch Management
You can update a Debian-based distribution, such as Ubuntu, with the following two commands:
1.  `apt update` to download package information from the configured sources
2.  `apt upgrade` to install available upgrades for all packages from the configured sources
You can update a RedHat or Fedora system using the following:
-   `dnf update` on newer releases (Red Hat Enterprise Linux 8 and later)
-   `yum update` on older releases (Red Hat Enterprise Linux 7 and earlier)

- Ubuntu
Fetch list of available updates
```
# apt-get update
```
Strictly upgrade the current packages
```
apt-get upgrade
```
Install updates (new ones)
```
apt-get dist-upgrade
```

- Red Hat Enterprise Linux 2.1,3,4
```
# up2date
```
To update non-interactively
```
up2date-nox --update
```
To install a specific package
```
# up2date <PACKAGE NAME>
```
To update a specific package
```
up2date -u <PACKAGE NAME>
```
- Red Hat Enterprise Linux 5:
```
pup
```
- Red Hat Enterprise Linux 6
```
yum update
```
To list a specific installed package
```
yum list installed <PACKAGE NAME>
```
To install a specific package
```
yum install <PACKAGE NAME>
```
To update a specific package
```
yum update <PACKAGE NAME>
```
