import { getCityValue } from '@/api/area'
export const watchCity = {
  currentCity: {
    immediate: true,
    async handler () {
      try {
        const { data: res } = await getCityValue(this.currentCity)
        // console.log(res)
        this.cityValue = res.body.value
      } catch (error) {
        console.log(error)
      }
    }
  }
}
