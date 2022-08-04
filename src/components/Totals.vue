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
      Total Money: <b>{{ totalSalary }} pln</b> salary + <b>{{ totalTips }} pln</b> tips + <b>{{ totalInterests }} pln</b> procedure earnings = <b>{{ totalMoney }} pln</b>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            "totalHours", 
            "totalCashTips",
            "totalCardTips",
            "totalTips",
            "totalInterests",
            "totalSalary",
            "totalMoney"
        ]),
        
    },
}
</script>

<style scoped>

</style>