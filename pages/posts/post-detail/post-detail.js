// 引入数据js文件
var postData = require("../../../data/postData.js"); // 这里一定是只能用相对路径
// 注意，传进来的是一个对象数组，我们的数据只是里面的一项而已

Page({
    // 生命周期函数——页面加载函数
    onLoad(option) {
        var postId = option.postId; // 通过这一句获取到了前一页面传来的postId变量值
        this.data.postId = postId;
        console.log("我成功地接收到了" + postId);
        var postList = postData.postList;
        var post = postList[postId];
        // 将单篇文章的数据发送到data对象，以便被视图层使用
        this.setData(post);

        // 设置缓存
        // wx.setStorageSync("key1", {
        //     name: "james", //注意字符串一定要加""，否则报错
        //     num: 23,
        //     age: 30
        // });

        // collected同步到data对象,postsCollected对象同步到缓存
        // 从缓存中获取当前文章在缓存中的collected收藏情况
        var postsCollected = wx.getStorageSync("postsCollectedS"); // 第一次因为缓存里没有postsCollectedS，所以首先拿到的是""
        // 从缓存拿collected值
        if (!postsCollected) { // 如果缓存为空，即全部文章都还没有点进详情看过
            console.log(postsCollected); // ""
            postsCollected = {};
            postsCollected[postId] = false;
            // 将false值放到缓存
            wx.setStorageSync("postsCollectedS", postsCollected);
        } else {
            var collected = postsCollected[postId];
            if (collected) { // 即如果不存在postsCollected[postId]
                collected = false;
            }
        }

        // collect同步到data对象
        this.setData({
            collected
        })
    },


    data: {
        // 由于在onLoad函数中将数据发送到data对象用的是this.setData(post);，post就是一个对象
        // 在data对象中的数据等价于下面，所以可以直接用数据进行访问，而不用对象.来访问
        // detail: `
        //     0凌晨四点的洛杉矶，环境优美，寂静
        //     文本文本文本文本文本文本文本文本文本文本文本文文本文本文本文本文本文本文本文本文本文本
        // `,
        // postTime: "0小时前",
        // authorName: "林晨0",
        // ...
        postId: 0

    },


    // 设置当点击收藏图标时触发事件响应函数
    // 养成一个习惯，可以无论是否得用到event参数，也把该默认参数写上
    // changeCollected(event) {
    //     // 获取缓存内容
    //     var key = wx.getStorageSync("key1");
    //     console.log(key);
    //     // 删除指定缓存
    //     wx.removeStorageSync("key1"); //这里不能是key变量，因为要是缓存中的key名
    //     // 删除所有缓存
    //     wx.clearStorageSync();
    // }

    // 若点击了收藏图片，则取出缓存数据，将其取反后，再更新数据到缓存中
    changeCollected(event) {
        console.log("我点击收藏按钮了哦");
        var postsCollected = wx.getStorageSync("postsCollectedS");
        // 取反
        var collected = !postsCollected[this.data.postId];
        // collected同步到postsCollected
        postsCollected[this.data.postId] = collected;
        // postsCollected同步到缓存
        wx.setStorageSync("postsCollectedS", postsCollected);
        // collected值发送到data对象
        this.setData({
            collected
        });

        // 收藏成功交互提醒
        wx.showToast({
            title: collected ? "收藏成功" : "取消成功",
            duration: 1000, // 设置时长，默认是1500ms
            icon: "success", // 成功图标、loading为加载图标
        })

    }

})