

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)


### The Command Center of the Linux World
Bash (Bourne Again SHell) is not merely a terminal interface; it is the beating heart of the GNU operating system and the default command interpreter for the vast majority of Linux distributions. 

Mastering Bash is akin to learning the native tongue of your server it allows you to bypass the limitations of graphical user interfaces and converse directly with the kernel. 

Whether you are automating mundane system administration tasks, parsing massive log files, or simply navigating the file system with speed and precision, Bash is the tool that separates the tourists from the locals in the Unix environment. The script usually begins with a "shebang" (`#!/usr/bin/env bash`), a directive that tells the program loader exactly which interpreter to use for the subsequent lines of code.

### Variables, Syntax, and the Nuance of Whitespace
In many programming languages, whitespace is a matter of style; in Bash, it is a matter of syntax. 

When declaring variables, precision is paramount. A variable assignment requires no spaces around the equals sign—Bash interprets `variable = "value"` as an attempt to run a command named `variable` with arguments `=` and `"value"`, resulting in a confusing error.

Proper assignment is compact and direct. Furthermore, accessing that variable requires the use of the `$` sign, though utilizing curly braces `${variable}` is the hallmark of a seasoned scripter, as it protects the variable name from ambiguous surrounding characters and allows for powerful inline string manipulation.

```bash
#!/usr/bin/env bash
# First line of the script is the shebang which tells the system how to execute
# the script: https://en.wikipedia.org/wiki/Shebang_(Unix)

# Simple hello world example:
echo "Hello world!" # => Hello world!

# Each command starts on a new line, or after a semicolon:
echo "This is the first command"; echo "This is the second command"

# Declaring a variable looks like this:
variable="Some string"

# But not like this:
# variable = "Some string" # => returns error "variable: command not found"
# Nor like this:
# variable= "Some string" # => returns error: "Some string: command not found"

# Using the variable:
echo "$variable" # => Some string
echo '$variable' # => $variable
# Note that ' (single quote) won't expand variables!

# Parameter expansion ${...}:
echo "${variable}" # => Some string

# String substitution in variables:
echo "${variable/Some/A}" # => A string

# Substring from a variable:
length=7
echo "${variable:0:length}" # => Some st
# This will return only the first 7 characters of the value

echo "${variable: -5}" # => tring
# This will return the last 5 characters (note the space before -5).

# String length:
echo "${#variable}" # => 11

# Indirect expansion:
other_variable="variable"
echo ${!other_variable} # => Some string

# The default value for variable:
echo "${foo:-"DefaultValueIfFooIsMissingOrEmpty"}"
```

**Expert Insight:**
> "The distinction between single quotes `'` and double quotes `"` in Bash is one of the most frequent stumbling blocks for beginners. Single quotes are 'strict'—they treat every character inside them literally. Double quotes are 'permissive'—they allow for variable expansion (substituting `$var` with its value) and command substitution. If your password contains a `$` sign, always wrap it in single quotes, or Bash will try to interpret it as a variable."

### Arrays and Iteration
While often overlooked in favor of Python lists, Bash arrays are surprisingly robust for system tasks. You can store lists of filenames, IP addresses, or user inputs and iterate through them with ease. 

The syntax `${array[@]}` is the standard method for expanding all elements of an array, which is particularly useful when you need to loop through items to perform batch operations. Loops in Bash can follow the C-style syntax or the more Pythonic "for item in list" style, giving you flexibility depending on your background.

```bash
# Declare an array with 6 elements:
array=(one two three four five six)

# Print the first element:
echo "${array[0]}" # => "one"

# Print all elements:
echo "${array[@]}" # => "one two three four five six"

# Print the number of elements:
echo "${#array[@]}" # => "6"

# Print 2 elements starting from fourth:
echo "${array[@]:3:2}" # => "four five"

# Print all elements each of them on new line.
for item in "${array[@]}"; do
    echo "$item"
done

# Brace Expansion {...} used to generate arbitrary strings:
echo {1..10} # => 1 2 3 4 5 6 7 8 9 10
echo {a..z} # => a b c d e f g h i j k l m n o p q r s t u v w x y z
```

### Logic, Conditionals, and Built-ins
Bash scripts are rarely linear; they need to make decisions. The `if` statement in Bash relies on the `test` command, often abbreviated as `[[ ... ]]`. These double brackets are an enhanced version of the traditional single brackets, allowing for more intuitive pattern matching and logical operators like `&&` (AND) and `||` (OR). 

Whether you are checking if a user is root, validating an email address with Regex, or ensuring a file exists before attempting to read it, these conditionals are the logic gates of your script. Additionally, Bash provides "built-in" variables that offer immediate context about the running process, such as the Process ID (`$$`) or the exit status of the last command (`$?`), which is crucial for error handling.

```bash
# Built-in variables:
echo "Last program's return value: $?"
echo "Script's PID: $$"
echo "Number of arguments passed to script: $#"
echo "All arguments passed to script: $@"
echo "Script's arguments separated into different variables: $1 $2..."

# Reading a value from input:
echo "What's your name?"
read name
echo "Hello, $name!"

