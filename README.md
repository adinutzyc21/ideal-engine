# ideal-engine 
**CompareApp**: Custom comparison application that allows auto-sorting of options based on criteria.

Have you ever tried to decide between a bunch of options and, after painstakingly filling out a lot of criteria in a poorly-sized table in Microsoft Excel still ended up eye-balling your decision? Well, then this is the app for you! 

The *CompareApp* allows you to assign relative importance to each criterion, as well as to individually score each option within each criterion. A total score is then calculated for every option, and the options are sorted based on these scores, in order to make the final decision easier for you to make.

The app is live, in a draft state, at [ideal-engine](https://ideal-engine.herokuapp.com/). Please read on to learn more about it and how to use it!


## Example

For example, if trying to compare three apartment options to move to, you might make a list sort of like this one:

<img src="https://raw.githubusercontent.com/adinutzyc21/ideal-engine/master/design/example.png" width="100%">

Then, you would decide which features (criteria) are more important for you (low price? space? user ratings? distance to work? pet policy? etc.), eyeball-rank the choices, and pick an apartment to move to, generally using a gut feeling more than anything else. 

## Application Overview

Let's create a comparison! Go to [ideal-engine](https://ideal-engine.herokuapp.com/).

- Either log in using the sign in menu (top-right) or click *Continue as Guest*. For this tutorial, continuing as guest is good enough.
- You will then see a bunch of tables that you can select. There are two types of tables: private or public. If you didn't log in, you will only see public tables (open-eye icon, gray background). Private tables (closed-eye, cyan background) are available for logged in users, if they were marked private upon creation. 
- A table can be selected by pressing the green check-mark or deleted by pressing the red recycle bin underneath it. In this tutorial, we are going to create a new, public table and add score some options using it.
- Select *File* from the Menu Bar. Click on *New Table*. If you were logged in, this is where you would be able to uncheck the *Make Public* option in order to create a private table. Fill out the table name and, optionally, a description. Click the *+ New Table* button.
- Click the green checkbox button under the new table you just created. You'll see a *No data available. Use the menu to add data.* message after the table loads.
- Click the *Edit* menu option in the Menu Bar. Let's first add an option manually. Click on *Add Option*. TO BE CONTINUED



## Running on your own computer

If you'd rather run this locally, or want to make a pull request, here's how to install it. Please note that these instructions are for Mac/Linux, for Windows you'd want to download Meteor from [here](https://www.meteor.com/install) and manually do all of the steps below. 

``` bash
# check code out
git checkout https://github.com/adinutzyc21/ideal-engine
# navigate to the ideal-engine folder
cd ideal-engine
# install meteor
curl https://install.meteor.com/ | sh
# run meteor 
meteor
```
The application will then be running at [localhost:3000](localhost:3000).

## Application Structure

TODO: Add descriptions for key components.

```
.
+-- client
|   +-- styles
|   |   +-- base
|   |   |   +-- *.scss
|   |   +-- utilities
|   |   |   +-- *.scss
|   |   +-- main.scss
|   +-- main.html
|   +-- main.jsx
+-- imports
|   |   +-- api
|   |   |   +-- comparison.js
|   |   |   +-- tables.js
|   |   +-- startup
|   |   |   +-- accounts-config.js
|   |   +-- ui
|   |   |   +-- Display
|   |   |   |   +-- TableDisplay.jsx
|   |   |   |   +-- TableHeading.jsx
|   |   |   |   +-- TableRow.jsx
|   |   |   +-- Login
|   |   |   |   +-- AccountsUIWrapper.jsx
|   |   |   |   +-- LoginPage.jsx
|   |   |   +-- Menu
|   |   |   |   +-- ComputeScore.jsx
|   |   |   |   +-- DataDelete.jsx
|   |   |   |   +-- DataInsert.jsx
|   |   |   |   +-- MenuBar.jsx
|   |   |   +-- Select
|   |   |   |   +-- TableCreate.jsx
|   |   |   |   +-- TableDelete.jsx
|   |   |   |   +-- TableLoad.jsx
|   |   |   |   +-- TableSelect.jsx
|   |   |   +-- App.jsx
+-- public
|   +-- logo.png
+-- server
|   +-- main.js
```
