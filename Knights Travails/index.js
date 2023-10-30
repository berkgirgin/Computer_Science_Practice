console.log(
  "This script prints out the shortest path on a chess board a knight can take"
);

const boardSize = 8;

class KnightPositionNode {
  constructor(coordinateX, coordinateY, previousNode = null) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
    this.previousNode = previousNode;
  }
}

function knightMoves(
  [startCoordinateX, startCoordinateY],
  [endCoordinateX, endCoordinateY]
) {
  if (
    !isMoveFittingTheBoard(startCoordinateX, startCoordinateY) ||
    !isMoveFittingTheBoard(endCoordinateX, endCoordinateY)
  ) {
    console.log(`you must enter coordinates closer than ${boardSize}`);
  }
  console.log(
    `going from [${startCoordinateX}, ${startCoordinateY}] to [${endCoordinateX}, ${endCoordinateY}]`
  );
  const X_knightMoves = [1, 1, -1, -1, 2, 2, -2, -2];
  const Y_knightMoves = [2, -2, 2, -2, 1, -1, 1, -1];

  const startNode = new KnightPositionNode(startCoordinateX, startCoordinateY);

  const queue = [startNode];

  while (queue.length > 0) {
    if (
      queue[0].coordinateX === endCoordinateX &&
      queue[0].coordinateY === endCoordinateY
    ) {
      let resultPath = getResultPath(queue[0]);
      //   console.log(resultPath);

      printResult(resultPath);
      return resultPath;
    }

    for (let i = 0; i < 8; i++) {
      let nextMoveX = queue[0].coordinateX + X_knightMoves[i];
      let nextMoveY = queue[0].coordinateY + Y_knightMoves[i];

      if (isMoveFittingTheBoard(nextMoveX, nextMoveY)) {
        const newNode = new KnightPositionNode(nextMoveX, nextMoveY, queue[0]);
        queue.push(newNode);
      }
    }

    queue.shift();
  }

  function getResultPath(node) {
    const resultArray = [];
    return getPathRecursive(node);

    function getPathRecursive(node) {
      //   console.log(node);

      if (node.previousNode === null) {
        resultArray.unshift([startCoordinateX, startCoordinateY]);
        return resultArray;
      }

      resultArray.unshift([node.coordinateX, node.coordinateY]);
      return getPathRecursive(node.previousNode);
    }
  }

  function isMoveFittingTheBoard(plannedMove_X, plannedMove_Y, boardSize) {
    if (
      plannedMove_X < 0 ||
      plannedMove_X >= boardSize ||
      plannedMove_Y < 0 ||
      plannedMove_Y >= boardSize
    ) {
      return false;
    } else {
      return true;
    }

    // maybe add a way to skip already visited nodes?
  }

  function printResult(arr) {
    console.log(`You made it in ${arr.length - 1} moves!  Here's your path:`);

    arr.forEach((element) => {
      console.log(`[${element[0]}, ${element[1]}]`);
    });
  }
}

knightMoves([4, 2], [1, 6]);
