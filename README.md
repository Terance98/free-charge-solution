# free-charge-solution

This repo contains a solution that I did for Freecharge contest in HackerEarth

UPI 2.0

Problem statement

Develop a pseudo backend application using NodeJS, Express, and MongoDB that can act as a backend for UPI 2.0.

Minimum requirement  (entry-level)

- Register API: (User Input: Name, username, password), account number to be created by
	- Backend: Random 8 digit unique throughout
	- Output: Account number, username, and name
- Login API using username password: JWT Token
	- If account details exist, then print account details
	- Else msg to upload CSV
- Upload csv() bank statement [date, withdraw, deposit, balance] -
	- To store the CSV data to DB with respect to users as its current account details) only 100 records (first 100)
	- Return with the credit limit and rate of interest
	- Credit limit calculation should work based on average monthly balance and the credit limit should be 20% + avg monthly balance
	- Total deposits - credits each month  = monthly balance
	- Avg monthly Balance = all months monthly balance /12
	- Credit limit =  Avg monthly balance * 1.2 (i.e 20% + credit limit)
- Submit Screenshots, Source code, and Instructions. 

Additional points (intermediate)

- Store CSV in S3
	- Creds: encryption, decryption
- Calculate EMI and show EMI calculation to include interest and principal with tenure 3 to 5.
	- years(show both options EMI)
- Account transfer API based on account data, - to take receivers username and amount(user input)
- If no account details, then upload a CSV message
- A minimum balance of Rs.1000 to be maintained.
- Use MongoDB Cloud Atlas instead of local 

Guide

Sample CSV 

https://s3-ap-southeast-1.amazonaws.com/he-public-data/User_Bank_Statement%20(1)d07e73e.csv

- Ideal backend stack: NodeJS, Express, and MongoDB

Import the following as a csv file into the code.

```
Date,Description,Withdraw,Deposit,Closing Balance
,,,,75000
1/1/2019,ABC Ltd,5000,,70000
1/5/2019,XYZ Ltd,,3000,73000
1/9/2019,v Ltd,34200,,38800
1/13/2019,LMN Ltd,,61300,100100
1/17/2019,R pvt ltd,49000,,51100
1/21/2019,ABC Ltd,,563,51663
1/25/2019,XYZ Ltd,2384,,49279
1/29/2019,v Ltd,,7695,56974
2/2/2019,LMN Ltd,4867,,52107
2/6/2019,R pvt ltd,,3423,55530
2/10/2019,ABC Ltd,897,,54633
2/14/2019,XYZ Ltd,54,,54579
2/18/2019,v Ltd,456,,54123
2/22/2019,LMN Ltd,67,,54056
2/26/2019,R pvt ltd,,7868,61924
3/2/2019,ABC Ltd,,878,62802
3/6/2019,XYZ Ltd,,67,62869
3/10/2019,v Ltd,76,,62793
3/14/2019,LMN Ltd,,9807,72600
3/18/2019,R pvt ltd,5000,,67600
3/22/2019,ABC Ltd,,3000,70600
3/26/2019,XYZ Ltd,34200,,36400
3/30/2019,v Ltd,,61300,97700
4/3/2019,LMN Ltd,49000,,48700
4/7/2019,R pvt ltd,,563,49263
4/11/2019,ABC Ltd,2384,,46879
4/15/2019,XYZ Ltd,,7695,54574
4/19/2019,v Ltd,4867,,49707
4/23/2019,LMN Ltd,,3423,53130
4/27/2019,R pvt ltd,897,,52233
5/1/2019,ABC Ltd,54,,52179
5/5/2019,XYZ Ltd,456,,51723
5/9/2019,v Ltd,67,,51656
5/13/2019,LMN Ltd,,7868,59524
5/17/2019,R pvt ltd,,878,60402
5/21/2019,ABC Ltd,,67,60469
5/25/2019,XYZ Ltd,76,,60393
5/29/2019,v Ltd,,9807,70200
6/2/2019,LMN Ltd,5000,,65200
6/6/2019,R pvt ltd,,3000,68200
6/10/2019,ABC Ltd,34200,,34000
6/14/2019,XYZ Ltd,,61300,95300
6/18/2019,v Ltd,49000,,46300
6/22/2019,LMN Ltd,,563,46863
6/26/2019,R pvt ltd,2384,,44479
6/30/2019,ABC Ltd,,7695,52174
7/4/2019,XYZ Ltd,4867,,47307
7/8/2019,v Ltd,,3423,50730
7/12/2019,LMN Ltd,897,,49833
```

