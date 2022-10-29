<template>
  <div id="root">
    <Test/>
    <Test2/>
    <Test3/>
</div>
</template>

<script>

import Test from './components/Test'
import Test2 from './components/Test2'
import Test3 from './components/Test3'

export default {
  name: 'WorkspaceJsonApp',
  // eslint-disable-next-line vue/no-unused-components
  components:{Test,Test2,Test3},
};


</script>

