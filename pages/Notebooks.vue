<template>
  <PageWithCards :reference="'notebooks'" />
</template>

<script>
export default {
  middleware: 'authAdmin',

}
</script>
