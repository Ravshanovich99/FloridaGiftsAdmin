<template>
  <PageWithCards :reference="'albums'" />
</template>

<script>
export default {
  middleware: 'authAdmin',

}
</script>