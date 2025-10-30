import Image from 'next/image';

import { HexGallery } from '@/widgets/HexGallery';

import styles from './HomePage.module.scss';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.pandaBlock}>
                <div className={`${styles.speechBubble} ${styles.visible}`}>
                    Привет! Я Панда. Здесь ты можешь выбрать раздел перейти на страницу, чтобы учить JavaScript.
                    <br />
                    Просто нажми на любую цветную плитку!
                </div>
                <Image
                    src="/images/mainPandaImg.webp"
                    alt="Картинка панды"
                    width={300}
                    height={300}
                    className={styles.pandaImage}
                    priority
                    sizes="(max-width: 768px) 200px, 300px"
                />
            </div>
            <HexGallery />
        </div>
    );
}
