<template>
  <tr>
    <td>{{index + 1}}</td>
    <td>{{kpm.name}}</td>
    <td>{{formatKks(kpm.kks)}}</td>
    <td>
      <a>
        <span class="text-blue fas fa-info-circle"></span>
      </a>
      &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp; &nbsp;
      <a>
        <span class="fas fa-trash-alt text-red"></span>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    kpm: Object,
    index: Number,
  },
};
</script>