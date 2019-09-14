// pages/movies/more-movie/more-movie.js
var app = new getApp();
var util = require("../../../utils/util.js");

Page({
    data: {
        moviestype: "", // 三种电影类型中的那种
        allMoviesData: [], // 获取到的电影数据
        loadMoreMoviesUrlBase: "", // 加载时api地址基址
        loadNum: 0, // 加载次数，初始值为0
    },
    onLoad(options) {
        var moviestype = options.moviestype;
        this.data.moviestype = moviestype;
        console.log(moviestype);

        var allMovieUrl = "";
        switch (moviestype) {
            case "正在热映":
                allMovieUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                allMovieUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                allMovieUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.loadMoreMoviesUrlBase = allMovieUrl;

        this.http(allMovieUrl);
    },

    http(allMovieUrl) {
        var this_ = this;
        wx.request({
            url: allMovieUrl,
            data: {},
            method: "GET",
            header: {
                "Content-Type": "json",
            },
            // 获取成功则将信息打印出来
            success(res) {
                console.log(res);
                this_.processRes(res.data); // 处理从豆瓣拿来的数据信息res
            },
            fail(error) {
                console.log(error);
            }
        })
    },

    processRes(resData) {
        var subjects = resData.subjects;
        var allMoviesData = [];
        // var idx in subjects循环获取到的是subjects输出里的下标
        // 若subjects是对象，则循环输出对象里的键名
        for (var idx in subjects) {
            var aMovieData = {};
            console.log(idx); // 循环输出键名
            aMovieData.largeImg = subjects[idx].images.large;
            var title = subjects[idx].title;
            if (title.length >= 7) {
                // 若标题长度大于等于7，则取前六加...
                title = title.substring(0, 6) + "...";
            }
            aMovieData.title = title;
            aMovieData.average = subjects[idx].rating.average;
            aMovieData.starsArr = util.processStars(subjects[idx].rating.stars);

            // 将单个电影数据压入电影数据数组
            allMoviesData.push(aMovieData);
        }

        // 将新拿到的数据moviesData追加到data对象是allMoviesData对象中
        var temp = [];
        temp = this.data.allMoviesData.concat(allMoviesData);

        // 加载次数加1
        this.data.loadNum ++;

        // 发送到data对象
        this.setData({
            allMoviesData: temp
        });
        // 一般设置data中数值的值我们才用this.data.xxx = ，设置对象一般用this.setData({})
        // this.data.allMoviesData = temp;

        // 当数据更新成功后，顶部导航栏文字旁的加载图标消失
        wx.hideNavigationBarLoading();
        // 当下拉刷新完成后，停止刷新，同时加载图标也会消失
        wx.stopPullDownRefresh();
    },

    // 在onReady生命周期函数中实现动态导航栏标题
    onReady(options) {
        wx.setNavigationBarTitle({
            title: this.data.moviestype,
        })
    },

    // 触底时刷新函数
    onReachBottom(event) {
        console.log("我能实现加载更多");
        // 当上拉加载更多时，在顶部导航栏文字旁出现加载图标
        wx.showNavigationBarLoading(); 

        var loadMoreMoviesUrl = this.data.loadMoreMoviesUrlBase + 
            "?start=" + this.data.loadNum * 20 + "&count=20";
            // this.data.loadNum * 20 表示加载次数 * 20，
            // 因为一次加载20个，所以第二次就从第20开始，以此类推
        this.http(loadMoreMoviesUrl);
    },

    // 下拉刷新时触发函数
    onPullDownRefresh(event) {
        console.log("我能实现下拉刷新重来了");
        // 加载图标
        wx.showNavigationBarLoading();

        var reFreshUrl = this.data.loadMoreMoviesUrlBase + "?start=0&count=20";
        // 因为是刷新，所以将allMoviesData数组置空，loadNum赋起始值0重来
        this.setData({
            allMoviesData: []
        });
        this.data.loadNum =  0;
        this.http(reFreshUrl);
    }
})