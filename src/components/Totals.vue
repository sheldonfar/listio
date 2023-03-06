<template>
  <b-card no-body class="mt-4 p-2">
    <p>
      Total Hours (<strong>{{ totalHoursCount }}</strong>): <b>{{ totalHours }} hours</b>
    </p>
    <p>
      Total Tips (<strong>{{ totalTipsCount }}</strong>) Earnings:
      <b>{{ totalCashTips }} pln</b> cash (<strong>{{ totalCashTipsCount }}</strong>)
      + <b>{{ totalCardTips }} pln</b> card (<strong>{{ totalCardTipsCount }}</strong>)
      = <b>{{ totalTips }} pln</b>
    </p>
    <p>
      Total Procedure (<strong>{{ totalInterestsCount }}</strong>) Earnings: <b>{{ totalInterests }} pln</b>
    </p>
    <p>Total Money (no cash tips): <b>{{ totalMoneyNoCashTips }} pln</b></p>
    <p>
      Total Money:
      <b>{{ totalSalary }} pln</b> salary +
      <b>{{ totalTips }} pln</b> tips +
      <b>{{ totalInterests }} pln</b> procedure earnings =
      <b>{{ totalMoney }} pln</b>
    </p>
    <p>
      Required earning saldo: <b>{{ totalInterestsGross }} pln</b>
      out of <b>{{ requiredEarningsPerHour * totalHours }} pln</b>
      = <b :class="{ 'text-danger': earningSaldo < 0, 'text-success': earningSaldo > 0 }">{{ earningSaldo }} pln</b>
    </p>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'totalHours',
      'totalHoursCount',
      'totalCashTips',
      'totalCashTipsCount',
      'totalCardTips',
      'totalCardTipsCount',
      'totalTips',
      'totalTipsCount',
      'totalInterests',
      'totalInterestsGross',
      'totalInterestsCount',
      'totalSalary',
      'totalMoneyNoCashTips',
      'totalMoney',
      'requiredEarningsPerHour',
    ]),

    earningSaldo() {
      return this.totalInterestsGross - (this.requiredEarningsPerHour * this.totalHours)
    },
  },
}
</script>

<style scoped>

</style>
