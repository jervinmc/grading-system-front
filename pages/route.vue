<template>
  <div>

  </div>
</template>

<script>
export default {
    created(){
        if(this.$auth.loggedIn){
          location="/admin/students"
        }
        else{
          location="/login"
        }
        
    }
}
</script>

<style>

</style>