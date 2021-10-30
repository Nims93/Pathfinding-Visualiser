# Pathfinding Visualiser

### Made with vanilla Javascript, HTML and CSS

![Pathfinding Visualiser Demo](src/assets/Pathfinding-Visualiser-Demo.webp)

This app visualizes 5 pathfinding and 3 maze generation algorithms. Fully responsive and works just as well on mobile sized devices and touch inputs.

#### If you'd like to try it out, the application is live here:

#### [https://nims93.github.io/Pathfinding-Visualiser/](https://nims93.github.io/Pathfinding-Visualiser/)

The pathfinding algorithms are:

- **A\*** - Guranteed Shortest Path
- **Greedy Breadth First Search** - Lowest amount of visited nodes
- **Bi-Directional Breadth First Search** - Unweighted lower visited nodes than bfs
- **Breadth First Search** - Basic Search
- **Depth First Search** - Brute force search akin to turning left at every junction in a maze to guarantee you find the exit

#### The maze generation algorithms are:

- **Recursive Division** - Creates long corridoors
- **Recursive Backtracker** - Creates winding paths
- **Random Walls Generator** - Places walls nodes in random places

## What I Learned

This project helped me with my fundamental Js knowledge the most both in terms of grabbing and updating DOM elements but also the fundamentals that carryover to programming in general. I learned the difference between function arguments being passing by reference or value, array methods (filter, map, reduce, indexOf for example).

I also learned the value of git version control with the checkout and merge command which I used to update the way the app animates the nodes to the screen. I currently host the app on a second "gh-pages" branch on GitHub.

I made this application to get a full grasp of javascript as the best way to learn is through creating. I loved building it and I hope you enjoy it a much as I enjoyed making it!
