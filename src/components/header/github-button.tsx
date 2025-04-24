import { Button } from '@/components/ui/button';
import { AiFillGithub } from 'react-icons/ai';

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
				<AiFillGithub size={16} aria-hidden='true' />
				<span>GitHub</span>
			</Button>
		</div>
	);
};
