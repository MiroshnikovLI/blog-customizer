import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useRef,
	useState,
} from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type settingProps = {
	settingForm: ISettingForm;
};

export type ISettingForm = {
	fontFamily: OptionType;
	setFontFamily: Dispatch<SetStateAction<OptionType>>;
	fontSize: OptionType;
	setFontSize: Dispatch<SetStateAction<OptionType>>;
	fontColor: OptionType;
	setFontColor: Dispatch<SetStateAction<OptionType>>;
	bgColor: OptionType;
	setBgColor: Dispatch<SetStateAction<OptionType>>;
	containerWidth: OptionType;
	setContainerWidth: Dispatch<SetStateAction<OptionType>>;
	submit: () => void;
	clear: () => void;
};

export const ArticleParamsForm = ({ settingForm }: settingProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [classForm, setClassForm] = useState<string>(styles.container);
	const rootRef = useRef<HTMLDivElement>(null);

	function handleCloseOnEscape(evt: KeyboardEvent) {
		evt.code === 'Escape' && togglePanel();
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: togglePanel,
		onChange: setIsOpen,
	});

	function togglePanel() {
		isOpen
			? (setIsOpen(false),
			  setClassForm(`${styles.container}`),
			  document.addEventListener('keydown', handleCloseOnEscape))
			: (setIsOpen(true),
			  setClassForm(`${styles.container} ${styles.container_open}`),
			  document.removeEventListener('keydown', handleCloseOnEscape));
	}

	function handleFormAction(e: SyntheticEvent) {
		e.preventDefault();
		e.type === 'submit' ? settingForm.submit() : settingForm.clear();
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside className={classForm} ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={handleFormAction}
					onReset={handleFormAction}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<div>
						<Text as='h2' size={12} weight={800} uppercase dynamicLite>
							Шрифт
						</Text>
						<Select
							selected={settingForm.fontFamily}
							options={fontFamilyOptions}
							onChange={settingForm.setFontFamily}
						/>
					</div>
					<RadioGroup
						name={settingForm.fontSize.className}
						options={fontSizeOptions}
						selected={settingForm.fontSize}
						title={'Размер шрифта'}
						onChange={settingForm.setFontSize}
					/>
					<div>
						<Text as='h2' size={12} weight={800} uppercase dynamicLite>
							Цвет шрифта
						</Text>
						<Select
							selected={settingForm.fontColor}
							options={fontColors}
							onChange={settingForm.setFontColor}
						/>
					</div>
					<Separator /> {/* Линия разделитель */}
					<div>
						<Text as='h2' size={12} weight={800} uppercase dynamicLite>
							Цвет фона
						</Text>
						<Select
							selected={settingForm.bgColor}
							options={backgroundColors}
							onChange={settingForm.setBgColor}
						/>
					</div>
					<div>
						<Text as='h2' size={12} weight={800} uppercase dynamicLite>
							Ширина контента
						</Text>
						<Select
							selected={settingForm.containerWidth}
							options={contentWidthArr}
							onChange={settingForm.setContainerWidth}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
