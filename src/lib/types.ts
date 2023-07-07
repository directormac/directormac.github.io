export type Categories = 'technical' | 'tutorial' | 'general' | 'review' | 'news' | 'other';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	excerpt: string;
	categories: Categories[];
	published: boolean;
};

export type Tags =
	| 'wip'
	| 'fullstack'
	| 'frontend'
	| 'cloud'
	| 'backend'
	| 'devops'
	| 'career'
	| 'productivity'
	| 'testing'
	| 'security'
	| 'design'
	| 'other';

export type Project = Omit<Post, 'categories'> & {
	tags: Tags[];
	image: string;
	repoLink: string;
};
