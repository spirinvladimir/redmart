var fs = require('fs');
var AVLTree = require('avl');
var tree = new AVLTree();
var map = fs.readFileSync('map.txt', 'utf-8').split('\n').map(l => l.split(' ').map(c => Number(c)));
var [I, J] = map.shift();
var result = {
    path: 0,
    drop: 0
};

for (var i = 0; i < I; i++)
    for (var j = 0; j < J; j++)
        map[i][j] = tree.insert(map[i][j], {i, j});

tree.range(tree.min(), tree.max(), ski);

function ski(node) {
    var {i, j} = node.data;
    var h      = node.key;
    var path   = 0;
    var drop   = 0;
    var up     = i > 0       && map[i - 1][j];
    var left   = j > 0       && map[i][j - 1];
    var down   = i < I - 1   && map[i + 1][j];
    var right  = j < J - 1   && map[i][j + 1];

    if (up && up.key < h && 1 + up.data.path > path) {
        path = 1 + up.data.path;
        drop = h - up.key + up.data.drop;
    }
    if (left && left.key < h && 1 + left.data.path > path) {
        path = 1 + left.data.path;
        drop = h - left.key + left.data.drop;
    }
    if (down && down.key < h && 1 + down.data.path > path) {
        path = 1 + down.data.path;
        drop = h - down.key + down.data.drop;
    }
    if (right && right.key < h && 1 + right.data.path > path) {
        path = 1 + right.data.path;
        drop = h - right.key + right.data.drop;
    }

    node.data.path = path;
    node.data.drop = drop || h;

    if (path > result.path) {
        result.path = path;
        result.drop = drop;
    }
}

console.log([result.path + 1, result.drop, '@redmart.com'].join(''))
