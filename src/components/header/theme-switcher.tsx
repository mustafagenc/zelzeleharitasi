import { Loader, MoonIcon, SunIcon } from 'lucide-react';
import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useDarkTheme } from '@/lib/useDarkTheme';
import { Label } from '@radix-ui/react-label';

export const ThemeSwitcher = () => {
	const [isDark, mounted, setTheme] = useDarkTheme();
	const id = useId();

	if (!mounted) {
		return (
			<Button size='icon' variant='ghost'>
				<Loader className='size-5 animate-spin text-zinc-400' />
				<span className='sr-only'>Loading...</span>
			</Button>
		);
	}

	return (
		<div>
			<div className='relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium'>
				<Switch
					id={id}
					checked={isDark}
					onCheckedChange={() => setTheme(isDark ? 'light' : 'dark')}
					className='peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto cursor-pointer opacity-100 transition-opacity duration-1000 ease-out [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.25,0.1,0.25,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full'
				/>
				<span className='pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-200 duration-300 ease-in-out peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full'>
					<MoonIcon size={16} aria-hidden='true' />
				</span>
				<span className='peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full'>
					<SunIcon size={16} aria-hidden='true' />
				</span>
			</div>
			<Label htmlFor={id} className='sr-only'>
				Theme Switcher
			</Label>
		</div>
	);
};
