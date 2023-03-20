// https://prod.api.craftsman.wpaini.com/admin/sum/public

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
    $("#userYearInc").text(data.user.increase.yearly + 20000)
    $("#userTotal").text(data.user.total + 130000)

    // 用户城市占比前三
    let userSort = data.user.countByWantPro.sort((a, b) => b.count - a.count)
    $("#proName1").text(userSort[0].name)
    $("#proName1Data").text("" + userSort[0].count)

    $("#proName2").text(userSort[1].name)
    $("#proName2Data").text("" + userSort[1].count)

    $("#proName3").text(userSort[2].name)
    $("#proName3Data").text("" + userSort[2].count)

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
    $("#userRatio1").text(userSort[0].name)
    $("#userRatio2").text(userSort[1].name)
    waterChart('.chart1', ((userSort[0].count / data.user.total) * 100).toFixed(2))
    waterChart('.chart2', ((userSort[1].count / data.user.total) * 100).toFixed(2))

    // 折线图-用户期望工作地排行
    var xdata = [];
    var dataArr = [];
    data.user.countByWantPro = data.user.countByWantPro.sort(function() {
        return .5 - Math.random();
    });
    data.user.countByWantPro.forEach(el => {
        xdata.push(el.name);
        dataArr.push(el.count);
    });
    lineChart('.lineChart', xdata, dataArr)
})
