import Skeleton from "react-loading-skeleton";

import s from "./MovieCardSkeleton.module.css";

export const MovieCardSkeleton = () => {
  return (
    <article className={s.card}>
      <div className={s.poster}>
        <Skeleton
          containerClassName={s.posterSkeleton}
          width="100%"
          height="100%"
        />
      </div>

      <div className={s.info}>
        <Skeleton width="85%" height={20} />

        <Skeleton width="45%" height={16} />
      </div>
    </article>
  );
};