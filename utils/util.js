// util.js用来存放公用函数，最后记得module.exports = {} 出去，才能被其他js文件require后使用
// 将35、40、5等star数该为[1,1,1,2,0]、[1,1,1,2,0]、[1,1,1,1,1]，
// 即全星用1表示、半星用2表示、零星用0表示
function processStars(starString) {
    // 设置一个含有5个0的数组
    var starsArr = [0, 0, 0, 0, 0];
    var starNum = starString.substring(0, 1); // 截取starString的第[0,1)，即包括第0位，不包括第1位，为全星个数
    var ifHalfStar = starString.substring(1, 2); // 截取starString的第[1,2)，即第1位

    // 把全星标志加到数组里
    for (var i = 0; i < starNum; i++) {
        starsArr.splice(i, 1, 1); // 从下标为i的地方开始，删除1个元素，并添加进1
    }

    // 把半星的标志加到数组里
    if (ifHalfStar == 5) starsArr.splice(i, 1, 2);//从下标为i的地方开始，删除1个元素，并添加进2

    return starsArr;
}

module.exports = {
    processStars: processStars
}