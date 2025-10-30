import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { HexGallery } from '@/widgets/HexGallery';

import styles from './HomePage.module.scss';

export default function HomePage() {
    const [showBubble, setShowBubble] = useState(false);
    const timerRef = useRef<number | null>(null);

    const handleImageLoad = () => {
        // Задержка перед показом speechBubble, например 1.5 секунды
        setTimeout(() => {
            setShowBubble(true);
        }, 1500);
    };
    useEffect(
        () => () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        },
        []
    );
    return (
        <div className={styles.container}>
            <div className={styles.pandaBlock}>
                <div className={`${styles.speechBubble} ${showBubble ? styles.visible : ''}`}>
                    Привет! Я Панда. Здесь ты можешь выбрать раздел перейти на страницу, чтобы учить JavaScript.
                    <br />
                    Просто нажми на любую цветную плитку!
                </div>
                <Image
                    src="/images/mainPandaImg.png"
                    alt="Картинка панды"
                    width={300}
                    height={300}
                    className={styles.pandaImage}
                    onLoad={handleImageLoad}
                    priority
                />
            </div>
            <HexGallery />
        </div>
    );
}
