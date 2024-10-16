<script>
	import { website } from '$lib/utils';

	export let metadescription;
	export let slug;
	export let title;

	const { ogLanguage, siteTitle, siteUrl } = website;

	const pageTitle = `${siteTitle} | ${title}`;
	const url = `${siteUrl}/${slug}`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:locale" content={ogLanguage} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metadescription} />
	<!-- {#if image}
		<meta property="og:image" content={image.url} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="627" />
		<meta property="og:image:alt" content={image.alt} />
	{/if}
	{#if squareImage}
		<meta property="og:image" content={squareImage.url} />
		<meta property="og:image:width" content="400" />
		<meta property="og:image:height" content="400" />
		<meta property="og:image:alt" content={squareImage.alt} />
	{/if} -->
	<link rel="canonical" href={url} />
</svelte:head>