# Condition is true if the value of $name is not equal to the current user's login username:
if [[ "$name" != "$USER" ]]; then
    echo "Your name isn't your username"
else
    echo "Your name is your username"
fi

# To use && and || with if statements:
read age
if [[ "$name" == "Steve" ]] && [[ "$age" -eq 15 ]]; then
    echo "This will run if $name is Steve AND $age is 15."
fi

# Regex matching with =~
email=me@example.com
if [[ "$email" =~ [a-z|net|org) ]]
then
    echo "Valid email!"
fi

# Conditional execution
echo "Always executed" || echo "Only executed if first command fails"
echo "Always executed" && echo "Only executed if first command does NOT fail"
```

### Navigating the Filesystem and Job Control
At its core, Bash is a tool for navigating and manipulating the Linux filesystem hierarchy. 

Commands like `cd` (change directory), `ls` (list segments), and `pwd` (print working directory) are the bread and butter of daily usage. However, power users also leverage the "directory stack" `cd -` to toggle between recent locations or subshells `( ... )` to execute commands in a specific directory without actually moving their current shell's focus. 

Furthermore, Bash allows you to multitask via job control; you can push long-running processes (like a server or a large file copy) to the background with `&`, pause them with `Ctrl-Z`, and bring them back with `fg`.

```bash
# Our current directory is available through the command `pwd`.
echo "I'm in $(pwd)" # execs `pwd` and interpolates output
echo "I'm in $PWD" # interpolates the variable

# Change directories:
cd ~    # change to home directory
cd ..   # go up one directory
cd /home/username/Documents   # change to specified directory
cd -    # change to last directory

# Use subshells to work across directories
(echo "First, I'm here: $PWD") && (cd someDir; echo "Then, I'm here: $PWD")
pwd # still in first directory

# Background jobs:
sleep 30 &
jobs # List background jobs
fg # Bring background job to foreground
```

### Redirection, Pipes, and Streams
One of the most powerful concepts in Unix-like systems is "Everything is a file," including input and output. Bash allows you to redirect these streams—Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr)—with surgical precision. 

You can pipe (`|`) the output of one command directly into the input of another, creating complex data processing pipelines without ever creating a temporary file. You can also redirect output to files using `>` (overwrite) or `>>` (append), or even discard unwanted output into the void of `/dev/null`. This capability is essential for logging, suppressing errors in silent scripts, or feeding configuration files into commands dynamically.

```bash
# Read from stdin until ^EOF$ and overwrite hello.py (Here Document):
cat > hello.py << EOF
#!/usr/bin/env python
from __future__ import print_function
import sys
print("#stdout", file=sys.stdout)
print("#stderr", file=sys.stderr)
for line in sys.stdin:
    print(line, file=sys.stdout)
EOF

# Redirection examples:
python hello.py < "input.in" # pass input.in as input
python hello.py > "output.out" # redirect output to file
python hello.py 2> "error.err" # redirect error output
python hello.py > "output-and-error.log" 2>&1 # redirect both output and errors

# Process Substitution:
echo <(echo "#helloworld")
```

**Expert Insight:**

> "`2>&1` is a common idiom that confuses many. It literally translates to 'Redirect Stream 2 (Standard Error) to the current location of Stream 1 (Standard Output).' The order matters immensely. If you swap the order of redirections, you might end up with errors printed to the screen instead of your log file. Always set up the destination for stdout first, then point stderr to it."

### Functions and Text Processing Utilities
No shell script is complete without the ability to reuse code and manipulate text. Functions in Bash allow you to encapsulate logic, accepting arguments just like a standalone script (accessible via `$1`, `$2`, etc.). 

Combined with text processing juggernauts like `grep` (Global Regular Expression Print), `sed` (Stream Editor), and `cut`, you can perform incredible feats of data extraction and formatting.

Whether you are filtering log files for specific error codes, replacing configuration parameters in bulk, or extracting specific columns from a CSV, these tools form the Swiss Army knife of the command line.

```bash
# Function Definition:
function foo (){
    echo "Arguments work just like script arguments: $@"
    echo "And: $1 $2..."
    return 0
}
foo arg1 arg2

# Text Processing:
tail -n 10 file.txt # last 10 lines
head -n 10 file.txt # first 10 lines
sort file.txt # sort lines
uniq -d file.txt # report repeated lines
cut -d ',' -f 1 file.txt # prints first column
sed -i 's/okay/great/g' file.txt # replace 'okay' with 'great'

