import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMDX({ markdown }: { markdown: string }): string {
  let parsedMarkdown = removeMDXAcorns({ markdown });
  parsedMarkdown = removeAlignProperty({ markdown: parsedMarkdown });

  return parsedMarkdown;
}

function removeMDXAcorns({ markdown }: { markdown: string }): string {
  const acornLineRegex = /^(.*%\[.*?\].*)$/gm;
  const acornBlockRegex = /{%.*?%}/g;

  markdown = markdown.replace(acornLineRegex, '').replace(acornBlockRegex, '');

  return markdown;
}

function removeAlignProperty({ markdown }: { markdown: string }): string {
  const regex = /(!\[.*?\]\(.*?\s+align=".*?"\))/g;

  return markdown.replace(regex, (match) => {
    return match.replace(/\s+align=".*?"/, '');
  });
}

export function capitalizeFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}