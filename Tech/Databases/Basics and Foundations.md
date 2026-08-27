

[🏠 Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Get the full version by joining the membership **[[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/membership)]([https://buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/membership))** 


## Relational Database Management Systems
A relational database consists of flat two-dimensional tables made up of rows and columns. In fact, each table looks similar to a spreadsheet file. 
The row and column structure provides for one-to one data mapping relationships. The main building block of the
relational database is the table (also known as a relation). Each table contains a set of related records. For example, a sales database might contain the following tables:
- Customers table that contains contact information for all the organization's clients
- Sales Reps table that contains identity information on the organization's sales force
- Orders table that contains records of orders placed by each customer

Relationships between the tables are defined to identify related records. In this example, a relationship exists between the Customers table and the Sales Reps table because each customer is assigned a sales representative and each sales representative is assigned to one or more customers. 

This relationship is reflected by the Sales Rep field/column in the Customers table. 
The values in this column refer to a Sales Rep ID field contained in the Sales Rep table (not shown). Additionally, a relationship would probably exist between the Customers table and the Orders table because each order must be associated with a customer, and each customer is associated with one or more product orders. The Orders table (not shown) would likely contain a Customer field that contained one of the Customer ID values.

**Type of Keys**
***Primary Keys*** 
A primary key is selected from the set of candidate
keys for a table to be used to uniquely identify the records in a table.
Each table has only one primary key, selected by the database designer from the set of candidate keys. The RDBMS enforces the uniqueness of primary keys by disallowing the insertion of multiple records with the same primary key. In the Customers table shown in
the table above, the Company ID would likely be the primary key.
***Alternate Keys*** 
Any candidate key that is not selected as the
primary key is referred to as an alternate key. For example, if the telephone number is unique to a customer in the table, then Telephone could be considered a candidate key. Since Company ID was selected as the primary key, then Telephone is an alternate key.
***Foreign Keys*** 
A foreign key is used to enforce relationships
between two tables, also known as referential integrity. Referential integrity ensures that if one table contains a foreign key, it corresponds to a still-existing primary key in the other table in the relationship. It makes certain that no record/tuple/row contains a reference to a primary key of a nonexistent record/tuple/row. In the example described earlier, the Sales Rep field shown in the table.
**Transactions**
Each transaction is a discrete set of SQL instructions that should either succeed or fail as a group. It's not possible for one part of a transaction to succeed while another part fails.
### MS SQL Database
#### Interacting using sqsh skwish database shell
**Connecting to the server**
```
sqsh -S server -U username -P password
```
[1>] is the prompt you receive when you successfully connect.
**Retrieving table records**
```
1> SELECT * FROM [dbname].dbo.[table-name];
2> go
```
**Retriving records from a table**
```
1> SELECT Username, Password FROM table_name; 
2> go
```
**Running system commands**
First we enable [xp_cmdshell]
```
1> EXEC SP_CONFIGURE N'xp_cmdshell', 1
2> go
```
Then we execute commands
```
1> xp_cmdshell 'command';
2> go
```
#### Using mssqlclient.py from impacket
**Connecting to the server**
```
mssqlclient.py -p 1433 username@ip
```
**Retriving current existing databases**
```
SQL> SELECT name FROM [dbname].dbo.sysdatabases
```
**Selecting a databases**
```
SQL>  use [dbname]
```
**Retrieving tables**
``` 
SELECT  * FROM INFORMATION_SCHEMA.TABLES;
```
**Retrieving columns from a table**
```
SELECT COLUMN_NAME 'All_Columns' FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='tablename '
```
**Retrieving records from a tables**
```
select UserName,Password from tablename
```
#### Using sqlcmd
**Access mssql cmd from terminal**
```
sqlcmd -S localhost -U <user> -P '<password>'
```
**Export a database dump**
```
BACKUP DATABASE <database> TO DISK = '<file>';
```

## MongoDB

|Command|Description|
|:-:|:--|
|`createUser`|Creates a new user.|
|`show dbs`|View all databases|
|`use dbName`|Create a new or switch databases|
|`db`|View current Database|
|`db.dropDatabase()`|Delete Database|
|`usersInfo`|Returns information about the specified users.|

### Collection Commands

|Command|Description|
|:-:|:--|
|`db.createCollection('collection_name')`|Create a collection named 'collection_name'|
|`db.collection_name.drop()`|Drop a collection named 'collection_name'|

### Row(Document) Commands

|Command|Description|
|:-:|:--|
|`db.collection_name.find()`|Show all Rows in a Collection|
|`db.collection_name.find().pretty()`|Show all Rows in a Collection (Prettified)|
|`db.collection_name.findOne({name: 'ritwik'})`|Find the first row matching the object|
|`db.collection_name.insert({'name': 'Ritwik','lang': 'sql','member_since': 5 })`|Insert One Row|
|`db.collection_name.insertMany([{'name': 'Ritwik','lang': 'sql','member_since': 5}, {'name': 'Rohan','lang': 'Python','member_since': 3},{'name': 'Lovish','lang': 'Java','member_since': 4}])`|Insert many Rows|
|`db.collection_name.find({lang:'Python'})`|Search in a MongoDb Database|
|`db.collection_name.find().limit(2)`|Limit the number of rows in output|
|`db.collection_name.find().count()`|Count the number of rows in the output|
|`db.collection_name.updateOne({name: 'Shubham'},{$set: {'name': 'Harry','lang': 'JavaScript','member_since': 51}},{upsert: true})`|Update a row|
|`db.collection_name.update({name: 'Rohan'},{$inc:{member_since: 2}})`|Mongodb Increment Operator|
|`db.collection_name.update({name: 'Rohan'},{$rename:{member_since: 'member'}})`|Mongodb Rename Operator|
|`db.collection_name.remove({name: 'Harry'})`|Delete Row|
|`db.collection_name.deleteOne({name: 'Harry'})`|Delete one Row|
|`db.collection_name.deleteMany({lang: 'JavaScript'})`|Delete many Row|

### MongoDB Query Operators

> There are many query operators that can be used to compare and reference document fields.

### Comparison Operators

> The following operators can be used in queries to compare values:

|Command|Description|
|:-:|:--|
|`$eq`|Values are equal|
|`$ne`|Values are not equal|
|`$gt`|Value is greater than another value|
|`$gte`|Value is greater than or equal to another value|
|`$lt`|Value is less than another value|
|`$lte`|Value is less than or equal to another value|
|`$in`|Value is matched within an array|

### Logical Operators

> The following operators can logically compare multiple queries.

|Command|Description|
|:-:|:--|
|`$and`|Returns documents where both queries match|
|`$or`|Returns documents where either query matches|
|`$nor`|Returns documents where both queries fail to match|
|`$not`|Returns documents where the query does not match|

### Evaluation Operators

> The following operators assist in evaluating documents.

|Command|Description|
|:-:|:--|
|`$regex`|Allows the use of regular expressions when evaluating field values|
|`$text`|Performs a text search|
|`$where`|Uses a JavaScript expression to match documents|

### MongoDB Update Operators

> There are many update operators that can be used during document updates.

### Fields

> The following operators can be used to update fields:

|Command|Description|
|:-:|:--|
|`$currentDate`|Sets the field value to the current date|
|`$inc`|Increments the field value|
|`$rename`|Renames the field|
|`$set`|Sets the value of a field|
|`$unset`|Removes the field from the document|

### Array

> The following operators assist with updating arrays.

|Command|Description|
|:-:|:--|
|`$addToSet`|Adds distinct elements to an array|
|`$pop`|Removes the first or last element of an array|
|`$pull`|Removes all elements from an array that match the query|
|`$push`|Adds an element to an array|

### MongoDB - Aggregation

| Expression  | Description                                                                                                                                                       |
| :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   `$sum`    | Sums up the defined value from all documents in the collection.                                                                                                   |
|   `$avg`    | Calculates the average of all given values from all documents in the collection.                                                                                  |
|   `$min`    | Gets the minimum of the corresponding values from all documents in the collection.                                                                                |
|   `$max`    | Gets the maximum of the corresponding values from all documents in the collection.                                                                                |
|   `$push`   | Inserts the value to an array in the resulting document.                                                                                                          |
| `$addToSet` | Inserts the value to an array in the resulting document but does not create duplicates.                                                                           |
|  `$first`   | Gets the first document from the source documents according to the grouping. Typically this makes only sense together with some previously applied “$sort”-stage. |
|   `$last`   | Gets the last document from the source documents according to the grouping. Typically this makes only sense together with some previously applied “$sort”-stage.  |
