# ideal-engine 
**CompareApp**: Custom comparison application that allows auto-sorting of options based on criteria.

Ever tried to make a decision and ended up writing scores of entries in poorly-sized tables in Excel, sorting them by things that can be sorted (quantifyable things like price as opposed to subjective things like neighborhoods etc.) and then still eye-balling your decision? Well, then this is the app for you!


## Use-Case Example

For example, if trying to compare three apartment options to move to, you might make a list like this:

<img src="https://raw.githubusercontent.com/adinutzyc21/ideal-engine/master/example.png" width="640px">

Then, you'll have to decide which features are more important (low price? space? user ratings? distance to work? etc.) and pick an apartment. This app would allow you to give relative importance to each of these criteria as well as score each option for each of these criteria, and then sort the columns based on the overall scores, to make decisions easire for you!


## Create Comparison Overview

<img src="https://raw.githubusercontent.com/adinutzyc21/ideal-engine/master/appDesign.png" width="640px">

- The column headers (Criterion 1, Criterion 2 etc.) represent the criteria by which sorting to occurs. E.g. price, square footage, location etc. These are added by the user, according to their preference.
- Clicking on the '+' sign on the right adds a new column to the right of the table. By hovering over the column header, a gray tab appears. Dragging this gray tab moves the column left or right. Clicking on the 'X' on the gray tab deletes the column.
- Each criterion is assigned a score. For example, in a computer comparison, price may be more important than hard disk space, so price gets a score of 6 and hard disk space gets a score of 4. The scores are relative to each other and are between **0 - 10**, where higher is better. The default score when a new column is added is **5**. A criterion with a score of 0 will be ignored. For our computer example, you can have a URL to the store that sells the product and assign it a score of 0 since the URL doesn't play a role in the comparison.
- The row headers (Option 1, Option 2 etc.) are the various options being compared. E.g. apartment complexes, cars, laptops etc. These are also added by the user.
- Clicking on the '+' sign below the last row adds a new row at the bottom of the table. By hovering to the left of each row header, a gray tab appears. Dragging this gray tab moves the row up or down. The row can be deleted by clicking the 'X' on the gray tab.
- Each option-criteria pair is also assigned a score based on how well the user thinks that option fits the corresponding criterion.  For example, say computer 1 is very expensive so it gets a price score of 1 and computer 2 is more reasonably priced so it gets a price score of 6. The scores are relative to each other and are between **1 - 10**, where higher is better. The default score when a new option is added is **5** for all criteria in the table. A score of 0 is not allowed for options-criteria pairs.
- The scores are displayed to the right in each cell, and the user can use the arrows to increase or decrease the score for that cell.
- The entire table is displayed inside a scrollable section, so that the "Score Comparison!" and "Save Comparison" buttons are always at the bottom of the screen, visible. By clicking the "View Full Screen" icon, the table is popped up and stretched on the whole page.
- The "Score Comparison!" button calculates the overall score for each of the options using the formula ![equation](https://latex.codecogs.com/gif.latex?S_%7BO_%7Bi%7D%7D%3D%5Csum_%7Bj%7D%28S_%7BC_%7Bj%7D%7D%5Ccdot%20S_%7BO_%7Bi%7D%2CC_%7Bj%7D%7D%29)
- When the comparison is scored, the rows (options) will be sorted by the total score calculated above. The 'winner' options will be highlighted, so if more options have the same score, they will all be highlighted.

### Thoughts for the future:
- If a price is provided, should be able to parse that as a score.
- Right-click add column left/right and add row above/below options.
- Sort criteria by score.
