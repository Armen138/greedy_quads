# Greedy Quads

To further my understanding of Greedy Voxel Meshing, I've written this JavaScript implementation. I chose JavaScript for this because it allows me to iterate (and thus learn) quicker.

Some learning resources that I've consulted:

* https://0fps.net/2012/06/30/meshing-in-a-minecraft-game/
* https://github.com/roboleary/GreedyMesh/blob/master/src/mygame/Main.java
* http://www.gedge.ca/dev/2014/08/17/greedy-voxel-meshing

For the sake of simplicity, this code simply generates a 2d field of quads ("voxels") of 6x6, placing a voxel at each grid coordinate with a chance of 75%. Hitting space will trigger the "greedy" algorithm that attempts to build an optimal set of quads for this "mesh". See console output for timing information.

While there is some left to improve, the number of quads is consistently reduced by a significant number, and performance is good.