# Grep Usage:
grep "^foo.*bar$" file.txt # match lines starting with foo, ending with bar
grep -r "^foo.*bar$" someDir/ # recursive search
```

### SHORTCUTS and HISTORY
```bash
CTRL+A  # move to beginning of line
CTRL+B  # moves backward one character
CTRL+C  # halts the current command
CTRL+D  # deletes one character backward or logs out of current session, similar to exit
CTRL+E  # moves to end of line
CTRL+F  # moves forward one character
CTRL+G  # aborts the current editing command and ring the terminal bell
CTRL+H  # deletes one character under cursor (same as DELETE)
CTRL+J  # same as RETURN
CTRL+K  # deletes (kill) forward to end of line
CTRL+L  # clears screen and redisplay the line
CTRL+M  # same as RETURN
CTRL+N  # next line in command history
CTRL+O  # same as RETURN, then displays next line in history file
CTRL+P  # previous line in command history
CTRL+Q  # resumes suspended shell output
CTRL+R  # searches backward
CTRL+S  # searches forward or suspends shell output
CTRL+T  # transposes two characters
CTRL+U  # kills backward from point to the beginning of line
CTRL+V  # makes the next character typed verbatim
CTRL+W  # kills the word behind the cursor
CTRL+X  # lists the possible filename completions of the current word
CTRL+Y  # retrieves (yank) last item killed
CTRL+Z  # stops the current command, resume with fg in the foreground or bg in the background
ALT+B   # moves backward one word
ALT+D   # deletes next word
ALT+F   # moves forward one word
ALT+H   # deletes one character backward
ALT+T   # transposes two words
ALT+.   # pastes last word from the last command. Pressing it repeatedly traverses through command history.
ALT+U   # capitalizes every character from the current cursor position to the end of the word
ALT+L   # uncapitalizes every character from the current cursor position to the end of the word
ALT+C   # capitalizes the letter under the cursor. The cursor then moves to the end of the word.
ALT+R   # reverts any changes to a command you’ve pulled from your history if you’ve edited it.
ALT+?   # list possible completions to what is typed
ALT+^   # expand line to most recent match from history

CTRL+X then (   # start recording a keyboard macro
CTRL+X then )   # finish recording keyboard macro
CTRL+X then E   # recall last recorded keyboard macro
CTRL+X then CTRL+E   # invoke text editor (specified by $EDITOR) on current command line then execute resultes as shell commands
CTRL+A then D  # logout from screen but don't kill it, if any command exist, it will continue

BACKSPACE  # deletes one character backward
DELETE     # deletes one character under cursor

history   # shows command line history
!!        # repeats the last command
!<n>      # refers to command line 'n'
!<string> # refers to command starting with 'string'
esc :wq   # exits and saves script

exit      # logs out of current session

```

### FILE COMMANDS
```bash
ls                            # lists your files in current directory, ls <dir> to print files in a specific directory
ls -l                         # lists your files in 'long format', which contains the exact size of the file, who owns the file and who has the right to look at it, and when it was last modified
ls -a                         # lists all files in 'long format', including hidden files (name beginning with '.')
ln -s <filename> <link>       # creates symbolic link to file
readlink <filename>           # shows where a symbolic links points to
tree                          # show directories and subdirectories in easilly readable file tree
mc                            # terminal file explorer (alternative to ncdu)
touch <filename>              # creates or updates (edit) your file
mktemp -t <filename>          # make a temp file in /tmp/ which is deleted at next boot (-d to make directory)
cat <filename>                # displays file raw content (will not be interpreted)
cat -n <filename>             # shows number of lines
nl <file.sh>                  # shows number of lines in file
cat filename1 > filename2     # Copy filename1 to filename2
cat filename1 >> filename2    # merge two files texts together
any_command > <filename>      # '>' is used to perform redirections, it will set any_command's stdout to file instead of "real stdout" (generally /dev/stdout)
more <filename>               # shows the first part of a file (move with space and type q to quit)
head <filename>               # outputs the first lines of file (default: 10 lines)
tail <filename>               # outputs the last lines of file (useful with -f option) (default: 10 lines)
vim <filename>                # opens a file in VIM (VI iMproved) text editor, will create it if it doesn't exist
mv <filename1> <dest>         # moves a file to destination, behavior will change based on 'dest' type (dir: file is placed into dir; file: file will replace dest (tip: useful for renaming))
cp <filename1> <dest>         # copies a file
rm <filename>                 # removes a file
find . -name <name> <type>    # searches for a file or a directory in the current directory and all its sub-directories by its name
diff <filename1> <filename2>  # compares files, and shows where they differ
wc <filename>                 # tells you how many lines, words and characters there are in a file. Use -lwc (lines, word, character) to ouput only 1 of those informations
sort <filename>               # sorts the contents of a text file line by line in alphabetical order, use -n for numeric sort and -r for reversing order.
sort -t -k <filename>         # sorts the contents on specific sort key field starting from 1, using the field separator t.
rev                           # reverse string characters (hello becomes olleh)
chmod -options <filename>     # lets you change the read, write, and execute permissions on your files (more infos: SUID, GUID)
gzip <filename>               # compresses files using gzip algorithm
gunzip <filename>             # uncompresses files compressed by gzip
gzcat <filename>              # lets you look at gzipped file without actually having to gunzip it
lpr <filename>                # prints the file
lpq                           # checks out the printer queue
lprm <jobnumber>              # removes something from the printer queue
genscript                     # converts plain text files into postscript for printing and gives you some options for formatting
dvips <filename>              # prints .dvi files (i.e. files produced by LaTeX)
grep <pattern> <filenames>    # looks for the string in the files
grep -r <pattern> <dir>       # search recursively for pattern in directory
head -n file_name | tail +n   # Print nth line from file.
head -y lines.txt | tail +x   # want to display all the lines from x to y. This includes the xth and yth lines.

