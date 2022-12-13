**Submission Structure: I have submitted the same folder as the one I was working in on my local machine but have removed the node_modules folder from both the frontend and backend folders.**

Functionalities implemented in my website based on the Assignment document pdf:
1. Buyer Details, Vendor Details, Food Item Details and Wallet Details have all been implemented.

2. Login and Registration:
Common registration page with a drop-down to choose user type (Vendor / Buyer) and have fields appear as per their profile.
Common login portal redirecting to respective UI after login.

3. Buyer Use Cases:
Profile page with buyer details and an option to edit them.
The dashboard with all the features implemented.
In the food item list, for each food item, the buyer should be able to view all its properties such price, name, vendor, etc.
For each food item, the buyer should be able to choose from: its quantity (an integer value), some addons available within a food item and place an order with a buy button.
Wallet amount should be visible at the top, and the functionalities present in the Wallet Details section should be implemented.
My Orders page

4. Vendor Use Cases:
Profile page with vendor details and an option to edit them.
A Food Menu dashboard displaying all food items of the vendor. There must be a button at the top to add a food item. For each added food item, there must be 2 options available - to Edit, and to Delete the food item.
A dashboard to view orders issued to the vendor, each order should have details such as placed time, food item, quantity, along with a button to change the status of the order. This button should be dynamic in nature, i.e. the functionality of this button depends on the status of the order.
Statistics Page.
Any vendor can have at-max 10 orders at ACCEPTED and COOKING stage combined. It can’t move any more
orders in the ACCEPTED stage till any of these orders reach READY FOR PICKUP stage. An error popup
should appear in case the vendor tries to accept more.

## Installations

### Node

* For Linux:

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:

```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:

```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:

```
npm start
```

## Running the Code

* Run Mongo daemon:

```
sudo mongod
```

Mongo will be running on port 27017.


* Run Express Backend:

```
cd backend/
npm install
npm start
```

* Run React Frontend:

```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.
