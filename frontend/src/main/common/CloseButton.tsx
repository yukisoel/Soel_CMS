import styles from '@/main/common/CloseButton.module.scss'
import classNames from "classnames"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary'
    className?: string
}

const colors = {
    primary: '#282828',
    secondary: '#A0A0A0',
}

export default function CloseButton({color = 'primary', className, ...props}: Props) {
    return (
        <button className={classNames(
            className,
            styles.button,
        )} {...props}>
             <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7599 2.05078L2.12988 14.6908" stroke={colors[color]} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M2.12988 2.05078L14.7599 14.6908" stroke={colors[color]} strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
            </svg>
        </button>
    )
}