sed 's/<pattern>/<replacement>/g' <filename> # replace pattern in file with replacement value to std output the character after s (/) is the delimeter 
sed -i 's/<pattern>/<replacement>/g' <filename> # replace pattern in file with replacement value in place
echo "this" | sed 's/is/at/g' # replace pattern from input stream with replacement value
```

### DIRECTORY COMMANDS
```bash
mkdir <dirname>               # makes a new directory
rmdir <dirname>               # remove an empty directory
rmdir -rf <dirname>           # remove a non-empty directory
mv <dir1> <dir2>              # rename a directory from <dir1> to <dir2>
cd                            # changes to home
cd ..                         # changes to the parent directory
cd <dirname>                  # changes directory
cp -r <dir1> <dir2>           # copy <dir1> into <dir2> including sub-directories
pwd                           # tells you where you currently are
cd ~                          # changes to home.
cd -                          # changes to previous working directory
```

### Sys Admin
You can’t fix what you can’t measure. In the high-stakes world of system administration, visibility is everything. 

Whether you are debugging a sluggish server, managing storage constraints, or hunting down a rogue process that's eating your CPU cycles, you need tools that cut through the noise. 

The commands below are not just utilities; they are your instruments for diagnosing the health of your machine, managing its resources, and ensuring uptime. From the granularity of a single packet to the broad strokes of disk partitions, this is how you maintain control.

**Phase 1: Resource Management (Disk & Memory)**
Running out of disk space or RAM is the silent killer of services. It often happens gradually, then suddenly. 

The `df` (disk free) and `du` (disk usage) commands are your primary radar for storage, while `free` gives you an instant snapshot of your volatile memory.
```bash
# Disk Usage
df -h                  # List disks, size, used and available space in a human readable format

# Directory Analysis
du -h /foo/bar         # List specified directory and subdirectories in human readable format
du -h -d 1             # List current directory size with a max depth of 1 (cleaner output)

# Memory Usage
free -h                # Show human readable memory usage
free -s 5              # Watch memory usage update continuously every 5 seconds
```

**Expert Insight:**
> "Always use the `-h` (human-readable) flag. While bytes are precise, '24G' is instantly actionable, whereas '25165824' requires mental math. Also, be careful with `du` on the root directory `/` without the `-d` (max-depth) flag; it will try to traverse the entire filesystem, which can cause high I/O load."

**Phase 2: Package Management (APT)**
On Debian and Ubuntu-based systems, `apt` is the gatekeeper. It handles the retrieval, configuration, and installation of software from central repositories. It’s critical to keep your index updated (`apt update`) before attempting to install anything to ensure you aren't pulling dead links or outdated versions.

```bash
apt update                   # Refreshes repository index (Run this first!)
apt search wget              # Search for a package
apt show wget                # List detailed information about the package
apt list --all-versions wget # List all available versions

# Installation & Removal
apt install wget             # Install the latest version
apt install wget=1.2.3       # Install a specific version (Great for version pinning)
apt remove wget              # Removes the package binaries
apt upgrade                  # Upgrades all installed packages to their newest versions
```

**Phase 3: Lifecycle Control (Shutdown & Reboot)**
Sometimes the only fix is a restart. The `shutdown` command is safer than pulling the plug because it signals all running processes to save their state and exit gracefully (SIGTERM) before the system cuts power.

```bash
# Scheduled Power Operations
shutdown +5 "Maintenance Window"      # Shutdown in 5 minutes with a warning message
shutdown -r +5 "Rebooting for updates" # Reboot in 5 minutes

# Immediate Actions
shutdown now                 # Immediate shutdown
reboot                       # Reboot now

# Emergency
shutdown -c                  # Cancel a pending shutdown
reboot -f                    # Force a reboot (Skips graceful shutdown - use with caution)
```

**Phase 4: Process Orchestration**
Processes are the workers of your operating system. Sometimes they go rogue, hang, or consume more resources than they should. Tools like `top` and `htop` give you a live view of this activity, while `ps` provides a static snapshot. When a process needs to be stopped, `kill` is your weapon of choice.

```bash
# Monitoring
htop                   # Interactive process viewer (Superior to top)
ps aux                 # List all processes with detailed info
pidof nginx            # Return the PID of all nginx processes

# Job Control
CTRL+Z                 # Suspend current foreground process
bg                     # Push suspended process to background
fg 1                   # Bring job 1 to foreground
jobs                   # List background jobs

# Finding Open Files
lsof -i :80            # specific port (e.g., who is listening on port 80?)

# Priority Management (Niceness: -20 is highest priority, 19 is lowest)
renice -n -5 -p PID    # Increase priority of a running process

