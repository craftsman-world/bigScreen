import axios from 'axios'
import { defineComponent, reactive, onMounted } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive({
      category: [
      ],
      lineData: [
      ],
      barData: [
      ],
      rateData: []
    })

    // methods
    const setData = () => {
      // for (let i = 0; i < cdata.barData.length - 1; i++) {
      //   const rate = cdata.barData[i] / cdata.lineData[i];
      //   cdata.rateData.push(rate.toFixed(2));
      // }
    }

    // 生命周期
    onMounted(() => {
      getData()
    })

    const getData = () => {
      axios
        .get("https://prod.api.craftsman.wpaini.com/admin/sum/public")
        .then(({ data: { data: res } }) => {
          res.job.countByPro.map((e) => {
            cdata.category.push(e.name)
            cdata.barData.push(e.count)
            cdata.rateData.push(e.count)
          })
          setData();
        });
    };

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})