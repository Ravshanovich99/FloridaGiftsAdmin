<template>
  <PageWithCards :reference="'portrets'" />
</template>

<script>
export default {
  middleware: 'authAdmin',

}
</script>
