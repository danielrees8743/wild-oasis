import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import ButtonIcon from './ButtonIcon';
import { UseDarkMode } from '../context/DarkModeContext';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = UseDarkMode();

  return (
    <ButtonIcon aria-label='Toggle dark mode' onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
