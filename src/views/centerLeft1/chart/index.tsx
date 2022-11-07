import axios from 'axios';
import { defineComponent, onMounted, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw,
  },
  setup() {
    // let intervalInstance = null
    const cdata = reactive({
      xData: [],
      seriesData: [

      ],
    })
    // intervalInstance = setInterval(() => {
    //   const data = cdata.seriesData
    //   cdata.seriesData = data.map((e) => {
    //     return { value: e.value + 10, name: e.name }
    //   })
    // }, 1000)

    onMounted(() => {
      getData()
    })

    const getData = () => {
      axios
        .get("https://prod.api.craftsman.wpaini.com/admin/sum/public")
        .then(({ data: { data: res } }) => {
          console.log(res.job.countByType);
          res.job.countByType.map((e) => {
            cdata.xData.push(e.name)
            cdata.seriesData.push(
              { value: e.count, name: e.name }
            )
          })
        });
    };

    return () => {
      return (
        <div>
          <Draw cdata={cdata} />
        </div>
      )
    }
  },
})
