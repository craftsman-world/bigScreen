import { defineComponent, onUnmounted, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw,
  },
  setup() {
    let intervalInstance = null
    const cdata = reactive({
      xData: ['土建', '机械', '管理', '防护', '装饰', '桩基'],
      seriesData: [
        { value: 10, name: '土建' },
        { value: 5, name: '机械' },
        { value: 15, name: '管理' },
        { value: 25, name: '防护' },
        { value: 20, name: '装饰' },
        { value: 35, name: '桩基' },
      ],
    })
    intervalInstance = setInterval(() => {
      const data = cdata.seriesData
      cdata.seriesData = data.map((e) => {
        return { value: e.value + 10, name: e.name }
      })
    }, 1000)

    onUnmounted(() => {
      clearInterval(intervalInstance)
    })
    return () => {
      return (
        <div>
          <Draw cdata={cdata} />
        </div>
      )
    }
  },
})
