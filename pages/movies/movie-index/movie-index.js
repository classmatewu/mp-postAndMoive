var util = require("../../../utils/util.js"); // 引入util.js

var app = getApp(); // 引入app.js

Page({
    data: {
        // 三个都是对象数组
        inTheaters: {},
        comingSoon: {},
        top250: {}
    },

    // restful API json
    // 粒度
    onLoad(event) {
        console.log("hahahaha");

        // 利用url地址获取豆瓣电影数据，由于movie-index只需要前三项，所以这里我们只取前三项
        var inTheatersUrl = app.globalData.doubanBase
             + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = app.globalData.doubanBase
             + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = app.globalData.doubanBase
             + "/v2/movie/top250" + "?start=0&count=3";

        // 参数是三种数据url地址，以及对应的数据类型名字
        this.getMoviesData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMoviesData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMoviesData(top250Url, "top250", "豆瓣Top250");
    },

    // 利用API接口获取电影数据
    // url是api接口，dataName是data对象中定义的数据名，moviesType是三种电影类型
    getMoviesData(url, dataName, moviesType) {
        var this_ = this;
        wx.request({
            url: url,
            data: {},
            method: "GET",
            header: {
                "Content-Type": "json",
            },
            // 获取成功则将信息打印出来
            success(res) {
                console.log(res);
                this_.processRes(res.data, dataName, moviesType); // 处理从豆瓣拿来的数据信息res
            },
            fail(error) {
                console.log(error);
            }
        })
    },

    // 处理从豆瓣拿来的数据信息res，因为从豆瓣获取来的信息比较多和杂，因此我们整理提取我们需要的
    // 把处理后的数据放在moviesData[]数组里
    processRes(resData, dataName, moviesType) {
        var subjects = resData.subjects;
        var moviesData = [];
        // var idx in subjects循环获取到的是subjects输出里的下标
        // 若subjects是对象，则循环输出对象里的键名
        for(var idx in subjects) {
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
            moviesData.push(aMovieData);
        }
        // var movies = {};
        // movies.moviesData = moviesData;
        // // 将电影数据数组分类发送到data对象
        // if (dataName === "inTheaters") {
        //     // this.setData({
        //     //     inTheaters: moviesData
        //     // });
        //     this.data.inTheaters.push(movies);
        // } else if (dataName === "comingSoon") {
        //     // this.setData({
        //     //     comingSoon: moviesData
        //     // });
        //     this.data.comingSoon.push(movies);
        // } else {
        //     // this.setData({
        //     //     top250: moviesData
        //     // });
        //     this.data.top250.push(movies);
        // }
        // console.log(this.data.top250);
        // 这里尝试用自己的方法折腾了很久但也没实现，这段代码得好好理解一下，简洁好用
        var readyData = {};
        readyData[dataName] = {
            moviesType: moviesType,
            movies: moviesData
        }
        this.setData(readyData);
    },

    // 跳转到more-movie页面
    intoMoreMovie(event) {
        var moviestype = event.currentTarget.dataset.moviestype;
        wx.navigateTo({
            url: "/pages/movies/more-movie/more-movie?moviestype=" + moviestype,
        })
    }

})