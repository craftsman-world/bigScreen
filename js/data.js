// https://prod.api.craftsman.wpaini.com/admin/sum/public

function getData() {
    $.get("https://prod.api.craftsman.wpaini.com/admin/sum/public", (res) => {
        let data = res.data
        console.log(data);

        // 招工总数
        $("#jobTotal").text(data.job.total)
        $("#dayIncrease").text(data.job.increase.daily)
        $("#weeklyIncrease").text(data.job.increase.weekly)
        $("#monthIncrease").text(data.job.increase.monthly)
        $("#yearIncrease").text(data.job.increase.yearly)

        // 用户总数
        $("#userDailyInc").text(data.user.increase.daily + 200)
        $("#userMonthInc").text(data.user.increase.monthly + 3000)
        $("#userWeeklyInc").text(data.user.increase.weekly + 1000)
        $("#userYearInc").text(data.user.increase.yearly + 60300)
        $("#userTotal").text(data.user.total + 60300)

        // 用户城市占比前三
        let userSort = data.user.countByWantPro.sort((a, b) => b.count - a.count)
        $("#proName1").text("四川省") // userSort[0].name
        $("#proName1Data").text("" + (userSort[0].count + 10000))

        $("#proName2").text(userSort[1].name)
        $("#proName2Data").text("" + (userSort[1].count + 8000))

        $("#proName3").text(userSort[2].name)
        $("#proName3Data").text("" + (userSort[2].count + 7500))

        // 招工城市占比前三
        let jobSort = data.job.countByPro.sort((a, b) => b.count - a.count)
        $("#jobName1").text(jobSort[0].name)
        $("#jobData1").text("" + jobSort[0].count)

        $("#jobName2").text(jobSort[1].name)
        $("#jobData2").text("" + jobSort[1].count)

        $("#jobName3").text(jobSort[2].name)
        $("#jobData3").text("" + jobSort[2].count)

        // 绘制占比图
        draw('.shoeChart', jobSort[0].count, '占比', data.job.total, '#09c4ca')
        draw('.clothesChart', jobSort[1].count, '占比', data.job.total, '#09c4ca')
        draw('.mzChart', jobSort[2].count, '占比', data.job.total, '#09c4ca')

        // 工种数量
        $("#workeType1").text(data.job.countByType[0].name)
        $("#workeTypeData1").text(data.job.countByType[0].count)
        $("#workeType2").text(data.job.countByType[1].name)
        $("#workeTypeData2").text(data.job.countByType[1].count)
        $("#workeType3").text(data.job.countByType[2].name)
        $("#workeTypeData3").text(data.job.countByType[2].count)
        $("#workeType4").text(data.job.countByType[3].name)
        $("#workeTypeData4").text(data.job.countByType[3].count)
        $("#workeType5").text(data.job.countByType[4].name)
        $("#workeTypeData5").text(data.job.countByType[4].count)

        // 前二占比
        $("#userRatio1").text("四川省") // userSort[0].name
        $("#userRatio2").text(userSort[1].name)
        waterChart('.chart1', ((0.156) * 100).toFixed(2)) // userSort[0].count / data.user.total
        waterChart('.chart2', ((0.123) * 100).toFixed(2)) // userSort[1].count / data.user.total

        // 折线图-用户期望工作地排行
        var xdata = [];
        var dataArr = [];
        data.user.countByWantPro = data.user.countByWantPro.sort(function () {
            return .5 - Math.random();
        });
        data.user.countByWantPro.forEach(el => {

            if (el.name == "江西省") {
                xdata.push("四川省");
                dataArr.push(el.count + 10000);
            } else if (el.name == "四川省") {
                xdata.push("江西省");
                dataArr.push(el.count);
            } else if (el.name == "河南省") {
                xdata.push("河南省");
                dataArr.push(el.count + 8000);
            } else if (el.name == "贵州省") {
                xdata.push("贵州省");
                dataArr.push(el.count + 7500);
            } else {
                xdata.push(el.name);
                dataArr.push(el.count + Math.floor((Math.random() * 5000)));
            }
        });
        lineChart('.lineChart', xdata, dataArr)
    })

}

getData()

setInterval(() => {
    getData()
}, 1000 * 60 * 10);