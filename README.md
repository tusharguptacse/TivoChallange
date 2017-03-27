Tivo Data Visualization Challenge

I have used the open source library "Chart.js" to develop the visualization of the given data.

Initially, I have added a month and year picker to filter the data according to the given month and year. When a month and year is selected, the data of the selected month and year will be plotted on the bar graph. 

The legend will help in understanding what the colors and borders represent, but broadly there are four colors each representing a name and the border represents whether the person is active or inactive.

The X-axis represents the date of the selected month and if there is data for the given date, it is plotted as a bar.
The Y-axis represents the length attribute of the object from data.

When one of the bar graph is clicked, another line chart is created below the graph which gives further information regarding that particular object.

The line chart below plots the four values of 'tango', 'india', 'victor' and 'oscar'. The X-axis represents the four mentioned values, while the Y-axis represents the percentage of these values. The actual value can be found by hovering over the plotted point.

Selecting different month and year will generate the graphs dynamically by filtering out on the data by the selected month and year.

I figured out that the initials in the names stand for R O V I and the data inside each object is military lingo for T I V O.