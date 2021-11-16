<template>
<div>
  <b-modal id="modal-center" centered title="입력">
    <b-form>
      <b-form-textarea no-resize rows="10"></b-form-textarea>
    </b-form>
  </b-modal>
</div>
</template>

<script>
import {Component, Vue, Prop} from "vue-property-decorator";

@Component
export default class TodoModal extends Vue{

}
</script>

<style scoped>

</style>