# ideal-engine 
**CompareApp**: Custom comparison application that allows auto-sorting of options based on criteria.

Ever tried to make a decision and ended up writing scores of entries in poorly sized tables in Excel, sorting them by things that can be sorted (price as opposed to location etc.) and then still eye-balling your decision? Well, then this is the app for you!

## Create Comparison Overview


<img src="https://raw.githubusercontent.com/adinutzyc21/CompareApp/master/appDesign.png" width="640px">

- Criterion 1, Criterion 2 etc. are the criteria by which sorting occurs. E.g. price, square footage, location etc. These are added by the user.
- Option 1, Option 2 etc. are the various options being compared. E.g. apartment complexes, cars, laptops etc. These are also added by the user.
- The user assigns scores to criteria (for example, price is more important than hard disk space, so price gets a score of 6 and hard disk space gets a score of 4). The scores are relative to each other and are between **0 - 10**, where higher is better and the default is **5**. A criterion with a score of 0 will be ignored (for example, you can have the buy URL and assign it a score of 0). 
- For each option, the user adds scores for how well they think that option fits the criteria (for example, computer 1 is very expensive so it gets a score of 1 and computer 2 is more reasonably priced so it gets a score of 3). The scores are relative to each other and are between **1 - 10**, where higher is better and the default is **5**. A score of 0 is not allowed for options.
- The score is displayed to the right in each cell, and the user can use the arrows to increase or decrease the score for that cell.
- By clicking the plus sign to the right of the last column or below the last row, you can add a new column or row, respectively, at the end. This newly created column / row can be then moved by hovering above or to the left and using the gray tabs that appear. The row/column can be deleted by clicking the red X-es that appear also when hovering.
- The entire table is displayed inside a scrollable section, so that the "Score Comparison!" and "Save Comparison" buttons are always at the bottom of the screen. By clicking the "View Full Screen" icon, the table is popped up and displayed on the whole page.
- The "Score Comparison!" button calculates the overall score for each of the options using the formula ![equation](http://latex.codecogs.com/gif.latex?Score_%7BO_p%7D%3D%5Csum_%7Bi%7D%28Score_%7BC_i%7D%5Ccdot%20Score_%7B%7BO_p%7D_i%7D%29)
- The columns (criteria) are sorted by the Criteria Score ![equation](http://latex.codecogs.com/gif.latex?Score_%7BC_i%7D)
- The rows (options) are sorted by the total score calculated above ![equation](http://latex.codecogs.com/gif.latex?Score_%7BO_p%7D)
- The 'winner' options will be highlighted. If more options have the same score, they both will be highlighted.

### Thoughts for the future:
- If a price is provided, should be able to parse that as a score.
