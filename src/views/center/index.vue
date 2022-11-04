<template>
  <div class="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-1 pl-3"
            :config="item.config"
          />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span>
          <i class="iconfont icon-tongji2"></i>
        </span>
        <span class="fs-xl text mx-2 mb-1">平台数据</span>
        <dv-scroll-ranking-board v-if="flagShow" class="dv-scr-rank-board" :config="ranking" />
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>总用户数</span>
          <chart :tips="rate[0].tips" :colorObj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>总工作数</span>
          <chart :tips="rate[1].tips" :colorObj="rate[1].colorData" />
        </div>
        <div class="water">
          <dv-water-level-pond v-if="flagShow" class="dv-wa-le-po" :config="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, reactive, onMounted, ref } from "vue";
import Chart from "../center/chart/draw";

export default defineComponent({
  components: {
    Chart,
  },
  setup() {
    // 下层数据
    let titleDate = [];
    const titleItem = reactive([]);

    // 初始化数据
    onMounted(() => {
      getData();
    });

    let flagShow = ref(false)

    let ranking = reactive({
      data: [
        {
          name: "工作总数",
          value: "",
        },
        {
          name: "用户总数",
          value: "",
        }
      ],
      carousel: "single",
      unit: "",
    });

    let rate = reactive([
      {
        id: "centerRate1",
        tips: 60,
        colorData: {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5",
            },
          },
        },
      },
      {
        id: "centerRate2",
        tips: 40,
        colorData: {
          textStyle: "#67e0e3",
          series: {
            color: ["#faf3a378", "transparent"],
            dataColor: {
              normal: "#ff9800",
              shadowColor: "#fcebad",
            },
          },
        },
      },
    ]);

    // 设置数据
    const setData = () => {
      titleDate.map((e) => {
        titleItem.push({
          title: e.text,
          config: {
            number: [e.number],
            // toFixed: 1,
            textAlign: "left",
            content: "{nt}",
            style: {
              fontSize: 26,
            },
          },
        });
      });
    };

    let water = reactive({
      data: [52, 67],
      shape: "roundRect",
      formatter: "{value}",
      waveNum: 3,
    });
    // 加载数据
    const getData = () => {
      axios
        .get("https://prod.api.craftsman.wpaini.com/admin/sum/public")
        .then(({ data: { data: res } }) => {
          titleDate = [
            {
              number: res.user.increase.daily,
              text: "今日用户增长数",
            },
            {
              number: res.user.increase.monthly,
              text: "本月用户增长数",
            },
            {
              number: res.user.increase.yearly,
              text: "今年用户增长数",
            },
            {
              number: res.job.increase.daily,
              text: "今日工作发布数",
            },
            {
              number: res.job.increase.monthly,
              text: "本月工作发布数",
            },
            {
              number: res.job.increase.yearly,
              text: "今年工作发布数",
            },
          ];
          setData();

          // rate
          rate[1].tips = res.job.total;
          rate[0].tips = res.user.total;

          // water
          water.data[1] = 100;

          // ranking
          ranking.data[0].value = res.job.total
          ranking.data[1].value = res.user.total

          flagShow.value = true
        });
    };

    return {
      titleItem,
      ranking,
      water,
      rate,
      flagShow
    };
  },
});
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 220px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
