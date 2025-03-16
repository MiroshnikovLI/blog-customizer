import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ISettingForm,
} from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { defaultArticleState, OptionType } from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [bgColor, setBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [containerWidth, setContainerWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const [setPage, setSetPage] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		containerWidth: defaultArticleState.contentWidth,
	});

	function submit() {
		setSetPage({
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontColor: fontColor,
			bgColor: bgColor,
			containerWidth: containerWidth,
		});
	}

	function clear() {
		setSetPage({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			bgColor: defaultArticleState.backgroundColor,
			containerWidth: defaultArticleState.contentWidth,
		});
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
	}

	const settingForm: ISettingForm = {
		fontFamily,
		setFontFamily,
		fontSize,
		setFontSize,
		fontColor,
		setFontColor,
		bgColor,
		setBgColor,
		containerWidth,
		setContainerWidth,
		submit,
		clear,
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': setPage.fontFamily.value,
					'--font-size': setPage.fontSize.value,
					'--font-color': setPage.fontColor.value,
					'--container-width': setPage.containerWidth.value,
					'--bg-color': setPage.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm settingForm={settingForm} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
