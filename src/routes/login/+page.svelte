<script>
	import { Button, SEO } from '$components';

	const seoProps = {
		title: 'Login',
		slug: 'login',
		metadescription:
			'Log into your account to get access to all the features of GameMusic.',
	};
</script>

<SEO {...seoProps} />
<form
	method="POST"
	action="?/login"
	class="flex h-full w-full flex-col items-center justify-center gap-2"
>
	<Button intent="primary" size="medium" weight="semibold">
		Login with Google
	</Button>
</form>
