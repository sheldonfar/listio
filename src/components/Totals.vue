<template>
  <div class="mt-4">
    <p>
      Total Hours: <b>{{ totalHours }} hours</b>
    </p>
    <p>
      Total Tips: <b>{{ totalCashTips }} pln</b> cash + <b>{{ totalCardTips }} pln</b> card = <b>{{ totalTips }} pln</b>
    </p>
    <p>
      Total Money: <b>{{ totalMoney }} pln</b> salary + <b>{{ totalTips }} pln</b> tips = <b>{{ totalMoney + totalTips }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(["lists", "getListRecords", "hourlyRate", "getListTipsByType"]),
        totalHours() {
            return this.lists.reduce((acc, list) => {
                const records = this.getListRecords(list.id)

                return acc + records.reduce((recordsAcc, record) => {
                    return recordsAcc + record.value
                }, 0)
            }, 0)
        },
        totalCardTips() { 
            return this.lists.reduce((acc, list) => {
                const tips = this.getListTipsByType(list.id, 'card')

                return acc + tips.reduce((tipsAcc, tip) => {
                    return tipsAcc + tip.value
                }, 0)
            }, 0)
        },
        totalCashTips() {
            return this.lists.reduce((acc, list) => {
                const tips = this.getListTipsByType(list.id, 'cash')

                return acc + tips.reduce((tipsAcc, tip) => {
                    return tipsAcc + tip.value
                }, 0)
            }, 0)
        },
        totalTips() {
            return this.totalCardTips + this.totalCashTips
        },
        totalMoney() {
            return this.totalHours * this.hourlyRate
        },
    },
}
</script>

<style scoped>

</style>