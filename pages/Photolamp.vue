<template>
  <PageWithCards :reference="'photolamp'" />
</template>

<script>
export default {
  middleware: 'authAdmin',

}
</script>