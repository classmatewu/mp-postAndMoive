// pages/posts/posts.js
// 小程序的js文件有一个Page函数，该函数只有一个参数，该参数是一个js对象，即所有编写的js代码都包含在这个对象里面
var postData = require("../../../data/postData.js"); // 注意这里只能用相对路径，而不能用绝对路径
// 这里的postList进来之后，也得在onLoad函数里利用this.setData(Object);将数据发送到data对象里

Page({

    /**
     * 页面的初始数据，跟vue框架的vue实例中的data对象作用一致
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //   1.0版本，之所以将一篇文章的数据放在一个对象里，写在onLoad函数里，再利用this.setData()函数将数据发送到data对象里，是因为真实程序从服务器获取数据后就是这样放
        //   2.0版本，将数据放在data目录下的js文件里，利用exports对象将数据挂载到对象上，在将模块引入，即模拟从服务器获取数据
        this.setData({
            postKey: postData.postList // 注意postList对象是postData对象数组里的对象
            // postData  这样写法相当于把整个postData对象数组传进来了，但在html文件中就应该用postData.postList访问对象数组里的对象
        }); //将数据发送到data对象里
        console.log("onloaddddd");
    },


    // 点击跳转到post-detail页面，event是一个默认事件参数
    intoPostDetail(event) {
        console.log("sjdfjdh");
        var postId = event.currentTarget.dataset.postid; 
        // 利用该条函数获取事件对象.节点对象.自定义属性集合.某个自定义属性
        // 注意，自定义组件组件data-postId后的postId会自动全部转换成小写，所以这里得用postid才能取到数据
        // 所以一般我们定义自定义属性时，data-后面的直接用小写
        console.log("点击了第%d篇文章", postId);
        wx.navigateTo({
            url: "../post-detail/post-detail?postId=" + postId
            // 利用这一句将postId变量发送给要跳转的页面，并且要跳转的页面通过函数接收即可获取到该变量
        })
    },

    intoPostDetail2(event) {
        console.log("sjdfjdh2");
        var postId = event.target.dataset.postid; 
        // 注意这里是用target而不是currentTarget，target表示被点击的元素，currentTarget表示捕获事件的函数
        // 因为这里target指image元素，currentTarget指swiper元素，而id放在image元素上，所以得用target
        // 利用该条函数获取事件对象.节点对象.自定义属性集合.某个自定义属性
        // 注意，自定义组件组件data-postId后的postId会自动全部转换成小写，所以这里得用postid才能取到数据
        // 所以一般我们定义自定义属性时，data-后面的直接用小写
        console.log("点击了第%d篇文章", postId);
        wx.navigateTo({
            url: "../post-detail/post-detail?postId=" + postId
            // 利用这一句将postId变量发送给要跳转的页面，并且要跳转的页面通过函数接收即可获取到该变量
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})