<template>
  <div>
    <h3 class="text-subtitle-1 mb-2">{{ title }}</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  labels: string[];
  data: number[];
  title: string;
}>();

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Cantidad',
      backgroundColor: '#43A047',
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
