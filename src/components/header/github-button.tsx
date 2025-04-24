import { Button } from '@/components/ui/button';
import { GitHubIcon } from './github-icon';

export const GithubButton = () => {
	const githubUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		window.open('https://github.com/mustafagenc/zelzeleharitasi', '_blank');
	};

	return (
		<div>
			<Button
				className='cursor-pointer rounded-full'
				variant='outline'
				onClick={githubUrl}
			>
				<GitHubIcon aria-hidden='true' />
				<span className='hidden lg:block'>GitHub</span>
			</Button>
		</div>
	);
};
