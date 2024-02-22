<script lang="ts">
     export let placeholder: string
     export let value: string
</script>

<input type="text" placeholder={placeholder} bind:value={value} />