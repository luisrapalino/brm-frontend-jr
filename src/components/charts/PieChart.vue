<template>
  <div>
    <h3 class="text-subtitle-1 mb-2">{{ title }}</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

const props = defineProps<{
  labels: string[];
  data: number[];
  title: string;
}>();

const chartData = {
  labels: props.labels,
  datasets: [
    {
      backgroundColor: ['#66BB6A', '#FFA726', '#42A5F5', '#AB47BC', '#EF5350', '#29B6F6'],
      data: props.data,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<style scoped>
div {
  height: 300px;
}
</style>