# Termination
kill PID               # Graceful kill (SIGTERM) - Give it a chance to save data
kill -9 PID            # Force kill (SIGKILL) - Nuclear option
pkill -f python        # Kill all processes matching "python"
```

**Phase 5: Time and Scheduling**
Automation relies on accurate time and precise scheduling. `cron` is the daemon that executes scheduled commands (cron jobs), while `at` is used for one-off tasks scheduled for the future.

```bash
# Date & Time
date --iso-8601=seconds  # precise timestamping for logs
time ls -R               # Measure how long a command takes

# Crontab (The Scheduler)
# Format: Minute Hour Day Month Weekday Command
crontab -e                 # Edit the current user's crontab
# Examples:
# */15 * * * * foo         # Run 'foo' every 15 minutes
# 0 0 1 * * foo            # Run 'foo' at midnight on the 1st of the month

# 'At' (One-off tasks)
echo "backup.sh" | at 2am tomorrow # Run backup at 2am tomorrow
atq                        # List pending 'at' jobs
atrm 1                     # Remove job 1
```

**Phase 6: Networking & Connectivity**
The network is the nervous system of modern infrastructure. When connections fail, you need to diagnose where the break is—is it DNS? Is it the router? Is the port blocked? Tools like `curl` and `wget` test application-layer connectivity, while `ping`, `mtr`, and `nmap` probe the lower layers.

```bash
# HTTP Clients
curl -I https://example.com                  # Fetch headers only (Check status codes)
curl -L -O https://example.com/file.zip      # Follow redirects and download file
wget https://example.com/file.txt            # Simple file download

# Diagnostics
ping -c 4 example.com       # Check connectivity (4 packets only)
ip addr show                # Show IP addresses (Modern replacement for ifconfig)
ip route                    # Show routing table
netstat -tulpn              # List listening ports and associated PIDs

# Path Analysis
mtr google.com              # Real-time traceroute (Combines ping and traceroute)

# Network Scanning
nmap -p 1-1000 192.168.1.1  # Scan top 1000 ports on a target
nmap -sn 192.168.1.0/24     # Ping scan (Who is online in the subnet?)

# DNS
dig +short example.com      # precise DNS lookup
cat /etc/resolv.conf        # View configured nameservers
```

**Expert Insight:**
> "`netstat` is slowly being deprecated in favor of `ss` (Socket Statistics), but it remains muscle memory for many admins. If `netstat` isn't available, try `ss -tulpn` for the same output. Also, `mtr` is vastly superior to `traceroute` because it shows packet loss at _each hop_, helping you identify exactly which router between you and the destination is dropping traffic."

**Phase 7: Hardware Introspection**
Sometimes the issue is physical. These commands query the kernel to see what hardware is actually connected and recognized by the system.
```bash
lsusb                  # List USB devices
lspci                  # List PCI devices (Graphics cards, Network adapters)
lshw -short            # Hardware listing summary
```

### VARIABLES
```bash
varname=value                # defines a variable
varname=value command        # defines a variable to be in the environment of a particular subprocess
echo $varname                # checks a variable's value
echo $$                      # prints process ID of the current shell
echo $!                      # prints process ID of the most recently invoked background job
echo $?                      # displays the exit status of the last command
read <varname>               # reads a string from the input and assigns it to a variable
read -p "prompt" <varname>   # same as above but outputs a prompt to ask user for value
column -t <filename>         # display info in pretty columns (often used with pipe)
let <varname> = <equation>   # performs mathematical calculation using operators like +, -, *, /, %
export VARNAME=value         # defines an environment variable (will be available in subprocesses)
export -f  <funcname>        # Exports function 'funcname'
export var1="var1 value"     # Export and assign in the same statement
export <varname>             # Copy Bash variable
declare -x <varname>         # Copy Bash variable

array[0]=valA                # how to define an array
array[1]=valB
array[2]=valC
array=([2]=valC [0]=valA [1]=valB)  # another way
array=(valA valB valC)              # and another

