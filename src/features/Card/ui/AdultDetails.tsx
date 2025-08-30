import { AdultDetailsProps, CardData } from '@/features/Card/model/types';

import styles from './AdultDetails.module.scss';

export function AdultDetails<T extends CardData>({ data, id }: AdultDetailsProps<T>) {
    const { name, description, syntax, adultExample } = data;

    if (!description && !syntax && !adultExample) return null;

    return (
        <section id={id} className={styles.adultPanel} aria-label={`Пояснение для взрослых: ${name}`}>
            <h3 className={styles.adultTitle}>Для взрослых</h3>

            {description && (
                <div className={styles.adultBlock}>
                    <div className={styles.adultLabel}>Описание</div>
                    <p className={styles.adultText}>{description}</p>
                </div>
            )}

            {syntax && (
                <div className={styles.adultBlock}>
                    <div className={styles.adultLabel}>Синтаксис</div>
                    <pre className={styles.adultCode}>
                        <code>{syntax}</code>
                    </pre>
                </div>
            )}

            {adultExample && (
                <div className={styles.adultBlock}>
                    <div className={styles.adultLabel}>Пример</div>
                    <pre className={styles.adultCode}>
                        <code>{adultExample}</code>
                    </pre>
                </div>
            )}
        </section>
    );
}
