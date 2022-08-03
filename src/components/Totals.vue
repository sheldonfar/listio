<template>
  <div class="mt-4">
    <p>
      Total Hours: <b>{{ totalHours }} hours</b>
    </p>
    <p>
      Total Tips: <b>{{ totalCashTips }} pln</b> cash + <b>{{ totalCardTips }} pln</b> card = <b>{{ totalTips }} pln</b>
    </p>
    <p>
      Total Procedure Earnings: <b>{{ totalInterests }} pln</b>
    </p>
    <p>
      Total Money: <b>{{ totalSalary }} pln</b> salary + <b>{{ totalTips }} pln</b> tips + <b>{{ totalInterests }} pln</b> procedure earnings = <b>{{ totalMoney + totalTips }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(["lists", "getListRecords", "hourlyRate", "interestRate", "getListTipsByType", "getListInterests"]),
        totalHours() {
            return this.lists.reduce((acc, list) => {
                const records = this.getListRecords(list.id)

                return acc + records.reduce((recordsAcc, record) => {
                    return recordsAcc + record.value
                }, 0)
            }, 0)
        },
        totalSalary() {
            return this.totalHours * this.hourlyRate
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
        totalInterests() {
            return this.lists.reduce((acc, list) => {
                const interests = this.getListInterests(list.id)

                return acc + interests.reduce((interestsAcc, interest) => {
                    const interestGrossValue = interest.value - interest.discountPercent * interest.value / 100
                    const interestNetValue = Math.round(interestGrossValue / (1 + this.interestRate / 100))

                    return interestsAcc + interestNetValue
                }, 0)
            }, 0)   
        },
        totalMoney() {
            return this.totalSalary + this.totalTips + this.totalInterests
        },
    },
}
</script>

<style scoped>

</style>