${array[i]}                  # displays array's value for this index. If no index is supplied, array element 0 is assumed
${#array[i]}                 # to find out the length of any element in the array
${#array[@]}                 # to find out how many values there are in the array

declare -a                   # the variables are treated as arrays
declare -f                   # uses function names only
declare -F                   # displays function names without definitions
declare -i                   # the variables are treated as integers
declare -r                   # makes the variables read-only
declare -x                   # marks the variables for export via the environment
declare -l                   # uppercase values in the variable are converted to lowercase
declare -A                   # makes it an associative array

${varname:-word}             # if varname exists and isn't null, return its value; otherwise return word
${varname:word}              # if varname exists and isn't null, return its value; otherwise return word
${varname:=word}             # if varname exists and isn't null, return its value; otherwise set it word and then return its value
${varname:?message}          # if varname exists and isn't null, return its value; otherwise print varname, followed by message and abort the current command or script
${varname:+word}             # if varname exists and isn't null, return word; otherwise return null
${varname:offset:length}     # performs substring expansion. It returns the substring of $varname starting at offset and up to length characters

${variable#pattern}          # if the pattern matches the beginning of the variable's value, delete the shortest part that matches and return the rest
${variable##pattern}         # if the pattern matches the beginning of the variable's value, delete the longest part that matches and return the rest
${variable%pattern}          # if the pattern matches the end of the variable's value, delete the shortest part that matches and return the rest
${variable%%pattern}         # if the pattern matches the end of the variable's value, delete the longest part that matches and return the rest
${variable/pattern/string}   # the longest match to pattern in variable is replaced by string. Only the first match is replaced
${variable//pattern/string}  # the longest match to pattern in variable is replaced by string. All matches are replaced

${#varname}                  # returns the length of the value of the variable as a character string

*(patternlist)               # matches zero or more occurrences of the given patterns
+(patternlist)               # matches one or more occurrences of the given patterns
?(patternlist)               # matches zero or one occurrence of the given patterns
@(patternlist)               # matches exactly one of the given patterns
!(patternlist)               # matches anything except one of the given patterns

$(UNIX command)              # command substitution: runs the command and returns standard output

typeset -l <x>                 # makes variable local - <x> must be an interger
```

### FUNCTIONS
The function refers to passed arguments by position (as if they were positional parameters), that is, $1, $2, and so forth.
```bash
$@ is equal to "$1" "$2"... "$N", where N is the number of positional parameters. $# holds the number of positional parameters.


function functname() {
  shell commands
}

unset -f functname  # deletes a function definition
declare -f          # displays all defined functions in your login session
```

### FLOW CONTROLS
If executing commands is the muscle of a Bash script, **Control Flow** is its brain. Without it, a script is just a linear list of chores, a mindless robot capable of doing only one thing in one specific order. 

To build tools that can adapt, react, and make decisions based on the changing environment of your operating system, you need to master conditional logic. 

This is where we move from simple automation to true orchestration. By leveraging comparators, loops, and decision trees, you transform a static file into a dynamic program that can check if a server is up, verify if a user is authorized, or process thousands of files with a single keystroke.

**Phase 1: The Logic Gates (Operators)**
Before your script can make a decision, it must first ask a question. In Bash, these questions take the form of operators. However, unlike high-level languages that often treat numbers and strings interchangeably, Bash requires you to be specific. 

Are you comparing the _value_ of two numbers, or the _textual content_ of two strings? Mixing these up is the most common source of "command not found" errors or silent failures in shell scripting.

**The Numeric Operators (Math)** Use these when you are dealing strictly with integers.

- `-eq` : Equals (e.g., `if [ $a -eq $b ]`)
    
- `-ne` : Not equals
    
- `-gt` : Greater than
    
- `-ge` : Greater than or equal to
    
- `-lt` : Less than
    
- `-le` : Less than or equal to
    

**The String & File Operators (Text & Filesystem)** Use these for checking text or verifying the state of files.

- `=` or `==` : Equals (String comparison)
    
- `-z` : Is null (Checks if a string is empty, length is zero)
    
- `-n` : Is not null (Checks if a string has content)
    
- `<` / `>` : ASCII alphabetical order comparison (Requires `[[ ]]`)
    
- `-e` : Check file exists (e.g., `[[ -e config.conf ]]`)
    

**Boolean Operators**
- `$foo` : Returns true if the command was successful.
    
- `!$foo` : Returns true if the command failed (Logical NOT).
    

**Expert Insight:**

> "Always prefer the double bracket syntax `[[ ... ]]` over single brackets `[ ... ]` when writing modern Bash scripts. Single brackets are the old, POSIX-compliant standard, but they are finicky. They trip over variables with spaces and don't support advanced string operators natively. Double brackets are a Bash extension that handles spaces safely and allows for more intuitive logic like `&&` and `||` directly inside the condition."

**Phase 2: If Statements**
The `if` statement is the fundamental building block of logic. It allows your script to branch into different paths. Bash syntax here is strict about spacing—you must leave a space after the opening bracket and before the closing bracket. Below is a classic structure that handles multiple conditions (`elif`) and a default fallback (`else`).

```bash
#!/bin/bash

# Note the spaces inside the brackets: [[ $foo ... ]]
if [[ $foo = 'bar' ]]; then
  echo 'one'
elif [[ $foo = 'bar' ]] || [[ $foo = 'baz' ]]; then
  echo 'two'
elif [[ $foo = 'ban' ]] && [[ $USER = 'bat' ]]; then
  echo 'three'
else
  echo 'four'
fi
```

Sometimes, writing a full multi-line block is overkill for a simple check. For these moments, we have **Inline If Statements** (also known as ternary-like operators). 

This "short-circuit" logic is beautiful in its brevity: the second command runs only if the first one succeeds (`&&`), and the third runs only if the first fails (`||`).

```bash
#!/bin/bash

# If user is rehan, print yes; otherwise, print no.
[[ $USER = 'rehan' ]] && echo 'yes' || echo 'no'
```

**Phase 3: Loops**
Why type a command a hundred times when you can type it once and wrap it in a loop? Loops allow you to iterate over logic until a specific condition is met.

The **While Loop** is your tool for state-based iteration. It keeps running as long as the condition remains true. In the example below, we use `declare -i` to force the variable to be treated as an integer, allowing us to perform arithmetic without complex expansion syntax.

```bash
#!/bin/bash

declare -i counter
counter=10

while [ $counter -gt 2 ]; do
  echo The counter is $counter
  # Because of 'declare -i', Bash knows this is math, not a string
  counter=counter-1
done
```

The **For Loop** is designed for iterating over lists. Whether you are counting numbers, processing a list of filenames provided manually, or using a "glob" (wildcard) to grab every file in a directory, the `for` loop is the workhorse of batch processing.

```bash
#!/bin/bash

# C-style range loop (Start..End..Step)
for i in {0..10..2}
do
    echo "Index: $i"
done

# Iterating over a specific list of strings
for filename in file1 file2 file3
do
    echo "Content: " >> $filename
done

# Iterating over all files in the current directory
for filename in *;
do
    echo "Content: " >> $filename
done
```

**Phase 4: Case Statements**
When you find yourself writing an endless chain of `elif` statements to check a single variable against many possible values, stop. You need a **Case Statement**. 

This structure (often called a "switch" in other languages) is cleaner, easier to read, and less prone to syntax errors. It matches a variable against patterns, executes the corresponding code block, and then exits the structure.

```bash
#!/bin/bash

echo "What's the weather like tomorrow?"
read weather

case $weather in
  sunny | warm ) 
    echo "Nice weather: " $weather
  ;;
  cloudy | cool ) 
    echo "Not bad weather: " $weather
  ;;
  rainy | cold ) 
    echo "Terrible weather: " $weather
  ;;
  * ) # The wildcard * catches anything not listed above
    echo "Don't understand"
  ;;
esac
```

**Expert Insight:**

> "The `case` statement is particularly powerful because it supports globbing patterns natively. You aren't limited to exact matches. You could use `*.txt)` to match all text files or `[yY]*)` to catch 'yes', 'Yes', or 'yeah' in a user prompt. It's an underutilized tool that makes script interfaces feel much more professional and robust."

### STRINGS
```bash
str1 == str2               # str1 matches str2
str1 != str2               # str1 does not match str2
str1 < str2                # str1 is less than str2 (alphabetically)
str1 > str2                # str1 is greater than str2 (alphabetically)
str1 \> str2               # str1 is sorted after str2
str1 \< str2               # str1 is sorted before str2
-n str1                    # str1 is not null (has length greater than 0)
-z str1                    # str1 is null (has length 0)
```

### FILES
```bash
-a file                   # file exists or its compilation is successful
-d file                   # file exists and is a directory
-e file                   # file exists; same -a
-f file                   # file exists and is a regular file (i.e., not a directory or other special type of file)
-r file                   # you have read permission
-s file                   # file exists and is not empty
-w file                   # your have write permission
-x file                   # you have execute permission on file, or directory search permission if it is a directory
-N file                   # file was modified since it was last read
-O file                   # you own file
-G file                   # file's group ID matches yours (or one of yours, if you are in multiple groups)
file1 -nt file2           # file1 is newer than file2
file1 -ot file2           # file1 is older than file2
```

### NUMBERS
```bash
-lt                       # less than
-le                       # less than or equal
-eq                       # equal
-ge                       # greater than or equal
-gt                       # greater than
-ne                       # not equal

