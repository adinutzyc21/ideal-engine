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
- You will then, most likely, see a bunch of tables that you can select from. There are two types of tables: private or public. If you didn't log in, you will only see public tables (open-eye icon, gray background). Private tables (closed-eye icon, cyan background) are available for logged-in users. A logged in user can create a private table by unchecking the checkbox upon creation. 
- A table can be selected by pressing the green check-mark or deleted by pressing the red recycle bin underneath it. In this tutorial, we are going to create a new, public table and compare some options using it.
- Select *File* from the Menu Bar. Click on *New Table*. If you were logged in, this is where you would be able to uncheck the *Make Public* checkbox in order to create a private table. Fill out the table name (say "Test Table") and, optionally, a description. Click the *+ New Table* button.
- Click the green checkbox button under the new table you just created. You'll see a *No data available. Use the menu to add data.* message after the table loads.
- Click the *Edit* menu option in the Menu Bar. 
- Let's first add a couple of options manually. Click on *Add Option*. Write an option name (say, "Test 1") and click *+ Add*. Repeat this step again and add another option (say, "Test 2"). Your table now looks like:

| Option Name |
| ----------- |
| Test 1  [5] |
| Test 2  [5] |

- Let' now add a couple of criteria manually. Click on *Add Criterion*. Fill in a criterion name (say, "Criterion 1", with a score of 4). Then fill out values for this criterion corresponding to each of the options (say, 10 with score 7 and 20 with score 5) and click *+ Add*. Repeat this step again for "Criterion 2"(6) (with "abc" (1) and "def" (4)).
- Let's add a new option, just to prove how that works. Fill out the name ("Test 3") and fill out the values for each criterion (5 with score 8) and (ghi with score 7). Your table now looks like:

| Option Name | Criterion 1 [4] | Criterion 2 [6] |
| ----------- | --------------- | --------------- |
| Test 1 [5]  | 10          [7] | abc         [1] |
| Test 2 [5]  | 20          [5] | def         [4] |
| Test 3 [5]  | 5           [8] | ghi         [7] |

- You can now score this table. Press the *green play* button in the menu bar, and you'll see that the scores next to the option names get updated, as well as the order of the option changes based on this score (from high to low). If you were trying to make a decision, you'd probably want to pick "Test 3" in this case!
- You can delete a row by clicking on the *x* before the option name in each row. Delete "Test 2" and see it disappear from the table. Note that there is no Undo option for now.
- You can also delete a column by clicking the *x* before the criterion name. Delete "Criterion 2" and see it disappear from the table. Note that there is no Undo option for now.
- The table does not get auto-scorred for now, so press the *green play* button again to score. Note that the score for "Test 2" changed although the overall order didn't.
- You can also empty the table (go to *Edit* > *Empty Table*). This erases all the data in the table. Please note there is no Undo option for now.
- If you want to play with some data, you can select *Edit* > *Populate Table* and you'll get a filled-out, test table.

## Running on your own computer

If you'd rather run this locally, or want to make a pull request, here's how to install it. Please note that these instructions are for Mac/Linux, for Windows you'd want to download Meteor from [here](https://www.meteor.com/install), add to PATH (folder is *C:\Users\yourUserName\AppData\Local\.meteor\*) and manually do all of the steps below (or use cmd, or git bash etc.). 

``` bash
# install meteor (on windows from https://install.meteor.com/windows)
curl https://install.meteor.com/ | sh
# check code out
git checkout https://github.com/adinutzyc21/ideal-engine
# navigate to the ideal-engine folder
cd ideal-engine
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
