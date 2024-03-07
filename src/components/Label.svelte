<script lang="ts">
	import { Label } from 'bits-ui';

	export let field: string;
</script>

<Label.Root for={field} class="text-sm font-semibold"><slot /></Label.Root>
