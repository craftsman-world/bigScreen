import { defineComponent, reactive, onMounted } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive({
      category: [
        "浙江",
        "甘肃",
        "陕西",
        "四川",
        "广东"
      ],
      lineData: [
        18,
        20,
        24,
        28,
        32,
      ],
      barData: [
        46,
        50,
        55,
        65,
        75,
        89
      ],
      rateData: []
    })

    // methods
    const setData = () => {
      for (let i = 0; i < cdata.barData.length - 1; i++) {
        const rate = cdata.barData[i] / cdata.lineData[i];
        cdata.rateData.push(rate.toFixed(2));
      }
    }

    // 生命周期
    onMounted(() => {
      setData()
    })

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})