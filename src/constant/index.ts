import { ModuleInfo } from './index.d'

// 星期
export const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 主题名称与副标题名称
export const title = '秒开工大数据可视化'
export const subtitle = ['秒开工实时数据', '', '匠天下科技']

export const moduleInfo: ModuleInfo = [
  // 中间的几个模块
  {
    name: '任务通过率',
    icon: 'icon-chart-bar',
  },
  {
    name: '地图数据',
    icon: 'icon-tongji4',
  },
  {
    name: '产品销售渠道分析',
    icon: 'icon-align-left',
  },
  {
    name: '任务完成排行榜',
    icon: 'icon-zhibiao2',
  },
  // 底部两个模块
  {
    name: '数据统计图',
    icon: 'icon-vector',
  },
  {
    name: '工单修复以及满意度统计图',
    icon: 'icon-fenxi7',
  },
]
