// 'use client';

// import NavLink from './NavLink/NavLink';

// export const NavigationMenu = () => {
//     return (
//         <nav className="flex justify-center pt-6 pb-6 bg-amber-300 rounded-3xl mx-12 my-4 backdrop-blur-[20px] bg-gradient-to-br from-white/80 to-white/20">
//             <ul className="flex flex-wrap items-center gap-3 text-sm font-medium md:gap-8">
//                 <li>
//                     <NavLink
//                         href="/"
//                         exact
//                         className="inline-flex rounded-full px-5 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-slate-200 [&.active]:text-indigo-600"
//                     >
//                         Домой
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         href="/arrays"
//                         className="inline-flex rounded-full px-5 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-slate-200 [&.active]:text-indigo-600"
//                     >
//                         Массивы
//                     </NavLink>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

'use client';

import NavLink from './NavLink/NavLink';
import styles from './NavigationMenu.module.scss';

// 'use client';

// import NavLink from './NavLink/NavLink';

// export const NavigationMenu = () => {
//     return (
//         <nav className="flex justify-center pt-6 pb-6 bg-amber-300 rounded-3xl mx-12 my-4 backdrop-blur-[20px] bg-gradient-to-br from-white/80 to-white/20">
//             <ul className="flex flex-wrap items-center gap-3 text-sm font-medium md:gap-8">
//                 <li>
//                     <NavLink
//                         href="/"
//                         exact
//                         className="inline-flex rounded-full px-5 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-slate-200 [&.active]:text-indigo-600"
//                     >
//                         Домой
//                     </NavLink>
//                 </li>
//                 <li>
//                     <NavLink
//                         href="/arrays"
//                         className="inline-flex rounded-full px-5 py-1.5 text-slate-500 hover:text-indigo-500 [&.active]:bg-slate-200 [&.active]:text-indigo-600"
//                     >
//                         Массивы
//                     </NavLink>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

export const NavigationMenu = () => {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.navigationList}>
                <li>
                    <NavLink href="/" exact className={styles.navigationLink}>
                        Домой
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/arrays" className={styles.navigationLink}>
                        Массивы
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