if condition
then
  statements
[elif condition
  then statements...]
[else
  statements]
fi

for x in {1..10}
do
  statements
done

for name [in list]
do
  statements that can use $name
done

for (( initialisation ; ending condition ; update ))
do
  statements...
done

case expression in
  pattern1 )
    statements ;;
  pattern2 )
    statements ;;
esac

select name [in list]
do
  statements that can use $name
done

while condition; do
  statements
done

until condition; do
  statements
done
```

### COMMAND-LINE PROCESSING CYCLE
The default order for command lookup is functions, followed by built-ins, with scripts and executables last. There are three built-ins that you can use to override this order: `command`, `builtin` and `enable`.
```bash
command  # removes alias and function lookup. Only built-ins and commands found in the search path are executed
builtin  # looks up only built-in commands, ignoring functions and commands found in PATH
enable   # enables and disables shell built-ins

eval     # takes arguments and run them through the command-line processing steps all over again
```

### INPUT/OUTPUT REDIRECTORS
```bash
cmd1|cmd2  # pipe; takes standard output of cmd1 as standard input to cmd2
< file     # takes standard input from file
> file     # directs standard output to file
>> file    # directs standard output to file; append to file if it already exists
>|file     # forces standard output to file even if noclobber is set
n>|file    # forces output to file from file descriptor n even if noclobber is set
<> file    # uses file as both standard input and standard output
n<>file    # uses file as both input and output for file descriptor n
n>file     # directs file descriptor n to file
n<file     # takes file descriptor n from file
n>>file    # directs file description n to file; append to file if it already exists
n>&        # duplicates standard output to file descriptor n
n<&        # duplicates standard input from file descriptor n
n>&m       # file descriptor n is made to be a copy of the output file descriptor
n<&m       # file descriptor n is made to be a copy of the input file descriptor
&>file     # directs standard output and standard error to file
<&-        # closes the standard input
>&-        # closes the standard output
n>&-       # closes the ouput from file descriptor n
n<&-       # closes the input from file descriptor n

