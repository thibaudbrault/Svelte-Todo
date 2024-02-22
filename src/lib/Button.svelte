<script lang="ts">

    export let addTodo: (text: string) => void
    export let text: string

    const handleClick = () => {
        addTodo(text)
    }

</script>

<button on:click={handleClick}>This is a button</button>