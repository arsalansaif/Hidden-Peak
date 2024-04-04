# CS 509 Hidden Peak

This is the gitlab repository for the Hidden Peak team's group project. The live website is hosted on AWS here: https://cs509hiddenpeak.s3.us-east-2.amazonaws.com/welcome.html

## Site Manager Credentials

In order to log into the site manager landing page, use the following credentials:

```
Username: admin
Password: admin
```

## Store Owner Credentials
For convenience, the database is prepopulated with the following store owner credentials:

![alt text](images/image.png "Title")

 Feel free to login as any of these store owner accounts or create a new one.

## Use Cases

The following use cases are currently implemented as of 11/26/23:

### Site Manager

- (SM) Report total inventory $$ amount in entire site
- (SM) Remove Store
- (SM) Report $$ balance for site manager
- (SM) Generate $$ report of total site inventory (i.e., just a total number)
- (SM) Generate report of site inventory aggregated by virtual store (i.e., one row for each store)

### Store Owner

- (SO) Create Store
- (SO) Add Computer
- (SO) Remove Computer From Inventory
- (SO) Generate Inventory
- (SO) Generate total store $$ balance
- (SO) Modify computer price

### Customer

- (C) List Stores
- (C) Generate Inventory Report For Specific Store
- (C) Generate Inventory for specific filter criteria
- (C) Compare multiple computers
- (C) Purchase computer

## Team Member Contributions

Samy
- Front end design
- Front end calculations (inventory summation, computer filtering)
- Bug fixes

Stephen J.
- Lambda functions
- Backend integration
- Database

Steve C.
- Lambda functions
- Backend integration
- Database
- S3 implementation
- Bug fixes

## Instruction For Running Final Iteration

- Site Manager Remove Store
    1. From home screen
    2. Select Site Maneger
    3. Login with site manager credentials - admin, admin
    4. Click remove store
    5. Select desired store from drop down
    6. Click remove

- Site Manager Sorting Store Inventory by $$
    1. From home screen
    2. Select Site Maneger
    3. Login with site manager credentials - admin, admin
    4. Click inventoiry report
    5. Sort by drop down, asc, desc

- Store Owner Modify Computer Price Store Owner
    1. From home screen
    2. select store Owner
    3. Login to any store or create new store
    4. Create computer if necessary by clicking Add New Computer
    5. If comoputers exist, click View/Remove Inventory
    6. Click edit (blue) next to desired computer in the action column
    7. Type new price
    8. Click save (green) in action column

- Customer computer filtering
    1. From home screen
    2. Click customer
    3. From select store drop down select All stores or a specific store
    4. From same page, use side bar to select filter criteria. Click apply filters button (green)
    
- Customer Compare Computers
    1. From home screen
    2. Click customer
    3. Select at least 2 computers by using the check boxes on the item block
    4. Click compare
    5. Exit by using X in upper right... not the browser X

- Customer Buy Computer
    1. From home screen
    2. Click customer
    3. Enter latitude and longitude
    4. Click buy now ONCE... There may be a delay. Clicking more than once may cause an error. 
       The customer will not see the purchase displayed.

- Site Manager
    1. From home screen
    2. Select Site Maneger
    3. Login with site manager credentials - admin, admin
    4. Click inventory report
    5. Check total site balance underneath table

- Store Owner Review Balance
    1. From home screen
    2. select store Owner
    3. Login to any store or create new store
    4. Click View/Remove Inverntory
    5. Check total store balance underneath table

    