|tee <file># output command to both terminal and a file (-a to append to file)

```

### PROCESS HANDLING
To suspend a job, type CTRL+Z while it is running. You can also suspend a job with CTRL+Y. This is slightly different from CTRL+Z in that the process is only stopped when it attempts to read input from terminal. Of course, to interrupt a job, type CTRL+C.
```bash
myCommand &  # runs job in the background and prompts back the shell

jobs         # lists all jobs (use with -l to see associated PID)

fg           # brings a background job into the foreground
fg %+        # brings most recently invoked background job
fg %-        # brings second most recently invoked background job
fg %N        # brings job number N
fg %string   # brings job whose command begins with string
fg %?string  # brings job whose command contains string

kill -l               # returns a list of all signals on the system, by name and number
kill PID              # terminates process with specified PID
kill -s SIGKILL 4500  # sends a signal to force or terminate the process
kill -15 913          # Ending PID 913 process with signal 15 (TERM)
kill %1               # Where %1 is the number of job as read from 'jobs' command.

ps           # prints a line of information about the current running login shell and any processes running under it
ps -a        # selects all processes with a tty except session leaders

trap cmd sig1 sig2  # executes a command when a signal is received by the script
trap "" sig1 sig2   # ignores that signals
trap - sig1 sig2    # resets the action taken when the signal is received to the default

disown <PID|JID>    # removes the process from the list of jobs

wait                # waits until all background jobs have finished
sleep <number>      # wait # of seconds before continuing

pv                  # display progress bar for data handling commands. often used with pipe like |pv
yes                 # give yes response everytime an input is requested from script/process

```

### TIPS & TRICKS
## set an alias
```bash
cd; nano .bash_profile
> alias gentlenode='ssh admin@gentlenode.com -p 3404'  # add your alias in .bash_profile
```
To quickly go to a specific directory
```bash
cd; nano .bashrc
shopt -s cdable_vars
export websites="/Users/mac/Documents/websites"
source .bashrc
cd $websites
```

### DEBUGGING SHELL PROGRAMS
```bash
bash -n scriptname  # don't run commands; check for syntax errors only
set -o noexec       # alternative (set option in script)

bash -v scriptname  # echo commands before running them
set -o verbose      # alternative (set option in script)

bash -x scriptname  # echo commands after command-line processing
set -o xtrace       # alternative (set option in script)

trap 'echo $varname' EXIT  # useful when you want to print out the values of variables at the point that your script exits

function errtrap {
  es=$?
  echo "ERROR line $1: Command exited with status $es."
}

trap 'errtrap $LINENO' ERR  # is run whenever a command in the surrounding script or function exits with non-zero status

function dbgtrap {
  echo "badvar is $badvar"
}

trap dbgtrap DEBUG  # causes the trap code to be executed before every statement in a 
function or script
```
### COLORS AND BACKGROUNDS
Regular Colors
```bash
Black='\033[0;30m'  # Black
Red='\033[0;31m'    # Red
Green='\033[0;32m'  # Green
Yellow='\033[0;33m' # Yellow
Blue='\033[0;34m'   # Blue
Purple='\033[0;35m' # Purple
Cyan='\033[0;36m'   # Cyan
White='\033[0;97m'  # White
```
Additional colors
```bash
LGrey='\033[0;37m'  # Light Gray
DGrey='\033[0;90m'  # Dark Gray
LRed='\033[0;91m'   # Light Red
LGreen='\033[0;92m' # Light Green
LYellow='\033[0;93m'# Light Yellow
LBlue='\033[0;94m'  # Light Blue
LPurple='\033[0;95m'# Light Purple
LCyan='\033[0;96m'  # Light Cyan
```
Bold
```bash
BBlack='\033[1;30m' # Black
BRed='\033[1;31m'   # Red
BGreen='\033[1;32m' # Green
BYellow='\033[1;33m'# Yellow
BBlue='\033[1;34m'  # Blue
BPurple='\033[1;35m'# Purple
BCyan='\033[1;36m'  # Cyan
BWhite='\033[1;37m' # White
```
Underline
```bash
UBlack='\033[4;30m' # Black
URed='\033[4;31m'   # Red
UGreen='\033[4;32m' # Green
UYellow='\033[4;33m'# Yellow
UBlue='\033[4;34m'  # Blue
UPurple='\033[4;35m'# Purple
UCyan='\033[4;36m'  # Cyan
UWhite='\033[4;37m' # White
```
Background
```bash
On_Black='\033[40m' # Black
On_Red='\033[41m'   # Red
On_Green='\033[42m' # Green
On_Yellow='\033[43m'# Yellow
On_Blue='\033[44m'  # Blue
On_Purple='\033[45m'# Purple
On_Cyan='\033[46m'  # Cyan
On_White='\033[47m' # White
```
Example of usage
```bash
echo -e "${Green}This is GREEN text${Color_Off} and normal text"
echo -e "${Red}${On_White}This is Red test on White background${Color_Off}"
```
`option -e is mandatory, it enable interpretation of backslash escapes`
```bash
printf "${Red} This is red \n"
```